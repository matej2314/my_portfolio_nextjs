import Redis from 'ioredis';
import { APP_CONFIG } from '@/config/app.config';
import logger from '@/lib/winston.config';
import { logErrAndReturn } from '../utils/logErrAndReturn';
import { observeSemanticRedisOp } from '@/lib/metrics/semanticCacheMetrics';

const enabled = APP_CONFIG.redis.enabled && APP_CONFIG.assistantCache.semantic.enabled;

let semanticRedis: Redis | null = null;

if (enabled) {
	semanticRedis = new Redis({
		host: APP_CONFIG.redis.host || APP_CONFIG.redis.defaultHost,
		port: Number(APP_CONFIG.redis.port) || APP_CONFIG.redis.defaultPort,
		password: APP_CONFIG.redis.password,
		maxRetriesPerRequest: APP_CONFIG.redis.maxRetriesPerRequest,
		enableReadyCheck: APP_CONFIG.redis.enableReadyCheck,
		connectTimeout: APP_CONFIG.redis.connectTimeout,
		commandTimeout: 3000,
	});

	semanticRedis.on('error', error => {
		logger.error('Semantic redis connection error:', error);
	});

	semanticRedis.on('ready', () => {
		logger.info('Semantic Redis client ready.');
	});
}

export const getSemanticRedis = (): Redis | null => semanticRedis;

export const semanticRedisEnabled = (): boolean => enabled && semanticRedis !== null;

export async function semanticHsetExpire(
	key: string,
	fields: Record<string, string | Buffer>,
	ttlSeconds: number,
): Promise<boolean> {
	if (!semanticRedis) return false;
	const started = process.hrtime.bigint();
	try {
		await semanticRedis.hset(key, fields);
		await semanticRedis.expire(key, ttlSeconds);
		observeSemanticRedisOp('hset', 'ok', Number(process.hrtime.bigint() - started) / 1e9);
		return true;
	} catch (error) {
		observeSemanticRedisOp('hset', 'error', Number(process.hrtime.bigint() - started) / 1e9);
		return logErrAndReturn(`Semantic Redis HSET/EXPIRE ${key}:`, error, false);
	}
}

export async function semanticCall(command: string, args: (string | Buffer | number)[]): Promise<unknown> {
	if (!semanticRedis) return null;
	const started = process.hrtime.bigint();
	try {
		const result = await semanticRedis.call(command, ...args);
		observeSemanticRedisOp(command === 'FT.SEARCH' ? 'ft_search' : 'ft_cmd', 'ok', Number(process.hrtime.bigint() - started) / 1e9);
		return result;
	} catch (error) {
		observeSemanticRedisOp(command === 'FT.SEARCH' ? 'ft_search' : 'ft_cmd', 'error', Number(process.hrtime.bigint() - started) / 1e9);
		return logErrAndReturn(`Semantic Redis ${command}:`, error, null);
	}
}
