import { APP_CONFIG } from '@/config/app.config';
import {
	getOrCreateCounter,
	getOrCreateGauge,
	getOrCreateHistogram,
} from '@/lib/metrics/registry';

const prefix = APP_CONFIG.metrics.prefix;
export type RedisOp = 'get' | 'set' | 'del' | 'incr' | 'ttl';

export const redisUp = getOrCreateGauge({
	name: `${prefix}redis_up`,
	help: 'Redis connectivity (1=up, 0=down)',
});

export const redisEnabled = getOrCreateGauge({
	name: `${prefix}redis_enabled`,
	help: 'Whether Redis is enabled in APP_CONFIG (1/0)',
});

export const redisOperationsTotal = getOrCreateCounter({
	name: `${prefix}redis_operations_total`,
	help: 'Redis operations',
	labelNames: ['op', 'status'] as const,
});

export const redisOperationDurationSeconds = getOrCreateHistogram({
	name: `${prefix}redis_operation_duration_seconds`,
	help: 'Redis operation duration',
	labelNames: ['op'] as const,
	buckets: [0.001, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1],
});

export function observeRedisOp(op: RedisOp, status: 'ok' | 'error', durationSec: number): void {
	redisOperationsTotal.inc({ op, status });
	redisOperationDurationSeconds.observe({ op }, durationSec);
}

export function observeRedisUp(up: boolean): void {
	redisUp.set(up ? 1 : 0);
}

export function observeRedisEnabled(enabled: boolean): void {
	redisEnabled.set(enabled ? 1 : 0);
}
