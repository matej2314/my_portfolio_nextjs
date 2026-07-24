import { APP_CONFIG } from '@/config/app.config';
import { client, register } from '@/lib/metrics/registry';

const prefix = APP_CONFIG.metrics.prefix;
export type RedisOp = 'get' | 'set' | 'del' | 'incr' | 'ttl';

export const redisUp = new client.Gauge({
	name: `${prefix}redis_up`,
	help: 'Redis connectivity (1=up, 0=down)',
	registers: [register],
});

export const redisEnabled = new client.Gauge({
	name: `${prefix}redis_enabled`,
	help: 'Whether Redis is enabled in APP_CONFIG (1/0)',
	registers: [register],
});

export const redisOperationsTotal = new client.Counter({
	name: `${prefix}redis_operations_total`,
	help: 'Redis operations',
	labelNames: ['op', 'status'] as const,
	registers: [register],
});

export const redisOperationDurationSeconds = new client.Histogram({
	name: `${prefix}redis_operation_duration_seconds`,
	help: 'Redis operation duration',
	labelNames: ['op'] as const,
	buckets: [0.001, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1],
	registers: [register],
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
