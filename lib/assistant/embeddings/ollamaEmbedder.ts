import { Ollama } from 'ollama';
import { APP_CONFIG } from '@/config/app.config';
import logger from '@/lib/winston.config';
import { assistantEmbedDurationSeconds } from '@/lib/metrics/semanticCacheMetrics';
import { isEmbedCircuitOpen, recordEmbedFailure, recordEmbedSuccess } from './embedCircuit';
import type { TextEmbedder } from './types';

const { host, embedModel, embedTimeoutMs, keepAlive, embeddingDimensions } = APP_CONFIG.ollama;

async function fetchWithTimeout(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), embedTimeoutMs);
	return fetch(input, { ...init, signal: controller.signal }).finally(() => clearTimeout(timer));
}

const ollama = new Ollama({
	host: host.replace(/\/$/, ''),
	fetch: fetchWithTimeout,
});

export const ollamaEmbedder: TextEmbedder = {
	async embed(text: string): Promise<number[] | null> {
		if (isEmbedCircuitOpen()) return null;

		const started = process.hrtime.bigint();
		try {
			const response = await ollama.embed({
				model: embedModel,
				input: text,
				keep_alive: keepAlive,
			});
			assistantEmbedDurationSeconds.observe(Number(process.hrtime.bigint() - started) / 1e9);

			const vector = response.embeddings?.[0];
			if (!vector || vector.length !== embeddingDimensions) {
				recordEmbedFailure();
				logger.error('[OLLAMA EMBED] unexpected dimensions', { length: vector?.length });
				return null;
			}

			recordEmbedSuccess();
			return vector;
		} catch (error) {
			assistantEmbedDurationSeconds.observe(Number(process.hrtime.bigint() - started) / 1e9);
			recordEmbedFailure();
			logger.error('[OLLAMA EMBED] failed', error);
			return null;
		}
	},
};
