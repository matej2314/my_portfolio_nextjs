import { APP_CONFIG } from '@/config/app.config';
import { ollamaEmbedder } from '@/lib/assistant/embeddings/ollamaEmbedder';
import { isEmbedCircuitOpen } from '@/lib/assistant/embeddings/embedCircuit';
import { assistantSemanticReplyKey } from '@/lib/redis/redisKeys';
import { semanticHsetExpire, semanticRedisEnabled } from '@/lib/redis/semanticRedis';
import { ensureSemanticIndex } from './ensureIndex';
import { withNomicQueryPrefix } from './nomicPrefix';
import { toRedisTag } from './tagSafe';
import { float32Buffer } from './vectorCodec';

type StoreInput = {
	message: string;
	locale: string;
	contentVersion: string;
	reply: string;
};

export async function storeSemanticReply(input: StoreInput): Promise<void> {
	if (!semanticRedisEnabled() || isEmbedCircuitOpen()) return;

	const indexed = await ensureSemanticIndex();
	if (!indexed) return;

	const vector = await ollamaEmbedder.embed(withNomicQueryPrefix(input.message));
	if (!vector) return;

	const prefix = APP_CONFIG.redis.semanticKeyPrefix;
	const locale = toRedisTag(input.locale);
	const version = toRedisTag(input.contentVersion);
	const model = toRedisTag(APP_CONFIG.ollama.embedModel);
	const key = assistantSemanticReplyKey(prefix, version, locale, input.message);

	await semanticHsetExpire(
		key,
		{
			locale,
			version,
			model,
			message: input.message,
			reply: input.reply,
			embedding: float32Buffer(vector),
		},
		APP_CONFIG.assistantCache.ttlSeconds,
	);
}
