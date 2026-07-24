'use client';

type ClientMetricsEvent = { type: 'cv_download'; locale: 'pl' | 'en' } | { type: 'reference_download'; reference: 'json_crew' } | { type: 'assistant_ui_open' };

export function trackClientEvent(event: ClientMetricsEvent): void {
	const body = JSON.stringify(event);
	try {
		if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
			const blob = new Blob([body], { type: 'application/json' });
			navigator.sendBeacon('/api/metrics/event', blob);
			return;
		}
	} catch {}
	void fetch('/api/metrics/event', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body,
		keepalive: true,
	}).catch(() => {});
}
