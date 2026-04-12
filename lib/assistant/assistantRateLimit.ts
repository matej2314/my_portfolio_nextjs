import { type NextRequest } from 'next/server';
import { APP_CONFIG } from '@/config/app.config';
import { getKeyTtlSeconds, incrementWithExpiry } from '@/lib/redis/redis';
import { assistantRateLimitKey } from '@/lib/redis/redisKeys';

const WINDOW_SEC = Number(process.env.ASSISTANT_RATE_LIMIT_WINDOW_SEC) || 60 * 15;
const MAX_REQUESTS = Number(process.env.ASSISTANT_RATE_LIMIT_MAX_REQUESTS) || 30;

export function getAssistantClientFingerprint(req: NextRequest): string {
	const forwarded = req.headers.get('x-forwarded-for');
	if (forwarded) {
		const first = forwarded.split(',')[0]?.trim();
		if (first) return first;
	}
	const realIP = req.headers.get('x-real-ip')?.trim();
	if (realIP) return realIP;
	return 'unknown';
}

export type AssistantRateLimitResult = { allowed: true } | { allowed: false; retryAfterSec: number };

export async function consumeAssistantRateLimit(req: NextRequest): Promise<AssistantRateLimitResult> {
	if (!APP_CONFIG.redis.enabled) {
		return { allowed: true };
	}

	const fingerprint = getAssistantClientFingerprint(req);
	const key = assistantRateLimitKey(fingerprint);

	const count = await incrementWithExpiry(key, WINDOW_SEC);

	if (count === null) {
		return { allowed: true };
	}

	if (count > MAX_REQUESTS) {
		const ttl = await getKeyTtlSeconds(key);
		return {
			allowed: false,
			retryAfterSec: ttl ?? WINDOW_SEC,
		};
	}

	return { allowed: true };
}
