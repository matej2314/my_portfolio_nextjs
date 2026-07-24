import { APP_CONFIG } from '@/config/app.config';
import { getOrCreateCounter, getOrCreateGauge, getOrCreateHistogram } from './registry';

const prefix = APP_CONFIG.metrics.prefix;

export const httpRequestsTotal = getOrCreateCounter({
	name: `${prefix}http_requests_total`,
	help: 'Total number of HTTP requests handled by API routes',
	labelNames: ['method', 'route', 'status'] as const,
});

export const httpRequestDurationSeconds = getOrCreateHistogram({
	name: `${prefix}http_request_duration_seconds`,
	help: 'Duration of HTTP requests in seconds',
	labelNames: ['method', 'route', 'status'] as const,
	buckets: [0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10, 30],
});

export const httpRequestsInFlight = getOrCreateGauge({
	name: `${prefix}http_requests_in_flight`,
	help: 'Number of HTTP requests currently in flight',
	labelNames: ['method', 'route'] as const,
});

type ObserveHttpArgs = {
	method: string;
	route: string;
	status: number;
	durationSec: number;
};

export function observeHttpRequest({ method, route, status, durationSec }: ObserveHttpArgs): void {
	const statusLabel = String(status);
	httpRequestsTotal.inc({ method, route, status: statusLabel });
	httpRequestDurationSeconds.observe({ method, route, status: statusLabel }, durationSec);
}

export function withHttpMetrics<TArgs extends unknown[]>(
	route: string,
	method: string,
	handler: (...args: TArgs) => Promise<Response>,
): (...args: TArgs) => Promise<Response> {
	return async (...args: TArgs) => {
		const started = process.hrtime.bigint();
		httpRequestsInFlight.inc({ method, route });
		try {
			const response = await handler(...args);
			const durationSec = Number(process.hrtime.bigint() - started) / 1e9;
			observeHttpRequest({
				method,
				route,
				status: response.status,
				durationSec,
			});
			return response;
		} catch (error) {
			const durationSec = Number(process.hrtime.bigint() - started) / 1e9;
			observeHttpRequest({ method, route, status: 500, durationSec });
			throw error;
		} finally {
			httpRequestsInFlight.dec({ method, route });
		}
	};
}
