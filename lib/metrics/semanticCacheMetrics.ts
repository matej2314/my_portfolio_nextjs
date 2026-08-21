import { APP_CONFIG } from '@/config/app.config';
import { getOrCreateCounter, getOrCreateHistogram } from './registry';

const prefix = APP_CONFIG.metrics.prefix;

export type SemanticRedisOp = 'hset' | 'ft_search' | 'ft_cmd';

export const assistantCacheHitsByKindTotal = getOrCreateCounter({
	name: `${prefix}assistant_cache_hits_by_kind_total`,
	help: 'Assistant cache hits by layer',
	labelNames: ['kind'] as const,
});

export const assistantSemanticLookupsTotal = getOrCreateCounter({
	name: `${prefix}assistant_semantic_lookups_total`,
	help: 'Semantic L2 lookup outcomes',
	labelNames: ['result'] as const,
});

export const assistantSemanticDistance = getOrCreateHistogram({
	name: `${prefix}assistant_semantic_distance`,
	help: 'Cosine distance of nearest neighbour (Redis KNN dist)',
	buckets: [0.01, 0.03, 0.05, 0.07, 0.1, 0.15, 0.25, 0.5, 1, 2],
});

export const assistantEmbedDurationSeconds = getOrCreateHistogram({
	name: `${prefix}assistant_embed_duration_seconds`,
	help: 'Ollama embed latency',
	buckets: [0.02, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5],
});

export const semanticRedisOperationsTotal = getOrCreateCounter({
	name: `${prefix}semantic_redis_operations_total`,
	help: 'Semantic Redis operations',
	labelNames: ['op', 'status'] as const,
});

export const semanticRedisOperationDurationSeconds = getOrCreateHistogram({
	name: `${prefix}semantic_redis_operation_duration_seconds`,
	help: 'Semantic Redis operation duration',
	labelNames: ['op'] as const,
	buckets: [0.001, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1],
});

export function observeSemanticRedisOp(op: SemanticRedisOp, status: 'ok' | 'error', durationSec: number): void {
	semanticRedisOperationsTotal.inc({ op, status });
	semanticRedisOperationDurationSeconds.observe({ op }, durationSec);
}

export function incrementCacheHitKind(kind: 'exact' | 'semantic'): void {
	assistantCacheHitsByKindTotal.inc({ kind });
}

export function incrementSemanticLookup(result: 'hit' | 'miss' | 'error' | 'skipped_circuit' | 'skipped_disabled'): void {
	assistantSemanticLookupsTotal.inc({ result });
}
