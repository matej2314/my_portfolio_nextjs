import { NextRequest, NextResponse } from 'next/server';
import { getLocale } from 'next-intl/server';
import { APP_CONFIG } from '@/config/app.config';
import { getCache, setCache } from '@/lib/redis/redis';
import { checkTopic } from '@/lib/assistant/topicGate';
import {
	McpToolsUnavailableError,
	runAssistantLoopStreaming,
} from '@/lib/assistant/anthropicLoop';
import { assistantReplyKey } from '@/lib/redis/redisKeys';
import { cacheLocaleTag } from '@/lib/assistant/cacheLocaleTag';
import { normalizeHistory } from '@/lib/assistant/normalizeHistory';
import { consumeAssistantRateLimit } from '@/lib/assistant/assistantRateLimit';
import { handleNotAllowedTopic } from '@/lib/assistant/handleNotAllowedTopic';
import { getAssistantStreamErrorMsg } from '@/lib/assistant/getAssistantStreamErrorMsg';
import { getAssistantChatErrorResponse } from '@/lib/assistant/getAssistantChatErrorResponse';
import { sseResponse } from '@/lib/assistant/sseResponse';
import { sseData } from '@/lib/assistant/streamSse';
import { validateAssistantUserMessage } from '@/lib/assistant/validateAssistantUserMessage';
import {
	observeAssistantResult,
	incrementAssistantRateLimitRejections,
	incrementAssistantCacheHits,
	observeAssistantRequestDuration,
	incrementAssistantCacheMisses,
	incrementAssistantStreamErrors,
} from '@/lib/metrics/assistantMetrics';

import { type ChatRequest, type ChatResponse, type AssistantStreamServerEvent } from '@/lib/assistant/types';

const CONTENT_VERSION = process.env.ASSISTANT_CONTENT_VERSION || '1.0.0';
const CACHE_TTL = Number(process.env.ASSISTANT_CACHE_TTL) || 60 * 60 * 24;
const MAX_MESSAGE_LENGTH = Number(process.env.ASSISTANT_MAX_MESSAGE_LENGTH) || 500;
const SSE_HEADERS = {
	'Content-Type': 'text/event-stream',
	'Cache-Control': 'no-cache, no-store, must-revalidate',
	Connection: 'keep-alive',
	'X-Accel-Buffering': 'no',
	'Transfer-Encoding': 'chunked',
} as const;

export async function POST(req: NextRequest) {
	const redisOn = APP_CONFIG.redis.enabled;
	try {
		const body: ChatRequest = await req.json();
		const { message } = body;
		const history = normalizeHistory(body.history);

		const invalidMessage = validateAssistantUserMessage({
			message,
			maxMessageLength: MAX_MESSAGE_LENGTH,
		});
		if (invalidMessage) {
			observeAssistantResult('validation_error');
			return invalidMessage;
		}

		const rateLimit = await consumeAssistantRateLimit(req);

		if (!rateLimit.allowed) {
			observeAssistantResult('rate_limited');
			incrementAssistantRateLimitRejections();
			return NextResponse.json(
				{
					success: false,
					error: 'Too many requests.',
				} satisfies ChatResponse,
				{
					status: 429,
					headers: {
						'Retry-After': String(rateLimit.retryAfterSec),
					},
				},
			);
		}

		const localeTag = cacheLocaleTag(await getLocale());
		const useCache = redisOn && history.length === 0;

		const cacheKey = assistantReplyKey(CONTENT_VERSION, localeTag, message);

		if (useCache) {
			const cached = await getCache<string>(cacheKey);
			if (cached) {
				const started = process.hrtime.bigint();
				observeAssistantResult('cache_hit');
				incrementAssistantCacheHits();
				const stream = new ReadableStream({
					async start(controller) {
						try {
							const chunkSize = 2;
							const delayMs = 2;

							for (let i = 0; i < cached.length; i += chunkSize) {
								controller.enqueue(sseData({ type: 'delta', text: cached.slice(i, i + chunkSize) }));

								if (i + chunkSize < cached.length) {
									await new Promise(resolve => setTimeout(resolve, delayMs));
								}
							}

							controller.enqueue(sseData({ type: 'done' }));
							controller.close();
						} finally {
							observeAssistantRequestDuration(Number(process.hrtime.bigint() - started) / 1e9);
						}
					},
				});
				return sseResponse({ stream, status: 200, headers: SSE_HEADERS });
			}
			incrementAssistantCacheMisses();
		}

		const topicCheck = await checkTopic(message);
		if (!topicCheck.allowed) return handleNotAllowedTopic({ topicCheck, SSE_HEADERS });

		const stream = new ReadableStream({
			async start(controller) {
				const started = process.hrtime.bigint();
				let canWrite = true;

				const push = (event: AssistantStreamServerEvent) => {
					if (!canWrite) return;
					try {
						controller.enqueue(sseData(event));
					} catch (e) {
						canWrite = false;
						console.error('[ASSISTANT SSE] enqueue failed (client disconnected or stream closed):', e);
					}
				};

				const closeSafe = () => {
					try {
						controller.close();
					} catch (e) {
						console.error('[ASSISTANT SSE] controller.close:', e);
					}
					canWrite = false;
				};

				try {
					const fulltext = await runAssistantLoopStreaming(message.trim(), {
						history,
						onTextDelta: chunk => push({ type: 'delta', text: chunk }),
					});

					if (!fulltext || fulltext.trim() === '') {
						push({ type: 'error', error: 'Assistatnt returned an empty response' });
						observeAssistantResult('empty_response');
					} else {
						if (useCache) {
							await setCache(cacheKey, fulltext, CACHE_TTL);
						}
						observeAssistantResult('success');
					}

					push({ type: 'done' });
				} catch (error: unknown) {
					console.error('[ASSISTANT STREAM ERROR]:', error);
					const kind =
						error instanceof McpToolsUnavailableError ? 'mcp_error' : 'llm_error';
					incrementAssistantStreamErrors(kind);
					observeAssistantResult(kind);
					push({ type: 'error', error: getAssistantStreamErrorMsg(error) });
					push({ type: 'done' });
				} finally {
					observeAssistantRequestDuration(
						Number(process.hrtime.bigint() - started) / 1e9,
					);
					closeSafe();
				}
			},
		});
		return sseResponse({ stream, status: 200, headers: SSE_HEADERS });
	} catch (error: unknown) {
		console.error('[ASSISTANT CHAT ERROR]:', error);
		observeAssistantResult('error');
		return getAssistantChatErrorResponse(error);
	}
}
