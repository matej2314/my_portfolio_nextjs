import { APP_CONFIG } from '@/config/app.config';
import { client, register } from './registry';

const prefix = APP_CONFIG.metrics.prefix;

export type AssistantRequestResult = 'success' | 'rate_limited' | 'validation_error' | 'topic_rejected' | 'llm_error' | 'mcp_error' | 'cache_hit' | 'empty_response' | 'error';

export const assistantRequestsTotal = new client.Counter({
	name: `${prefix}assistant_requests_total`,
	help: 'Assistant chat requests by result',
	labelNames: ['result'] as const,
	registers: [register],
});

export const assistantRequestDurationSeconds = new client.Histogram({
	name: `${prefix}assistant_request_duration_seconds`,
	help: 'Full assistant request duration until stream end / cache replay end',
	buckets: [0.1, 0.25, 0.5, 1, 2.5, 5, 10, 30, 60],
	registers: [register],
});

export const assistantRateLimitRejectionsTotal = new client.Counter({
	name: `${prefix}assistant_rate_limit_rejections_total`,
	help: 'Assistant rate limit rejections',
	registers: [register],
});

export const assistantCacheHitsTotal = new client.Counter({
	name: `${prefix}assistant_cache_hits_total`,
	help: 'Assistant reply cache hits',
	registers: [register],
});

export const assistantCacheMissesTotal = new client.Counter({
	name: `${prefix}assistant_cache_misses_total`,
	help: 'Assistant reply cache misses',
	registers: [register],
});

export const assistantTopicRejectionsTotal = new client.Counter({
	name: `${prefix}assistant_topic_rejections_total`,
	help: 'Assistant topic gate rejections',
	registers: [register],
});

export const assistantStreamErrorsTotal = new client.Counter({
	name: `${prefix}assistant_stream_errors_total`,
	help: 'Assistant SSE stream errors',
	labelNames: ['kind'] as const,
	registers: [register],
});

export const assistantLlmIterations = new client.Histogram({
	name: `${prefix}assistant_llm_iterations`,
	help: 'Number of Anthropic tool-use iterations per request',
	buckets: [1, 2, 3, 4, 5, 6, 8, 10],
	registers: [register],
});

export const assistantLlmTokensTotal = new client.Counter({
	name: `${prefix}assistant_llm_tokens_total`,
	help: 'Anthropic token usage',
	labelNames: ['direction'] as const,
	registers: [register],
});

export const assistantLlmRetriesTotal = new client.Counter({
	name: `${prefix}assistant_llm_retries_total`,
	help: 'Anthropic API retries (e.g. 529 overloaded)',
	registers: [register],
});

export function observeAssistantResult(result: AssistantRequestResult): void {
	assistantRequestsTotal.inc({ result });
}

export function incrementAssistantRateLimitRejections(): void {
	assistantRateLimitRejectionsTotal.inc();
}

export function incrementAssistantCacheHits(): void {
	assistantCacheHitsTotal.inc();
}

export function observeAssistantRequestDuration(durationSec: number): void {
	assistantRequestDurationSeconds.observe(durationSec);
}

export function incrementAssistantCacheMisses(): void {
	assistantCacheMissesTotal.inc();
}

export function incrementAssistantTopicRejections(): void {
	assistantTopicRejectionsTotal.inc();
}

export function incrementAssistantTokensTotal(direction: 'input' | 'output', tokens: number): void {
	if (!Number.isFinite(tokens) || tokens < 0) return;
	assistantLlmTokensTotal.inc({ direction }, tokens);
}

export function incrementAssistantStreamErrors(kind: 'mcp_error' | 'llm_error'): void {
	assistantStreamErrorsTotal.inc({ kind });
}


