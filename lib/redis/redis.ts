import Redis from 'ioredis';
import { APP_CONFIG } from '@/config/app.config';

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

	// Event listeners for monitoring
	redis.on('connect', () => {
		console.log('✅ Redis connected successfully.');
	});

	redis.on('ready', () => {
		console.log('✅ Redis is ready to accept commands.');
	});

	redis.on('error', error => {
		console.error('❌ Redis connection error:', error);
	});

	redis.on('close', () => {
		console.log('🔌 Redis connection closed.');
	});

	redis.on('reconnecting', () => {
		console.log('🔄 Redis reconnecting...');
	});

	// Graceful shutdown
	process.on('SIGINT', async () => {
		console.log('🛑 Received SIGINT, closing Redis connection...');
		await redis?.quit();
		process.exit(0);
	});

	process.on('SIGTERM', async () => {
		console.log('🛑 Received SIGTERM, closing Redis connection...');
		await redis?.quit();
		process.exit(0);
	});
} else {
	console.log('Redis is disabled.');
}

export const setCache = async <T>(key: string, value: T, expireSeconds?: number) => {
	try {
		const jsonValue = JSON.stringify(value);
		if (expireSeconds) {
			await redis?.setex(key, expireSeconds, jsonValue);
		} else {
			await redis?.set(key, jsonValue);
		}
		return true;
	} catch (error) {
		console.error(`Radis set error for key ${key}:`, error);
		return false;
	}
};

export const getCache = async <T>(key: string): Promise<T | null> => {
	try {
		const value = await redis?.get(key);
		if (!value) return null;
		return JSON.parse(value) as T;
	} catch (error) {
		console.error(`Radis get error for key ${key}:`, error);
		return null;
	}
};

export const deleteCache = async (key: string) => {
	try {
		await redis?.del(key);
		return true;
	} catch (error) {
		console.error(`Redis delete error for key ${key}:`, error);
		return false;
	}
};

export const deleteMultipleCache = async (...keys: string[]) => {
	try {
		await redis?.del(...keys);
		return true;
	} catch (error) {
		console.error(`Redis deletemultipleCache error:`, error);
		return false;
	}
};
