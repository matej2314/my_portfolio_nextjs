import Redis from 'ioredis';

export const redis = new Redis({
	host: process.env.REDIS_HOST || 'localhost',
	port: Number(process.env.REDIS_PORT) || 6379,
	password: process.env.REDIS_PASSWORD,
	maxRetriesPerRequest: 3,
	enableReadyCheck: true,
	connectTimeout: 5000,
	keyPrefix: 'portfolio:',
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
	await redis.quit();
	process.exit(0);
});

process.on('SIGTERM', async () => {
	console.log('🛑 Received SIGTERM, closing Redis connection...');
	await redis.quit();
	process.exit(0);
});

export const setCache = async <T>(key: string, value: T, expireSeconds?: number) => {
	try {
		const jsonValue = JSON.stringify(value);
		if (expireSeconds) {
			await redis.setex(key, expireSeconds, jsonValue);
		} else {
			await redis.set(key, jsonValue);
		}
		return true;
	} catch (error) {
		console.error(`Radis set error for key ${key}:`, error);
		return false;
	}
};

export const getCache = async <T>(key: string): Promise<T | null> => {
	try {
		const value = await redis.get(key);
		if (!value) return null;
		return JSON.parse(value) as T;
	} catch (error) {
		console.error(`Radis get error for key ${key}:`, error);
		return null;
	}
};

export const deleteCache = async (key: string) => {
	try {
		await redis.del(key);
		return true;
	} catch (error) {
		console.error(`Redis delete error for key ${key}:`, error);
		return false;
	}
};

export const deleteMultipleCache = async (...keys: string[]) => {
	try {
		await redis.del(...keys);
		return true;
	} catch (error) {
		console.error(`Redis deletemultipleCache error:`, error);
		return false;
	}
};
