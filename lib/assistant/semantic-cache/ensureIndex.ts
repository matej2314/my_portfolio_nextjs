import { APP_CONFIG } from '@/config/app.config';
import { assistantSemanticDocPrefix, assistantSemanticIndexName } from '@/lib/redis/redisKeys';
import { getSemanticRedis, semanticRedisEnabled } from '@/lib/redis/semanticRedis';
import logger from '@/lib/winston.config';

let ensurePromise: Promise<boolean> | null = null;

const createIndex = async (): Promise<boolean> => {
	const redis = getSemanticRedis();
	if (!redis) return false;

	const prefix = APP_CONFIG.redis.semanticKeyPrefix;
	const index = assistantSemanticIndexName(prefix);
	const docPrefix = assistantSemanticDocPrefix(prefix);
	const dim = String(APP_CONFIG.ollama.embeddingDimensions);

	try {
		await redis.call('FT.INFO', index);
		return true;
	} catch {
		// indeks nie istnieje
	}

	try {
		await redis.call('FT.CREATE', index, 'ON', 'HASH', 'PREFIX', '1', docPrefix, 'SCHEMA', 'locale', 'TAG', 'version', 'TAG', 'model', 'TAG', 'message', 'TEXT', 'reply', 'TEXT', 'embedding', 'VECTOR', 'FLAT', '6', 'TYPE', 'FLOAT32', 'DIM', dim, 'DISTANCE_METRIC', 'COSINE');
		logger.info(`✅ Semantic index created: ${index}`);
		return true;
	} catch (error) {
		const msg = error instanceof Error ? error.message : String(error);
		if (msg.includes('already exists') || msg.includes('Index already exists')) return true;
		logger.error('❌ Semantic FT.CREATE failed', error);
		return false;
	}
};

export const ensureSemanticIndex = (): Promise<boolean> => {
	if (!semanticRedisEnabled()) return Promise.resolve(false);
	if (!ensurePromise) ensurePromise = createIndex();
	return ensurePromise;
};
