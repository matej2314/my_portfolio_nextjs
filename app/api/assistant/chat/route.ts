import { NextRequest, NextResponse } from 'next/server';
import { getLocale } from 'next-intl/server';
import { APP_CONFIG } from '@/config/app.config';
import { getCache, setCache } from '@/lib/redis/redis';
import { checkTopic } from '@/lib/assistant/topicGate';
import { runAssistantLoop, runAssistantLoopStreaming } from '@/lib/assistant/anthropicLoop';
import { assistantReplyKey } from '@/lib/redis/redisKeys';
import { cacheLocaleTag } from '@/lib/assistant/cacheLocaleTag';
import { normalizeHistory } from '@/lib/assistant/normalizeHistory';
import { consumeAssistantRateLimit } from '@/lib/assistant/assistantRateLimit';

import { type ChatRequest, type ChatResponse, type AssistantStreamServerEvent } from '@/lib/assistant/types';

const CONTENT_VERSION = process.env.ASSISTANT_CONTENT_VERSION || '1.0.0';
const CACHE_TTL = Number(process.env.ASSISTANT_CACHE_TTL) || 60 * 60 * 24;
const MAX_MESSAGE_LENGTH = Number(process.env.ASSISTANT_MAX_MESSAGE_LENGTH) || 500;

// export async function POST(req: NextRequest) {
// 	try {
// 		const body: ChatRequest = await req.json();
// 		const { message } = body;
// 		const history = normalizeHistory(body.history);

// 		if (!message || typeof message !== 'string' || message.length > MAX_MESSAGE_LENGTH) {
// 			return NextResponse.json({ success: false, error: 'Invalid message length' } satisfies ChatResponse, { status: 400 });
// 		}

// 		const rateLimit = await consumeAssistantRateLimit(req);

// 		if (!rateLimit.allowed) {
// 			return NextResponse.json(
// 				{
// 					success: false,
// 					error: 'Too many requests.',
// 				} satisfies ChatResponse,
// 				{
// 					status: 429,
// 					headers: {
// 						'Retry-After': String(rateLimit.retryAfterSec),
// 					},
// 				},
// 			);
// 		}

// 		const localeTag = cacheLocaleTag(await getLocale());
// 		const redisOn = APP_CONFIG.redis.enabled;
// 		const useCache = redisOn && history.length === 0;

// 		const cacheKey = assistantReplyKey(CONTENT_VERSION, localeTag, message);
// 		if (useCache) {
// 			const cached = await getCache<string>(cacheKey);
// 			if (cached) {
// 				return NextResponse.json({ success: true, reply: cached } satisfies ChatResponse, { status: 200 });
// 			}
// 		}

// 		const topicCheck = await checkTopic(message);
// 		if (!topicCheck.allowed) {
// 			return NextResponse.json({
// 				success: true,
// 				rejected: true,
// 				topics: topicCheck.topics,
// 				exampleQuestions: topicCheck.exampleQuestions,
// 			} satisfies ChatResponse);
// 		}

// 		const reply = await runAssistantLoop(message.trim(), { history });

// 		if (reply === null || reply === '') {
// 			return NextResponse.json(
// 				{
// 					success: false,
// 					error: 'Assistant returned an empty response',
// 				} satisfies ChatResponse,
// 				{ status: 502 },
// 			);
// 		}

// 		if (useCache) {
// 			await setCache(cacheKey, reply, CACHE_TTL);
// 		}

// 		return NextResponse.json(
// 			{
// 				success: true,
// 				reply,
// 			} satisfies ChatResponse,
// 			{ status: 200 },
// 		);
// 	} catch (error: any) {
// 		console.error('[ASSISTANT CHAT ERROR] :', error);
// 		if (error?.status === 529 || error?.type === 'overloaded_error') {
// 			return NextResponse.json(
// 				{
// 					success: false,
// 					error: 'The AI service is temporarily overloaded. Please try again in a moment.',
// 				} satisfies ChatResponse,
// 				{
// 					status: 503,
// 					headers: {
// 						'Retry-After': '30',
// 					},
// 				},
// 			);
// 		}

// 		if (error?.status === 429) {
// 			return NextResponse.json(
// 				{
// 					success: false,
// 					error: 'Too many requests to Assistant Service. Please wait a minute.',
// 				} satisfies ChatResponse,
// 				{
// 					status: 429,
// 					headers: {
// 						'Retry-After': '60',
// 					},
// 				},
// 			);
// 		}

// 		if (error?.status >= 400 && error?.status < 600) {
// 			return NextResponse.json(
// 				{
// 					success: false,
// 					error: 'Assistant Service error. Please try again later.',
// 				} satisfies ChatResponse,
// 				{
// 					status: 502,
// 				},
// 			);
// 		}

// 		return NextResponse.json(
// 			{
// 				success: false,
// 				error: 'Internal server error.',
// 			} satisfies ChatResponse,
// 			{
// 				status: 500,
// 			},
// 		);
// 	}
// }

function sseEncode(obj: AssistantStreamServerEvent): Uint8Array {
	const enc = new TextEncoder();
	return enc.encode(`data: ${JSON.stringify(obj)}\n\n`);
}

export async function POST(req: NextRequest) {
	try {
		const body: ChatRequest = await req.json();
		const { message } = body;
		const history = normalizeHistory(body.history);

		if (!message || typeof message !== 'string' || message.length > MAX_MESSAGE_LENGTH) {
			return NextResponse.json(
				{
					success: false,
					error: 'Invalid message length',
				} satisfies ChatResponse,
				{ status: 400 },
			);
		}

		const rateLimit = await consumeAssistantRateLimit(req);

		if (!rateLimit.allowed) {
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
		const redisOn = APP_CONFIG.redis.enabled;
		const useCache = redisOn && history.length === 0;

		const cacheKey = assistantReplyKey(CONTENT_VERSION, localeTag, message);

		if (useCache) {
			const cached = await getCache<string>(cacheKey);
			if (cached) {
				// STREAM-REFACTOR-CACHE-DELAY: dodaj opóźnienia między chunkami dla płynnego efektu
				const stream = new ReadableStream({
					async start(controller) {
						const chunkSize = 2;
						const delayMs = 30; // 30ms między chunkami = ~33 chunki/s

						for (let i = 0; i < cached.length; i += chunkSize) {
							controller.enqueue(sseEncode({ type: 'delta', text: cached.slice(i, i + chunkSize) }));

							// Opóźnienie między chunkami (pomiń dla ostatniego)
							if (i + chunkSize < cached.length) {
								await new Promise(resolve => setTimeout(resolve, delayMs));
							}
						}

						controller.enqueue(sseEncode({ type: 'done' }));
						controller.close();
					},
				});

				return new Response(stream, {
					status: 200,
					headers: {
						'Content-Type': 'text/event-stream',
						'Cache-Control': 'no-cache',
						Connection: 'keep-alive',
						'Z-Accel-Buffering': 'no',
					},
				});
			}
		}

		const topicCheck = await checkTopic(message);
		if (!topicCheck.allowed) {
			const stream = new ReadableStream({
				start(controller) {
					controller.enqueue(
						sseEncode({
							type: 'rejected',
							topics: topicCheck?.topics || [],
							exampleQuestions: topicCheck.exampleQuestions,
						}),
					);
					controller.enqueue(sseEncode({ type: 'done' }));
					controller.close();
				},
			});

			return new Response(stream, {
				status: 200,
				headers: {
					'Content-Type': 'text/event-stream',
					'Cache-Control': 'no-cache',
					Connection: 'keep-alive',
					'Z-Accel-Buffering': 'no',
				},
			});
		}

		const stream = new ReadableStream({
			async start(controller) {
				const push = (event: AssistantStreamServerEvent) => controller.enqueue(sseEncode(event));

				try {
					const fulltext = await runAssistantLoopStreaming(message.trim(), {
						history,
						onTextDelta: chunk => push({ type: 'delta', text: chunk }),
					});

					if (!fulltext || fulltext.trim() === '') {
						push({ type: 'error', error: 'Assistatnt returned an empty response' });
					} else {
						if (useCache) {
							await setCache(cacheKey, fulltext, CACHE_TTL);
						}
					}

					push({ type: 'done' });
				} catch (error: any) {
					console.error('[ASSISTANT STREAM ERROR]:', error);
					if (error?.status === 529 || error?.type === 'overloaded_error') {
						push({ type: 'error', error: 'The AI service is temporarily overloaded. Please try again in a moment.' });
					} else if (error?.status === 429) {
						push({ type: 'error', error: 'Too many requests to Assistant Service. Please wait a minute.' });
					} else {
						push({ type: 'error', error: 'An error occurred while processing your request.' });
					}
					push({ type: 'done' });
				} finally {
					controller.close();
				}
			},
		});
		return new Response(stream, {
			status: 200,
			headers: {
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
				Connection: 'keep-alive',
				'Z-Accel-Buffering': 'no',
			},
		});
	} catch (error: any) {
		console.error('[ASSISTANT CHAT ERROR]:', error);
		// STREAM-REFACTOR: błędy przed utworzeniem strumienia — zwracamy JSON
		if (error?.status === 529 || error?.type === 'overloaded_error') {
			return NextResponse.json(
				{
					success: false,
					error: 'The AI service is temporarily overloaded. Please try again in a moment.',
				} satisfies ChatResponse,
				{
					status: 503,
					headers: {
						'Retry-After': '30',
					},
				},
			);
		}
		if (error?.status === 429) {
			return NextResponse.json(
				{
					success: false,
					error: 'Too many requests to Assistant Service. Please wait a minute.',
				} satisfies ChatResponse,
				{
					status: 429,
					headers: {
						'Retry-After': '60',
					},
				},
			);
		}
		if (error?.status >= 400 && error?.status < 600) {
			return NextResponse.json(
				{
					success: false,
					error: 'Assistant Service error. Please try again later.',
				} satisfies ChatResponse,
				{
					status: 502,
				},
			);
		}
		return NextResponse.json(
			{
				success: false,
				error: 'Internal server error.',
			} satisfies ChatResponse,
			{
				status: 500,
			},
		);
	}
}
