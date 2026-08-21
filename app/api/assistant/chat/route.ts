import { NextRequest, NextResponse } from 'next/server';
import { getLocale } from 'next-intl/server';
import { APP_CONFIG } from '@/config/app.config';
import { getCache, setCache } from '@/lib/redis/redis';
import { checkTopic } from '@/lib/assistant/topicGate';
import { McpToolsUnavailableError, runAssistantLoopStreaming } from '@/lib/assistant/anthropicLoop';
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
import { replayCachedReplyStream } from '@/lib/assistant/replayCachedReply';
import { lookupSemanticReply } from '@/lib/assistant/semantic-cache/lookupSemanticReply';
import { storeSemanticReply } from '@/lib/assistant/semantic-cache/storeSemanticReply';
import {
	observeAssistantResult,
	incrementAssistantRateLimitRejections,
	incrementAssistantCacheHits,
	observeAssistantRequestDuration,
	incrementAssistantCacheMisses,
	incrementAssistantStreamErrors,
} from '@/lib/metrics/assistantMetrics';
import { incrementCacheHitKind } from '@/lib/metrics/semanticCacheMetrics';
import { type ChatRequest, type ChatResponse, type AssistantStreamServerEvent } from '@/lib/assistant/types';

const SSE_HEADERS = {
	'Content-Type': 'text/event-stream',
	'Cache-Control': 'no-cache, no-store, must-revalidate',
	Connection: 'keep-alive',
	'X-Accel-Buffering': 'no',
	'Transfer-Encoding': 'chunked',
} as const;

const cachedSse = (text: string, kind: 'exact' | 'semantic') => {
	observeAssistantResult('cache_hit');
	incrementAssistantCacheHits();
	incrementCacheHitKind(kind);
	return sseResponse({
		stream: replayCachedReplyStream({ text }),
		status: 200,
		headers: SSE_HEADERS,
	});
};

export async function POST(req: NextRequest) {
	const redisOn = APP_CONFIG.redis.enabled;
	const contentVersion = APP_CONFIG.assistantCache.contentVersion;
	const cacheTtl = APP_CONFIG.assistantCache.ttlSeconds;
	const maxMessageLength = APP_CONFIG.assistantCache.maxMessageLength;
	const semanticOn = redisOn && APP_CONFIG.assistantCache.semantic.enabled;

	try {
		const body: ChatRequest = await req.json();
		const { message } = body;
		const history = normalizeHistory(body.history);

		const invalidMessage = validateAssistantUserMessage({
			message,
			maxMessageLength,
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
		const cacheKey = assistantReplyKey(contentVersion, localeTag, message);

		if (useCache) {
			const exact = await getCache<string>(cacheKey);
			if (exact) return cachedSse(exact, 'exact');
		}

		const topicCheck = await checkTopic(message);
		if (!topicCheck.allowed) return handleNotAllowedTopic({ topicCheck, SSE_HEADERS });

		if (useCache && semanticOn) {
			const semantic = await lookupSemanticReply({
				message,
				locale: localeTag,
				contentVersion,
			});
			if (semantic) return cachedSse(semantic.reply, 'semantic');
		}

		if (useCache) incrementAssistantCacheMisses();

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
							await setCache(cacheKey, fulltext, cacheTtl);
							if (semanticOn) {
								void storeSemanticReply({
									message,
									locale: localeTag,
									contentVersion,
									reply: fulltext,
								});
							}
						}
						observeAssistantResult('success');
					}

					push({ type: 'done' });
				} catch (error: unknown) {
					console.error('[ASSISTANT STREAM ERROR]:', error);
					const kind = error instanceof McpToolsUnavailableError ? 'mcp_error' : 'llm_error';
					incrementAssistantStreamErrors(kind);
					observeAssistantResult(kind);
					push({ type: 'error', error: getAssistantStreamErrorMsg(error) });
					push({ type: 'done' });
				} finally {
					observeAssistantRequestDuration(Number(process.hrtime.bigint() - started) / 1e9);
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
