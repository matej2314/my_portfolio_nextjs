import client from 'prom-client';
import { APP_CONFIG } from '@/config/app.config';

type MetricsGlobals = {
	register: client.Registry;
	defaultMetricsStarted: boolean;
};

const globalForMetrics = globalThis as typeof globalThis & {
	__portfolioMetrics?: MetricsGlobals;
};

function getMetricsGlobals(): MetricsGlobals {
	if (!globalForMetrics.__portfolioMetrics) {
		const register = new client.Registry();
		globalForMetrics.__portfolioMetrics = {
			register,
			defaultMetricsStarted: false,
		};
	}
	return globalForMetrics.__portfolioMetrics;
}

const { register } = getMetricsGlobals();

if (APP_CONFIG.metrics.collectDefaultMetrics && !getMetricsGlobals().defaultMetricsStarted) {
	client.collectDefaultMetrics({
		register,
		prefix: APP_CONFIG.metrics.prefix,
	});
	getMetricsGlobals().defaultMetricsStarted = true;
}

export { client, register };

/** Reuse metrics across Next.js HMR / route module re-evals (registry is a process singleton). */
export function getOrCreateCounter<T extends string>(
	configuration: client.CounterConfiguration<T>,
): client.Counter<T> {
	const existing = register.getSingleMetric(configuration.name);
	if (existing) {
		return existing as client.Counter<T>;
	}
	return new client.Counter({ ...configuration, registers: [register] });
}

export function getOrCreateHistogram<T extends string>(
	configuration: client.HistogramConfiguration<T>,
): client.Histogram<T> {
	const existing = register.getSingleMetric(configuration.name);
	if (existing) {
		return existing as client.Histogram<T>;
	}
	return new client.Histogram({ ...configuration, registers: [register] });
}

export function getOrCreateGauge<T extends string>(
	configuration: client.GaugeConfiguration<T>,
): client.Gauge<T> {
	const existing = register.getSingleMetric(configuration.name);
	if (existing) {
		return existing as client.Gauge<T>;
	}
	return new client.Gauge({ ...configuration, registers: [register] });
}

export async function getMetricsText(): Promise<string> {
	return register.metrics();
}

export function getMetricsContentType(): string {
	return register.contentType;
}
