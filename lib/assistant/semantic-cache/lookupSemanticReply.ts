import { APP_CONFIG } from '@/config/app.config';
import { ollamaEmbedder } from '@/lib/assistant/embeddings/ollamaEmbedder';
import { isEmbedCircuitOpen } from '@/lib/assistant/embeddings/embedCircuit';
import { assistantSemanticIndexName } from '@/lib/redis/redisKeys';
import { semanticCall, semanticRedisEnabled } from '@/lib/redis/semanticRedis';
import { assistantSemanticDistance, incrementSemanticLookup } from '@/lib/metrics/semanticCacheMetrics';
import { ensureSemanticIndex } from './ensureIndex';
import { withNomicQueryPrefix } from './nomicPrefix';
import { parseFtSearchKnn } from './parseFtSearch';
import { toRedisTag } from './tagSafe';
import { float32Buffer, maxCosineDistance } from './vectorCodec';

export type SemanticHit = {
	reply: string;
	dist: number;
	similarity: number;
};

type LookupInput = {
	message: string;
	locale: string;
	contentVersion: string;
};

export async function lookupSemanticReply(input: LookupInput): Promise<SemanticHit | null> {
	if (!semanticRedisEnabled()) {
		incrementSemanticLookup('skipped_disabled');
		return null;
	}
	if (isEmbedCircuitOpen()) {
		incrementSemanticLookup('skipped_circuit');
		return null;
	}

	const indexed = await ensureSemanticIndex();
	if (!indexed) {
		incrementSemanticLookup('error');
		return null;
	}

	const vector = await ollamaEmbedder.embed(withNomicQueryPrefix(input.message));
	if (!vector) {
		incrementSemanticLookup('error');
		return null;
	}

	const prefix = APP_CONFIG.redis.semanticKeyPrefix;
	const index = assistantSemanticIndexName(prefix);
	const locale = toRedisTag(input.locale);
	const version = toRedisTag(input.contentVersion);
	const model = toRedisTag(APP_CONFIG.ollama.embedModel);
	const query = `(@locale:{${locale}} @version:{${version}} @model:{${model}})=>[KNN 1 @embedding $vec AS dist]`;

	const raw = await semanticCall('FT.SEARCH', [index, query, 'PARAMS', '2', 'vec', float32Buffer(vector), 'SORTBY', 'dist', 'RETURN', '3', 'reply', 'message', 'dist', 'DIALECT', '2']);

	const neighbour = parseFtSearchKnn(raw);
	if (!neighbour) {
		incrementSemanticLookup('miss');
		return null;
	}

	assistantSemanticDistance.observe(neighbour.dist);

	const threshold = APP_CONFIG.assistantCache.semantic.similarityThreshold;
	const limit = maxCosineDistance(Number.isFinite(threshold) ? threshold : 0.93);
	if (neighbour.dist > limit) {
		incrementSemanticLookup('miss');
		return null;
	}

	incrementSemanticLookup('hit');
	return {
		reply: neighbour.reply,
		dist: neighbour.dist,
		similarity: 1 - neighbour.dist,
	};
}
