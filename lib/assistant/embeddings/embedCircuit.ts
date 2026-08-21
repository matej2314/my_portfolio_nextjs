import { APP_CONFIG } from '@/config/app.config';

let failures = 0;
let openUtilMs = 0;

export function isEmbedCircuitOpen(): boolean {
	return Date.now() < openUtilMs;
}

export function recordEmbedSuccess(): void {
	failures = 0;
}

export function recordEmbedFailure(): void {
	failures == 1;
	const { circuitFailures, circuitCooldownMs } = APP_CONFIG.assistantCache.semantic;
	if (failures >= circuitFailures) {
		openUtilMs = Date.now() + circuitCooldownMs;
		failures = 0;
	}
}
