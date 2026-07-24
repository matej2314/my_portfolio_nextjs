import Redis from 'ioredis';
import { APP_CONFIG } from '@/config/app.config';
import logger from '../winston.config';
import { logErrAndReturn } from '../utils/logErrAndReturn';
import { observeRedisUp, observeRedisEnabled, observeRedisOp } from '../metrics/redisMetrics';

const REDIS_ENABLED = APP_CONFIG.redis.enabled;

let redis: Redis | null = null;

if (REDIS_ENABLED) {
	redis = new Redis({
		host: APP_CONFIG.redis.host || APP_CONFIG.redis.defaultHost,
		port: Number(APP_CONFIG.redis.port) || APP_CONFIG.redis.defaultPort,
		password: APP_CONFIG.redis.password,
		maxRetriesPerRequest: APP_CONFIG.redis.maxRetriesPerRequest,
		enableReadyCheck: APP_CONFIG.redis.enableReadyCheck,
		connectTimeout: APP_CONFIG.redis.connectTimeout,
		keyPrefix: APP_CONFIG.redis.keyPrefix,
	});
	observeRedisEnabled(true);
	observeRedisUp(false);

	// Event listeners for monitoring
	redis.on('connect', () => {
		logger.info('✅ Redis connected successfully.');
	});

	redis.on('ready', () => {
		logger.info('✅ Redis is ready to accept commands.');
		observeRedisUp(true);
	});

	redis.on('error', error => {
		logger.error('❌ Redis connection error:', error);
		observeRedisUp(false);
	});

	redis.on('close', () => {
		logger.info('🔌 Redis connection closed.');
		observeRedisUp(false);
	});

	redis.on('reconnecting', () => {
		logger.info('🔄 Redis reconnecting...');
	});

	// Graceful shutdown
	process.on('SIGINT', async () => {
		logger.info('🛑 Received SIGINT, closing Redis connection...');
		await redis?.quit();
		process.exit(0);
	});

	process.on('SIGTERM', async () => {
		logger.info('🛑 Received SIGTERM, closing Redis connection...');
		await redis?.quit();
		process.exit(0);
	});
} else {
	logger.info('Redis is disabled.');
	observeRedisEnabled(false);
	observeRedisUp(false);
}

export const setCache = async <T>(key: string, value: T, expireSeconds?: number) => {
	const startTime = process.hrtime.bigint();
	try {
		const jsonValue = JSON.stringify(value);
		if (expireSeconds) {
			await redis?.setex(key, expireSeconds, jsonValue);
			observeRedisOp('set', 'ok', Number(process.hrtime.bigint() - startTime) / 1e9);
		} else {
			await redis?.set(key, jsonValue);
			observeRedisOp('set', 'ok', Number(process.hrtime.bigint() - startTime) / 1e9);
		}
		return true;
	} catch (error) {
		observeRedisOp('set', 'error', Number(process.hrtime.bigint() - startTime) / 1e9);
		return logErrAndReturn(`Radis set error for key ${key}:`, error, false);
	}
};

export const getCache = async <T>(key: string): Promise<T | null> => {
	const startTime = process.hrtime.bigint();
	try {
		const value = await redis?.get(key);
		observeRedisOp('get', 'ok', Number(process.hrtime.bigint() - startTime) / 1e9);
		if (!value) return null;
		return JSON.parse(value) as T;
	} catch (error) {
		observeRedisOp('get', 'error', Number(process.hrtime.bigint() - startTime) / 1e9);
		return logErrAndReturn(`Radis get error for key ${key}:`, error, null);
	}
};

export const deleteCache = async (key: string) => {
	const startTime = process.hrtime.bigint();
	try {
		await redis?.del(key);
		observeRedisOp('del', 'ok', Number(process.hrtime.bigint() - startTime) / 1e9);
		return true;
	} catch (error) {
		observeRedisOp('del', 'error', Number(process.hrtime.bigint() - startTime) / 1e9);
		return logErrAndReturn(`Redis delete error for key ${key}:`, error, false);
	}
};

export const deleteMultipleCache = async (...keys: string[]) => {
	const startTime = process.hrtime.bigint();
	try {
		await redis?.del(...keys);
		observeRedisOp('del', 'ok', Number(process.hrtime.bigint() - startTime) / 1e9);
		return true;
	} catch (error) {
		observeRedisOp('del', 'error', Number(process.hrtime.bigint() - startTime) / 1e9);
		return logErrAndReturn(`Redis deletemultipleCache error:`, error, false);
	}
};

export const incrementWithExpiry = async (key: string, expireSeconds: number): Promise<number | null> => {
	if (!REDIS_ENABLED || !redis) return null;
	try {
		const count = await redis.incr(key);
		if (count === 1) {
			await redis.expire(key, expireSeconds);
		}
		return count;
	} catch (error) {
		return logErrAndReturn(`Redis incrementWithExpiry error for key ${key}:`, error, null);
	}
};

export const getKeyTtlSeconds = async (key: string): Promise<number | null> => {
	if (!REDIS_ENABLED || !redis) return null;
	try {
		const ttl = await redis.ttl(key);
		if (ttl < 0) return null;
		return ttl;
	} catch (error) {
		return logErrAndReturn(`Redis getKeyTtlSeconds error for key ${key}:`, error, null);
	}
};
