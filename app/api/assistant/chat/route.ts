import { NextRequest, NextResponse } from 'next/server';
import { getLocale } from 'next-intl/server';
import { APP_CONFIG } from '@/config/app.config';
import { getCache, setCache } from '@/lib/redis/redis';
// import {assistantReplyKeys} from '@/lib/redis/redisKeys';
import { checkTopic } from '@/lib/assistant/topicGate';
import { runAssistantLoop } from '@/lib/assistant/anthropicLoop';
import { type ChatRequest, ChatResponse } from '@/lib/assistant/types';
import { m } from 'motion/react';

const CONTENT_VERSION = process.env.ASSISTANT_CONTENT_VERSION || '1.0.0';
const CACHE_TTL = 60 * 60 * 24;

function cacheLocaleTag(raw: string): string {
	return raw === 'pl' ? 'pl' : 'en';
}

export async function POST(req: NextRequest) {
	try {
		const body: ChatRequest = await req.json();
		const { message } = body;

		if (!message || typeof message !== 'string' || message.length > 500) {
			return NextResponse.json(
				{
					success: false,
					error: 'Invalid message length',
				},
				{ status: 400 },
			);
		}

		const localeTag = cacheLocaleTag(await getLocale());
		const redisOn = APP_CONFIG.redis.enabled;

		// const cacheKey = assistantReplyKeys(CONTENT_VERSION,localeTag, message);
		// if (redisOn) {
		//     const cached = await getCache<string>(cacheKey);
		//     if (cached) {
		//         return NextResponse.json({
		//             success: true, reply: cached
		//         } satisfies ChatResponse
		//         }, { status: 200 };
		//     }
		// }

		const topicCheck = await checkTopic(message);
		if (!topicCheck.allowed) {
			return NextResponse.json({
				success: true,
				rejected: true,
				topics: topicCheck.topics,
				exampleQuestions: topicCheck.exampleQuestions,
			} satisfies ChatResponse);
		}

		const reply = await runAssistantLoop(message);

		if (reply === null || reply === '') {
			return NextResponse.json(
				{
					success: false,
					error: 'Assistant returned no reply',
				},
				{ status: 502 },
			);
		}

		if (redisOn) {
			// await setCache(cacheKey, reply, CACHE_TTL);
		}

		return NextResponse.json(
			{
				success: true,
				reply,
			} satisfies ChatResponse,
			{ status: 200 },
		);
	} catch (error) {
		console.error('[Assistant Chat Error]', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Internal server error',
			},
			{ status: 500 },
		);
	}
}
