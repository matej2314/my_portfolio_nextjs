import { NextRequest, NextResponse } from 'next/server';
import { getLocale } from 'next-intl/server';
import { APP_CONFIG } from '@/config/app.config';
import { getCache, setCache } from '@/lib/redis/redis';
import { checkTopic } from '@/lib/assistant/topicGate';
import { runAssistantLoop } from '@/lib/assistant/anthropicLoop';
import { assistantReplyKey } from '@/lib/redis/redisKeys';
import { cacheLocaleTag } from '@/lib/assistant/cacheLocaleTag';
import { normalizeHistory } from '@/lib/assistant/normalizeHistory';
import { consumeAssistantRateLimit } from '@/lib/assistant/assistantRateLimit';

import { type ChatRequest, type ChatResponse } from '@/lib/assistant/types';

const CONTENT_VERSION = process.env.ASSISTANT_CONTENT_VERSION || '1.0.0';
const CACHE_TTL = Number(process.env.ASSISTANT_CACHE_TTL) || 60 * 60 * 24;
const MAX_MESSAGE_LENGTH = Number(process.env.ASSISTANT_MAX_MESSAGE_LENGTH) || 500;

export async function POST(req: NextRequest) {
	try {
		const body: ChatRequest = await req.json();
		const { message } = body;
		const history = normalizeHistory(body.history);

		if (!message || typeof message !== 'string' || message.length > MAX_MESSAGE_LENGTH) {
			return NextResponse.json({ success: false, error: 'Invalid message length' } satisfies ChatResponse, { status: 400 });
		}

		const rateLimit = await consumeAssistantRateLimit(req);

		if (!rateLimit.allowed) {
			return NextResponse.json({
				success: false,
				error: 'Too many requests.'
			} satisfies ChatResponse, {
				status: 429,
				headers: {
					'Retry-After': String(rateLimit.retryAfterSec),
				},
			});
		}

		const localeTag = cacheLocaleTag(await getLocale());
		const redisOn = APP_CONFIG.redis.enabled;
		const useCache = redisOn && history.length === 0;

		const cacheKey = assistantReplyKey(CONTENT_VERSION, localeTag, message);
		if (useCache) {
			const cached = await getCache<string>(cacheKey);
			if (cached) {
				return NextResponse.json({ success: true, reply: cached } satisfies ChatResponse, { status: 200 });
			}
		}

		const topicCheck = await checkTopic(message);
		if (!topicCheck.allowed) {
			return NextResponse.json({
				success: true,
				rejected: true,
				topics: topicCheck.topics,
				exampleQuestions: topicCheck.exampleQuestions,
			} satisfies ChatResponse);
		}

		const reply = await runAssistantLoop(message.trim(), { history });

		if (reply === null || reply === '') {
			return NextResponse.json(
				{
					success: false,
					error: 'Assistant returned an empty response',
				} satisfies ChatResponse,
				{ status: 502 },
			);
		}

		if (useCache) {
			await setCache(cacheKey, reply, CACHE_TTL);
		}

		return NextResponse.json(
			{
				success: true,
				reply,
			} satisfies ChatResponse,
			{ status: 200 },
		);
	} catch (error) {
		console.error('[ASSISTANT CHAT ERROR] :', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Internal server error',
			} satisfies ChatResponse,
			{ status: 500 },
		);
	}
}
