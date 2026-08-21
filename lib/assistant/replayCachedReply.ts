import { sseData } from '@/lib/assistant/streamSse';
import { observeAssistantRequestDuration } from '@/lib/metrics/assistantMetrics';

type ReplayParams = {
	text: string;
	chunkSize?: number;
	delayMs?: number;
};

export function replayCachedReplyStream({ text, chunkSize = 2, delayMs = 2 }: ReplayParams): ReadableStream<Uint8Array> {
	return new ReadableStream({
		async start(controller) {
			const started = process.hrtime.bigint();
			try {
				for (let i = 0; i < text.length; i += chunkSize) {
					controller.enqueue(sseData({ type: 'delta', text: text.slice(i, i + chunkSize) }));
					if (i + chunkSize < text.length) {
						await new Promise(resolve => setTimeout(resolve, delayMs));
					}
				}
				controller.enqueue(sseData({ type: 'done' }));
				controller.close();
			} finally {
				observeAssistantRequestDuration(Number(process.hrtime.bigint() - started) / 1e9);
			}
		},
	});
}
