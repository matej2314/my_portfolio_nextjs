import { type GA4Event } from '@/types/ga4-types';

export const GA_MEASUREMENT_ID = process.env.GA_ID;

export const pageview = (url: string) => {
	if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
		window.gtag('config', GA_MEASUREMENT_ID, {
			page_path: url,
		});
	}
};

export const event = ({ action, params }: GA4Event) => {
	if (typeof window !== 'undefined' && window.gtag) {
		// Ensure only valid GA4 event parameters are sent
		const allowedParams: Record<string, string | number | undefined> = {};
		const validKeys = ['event_category', 'event_label', 'value', 'page_path'];
		if (params && typeof params === 'object') {
			for (const key of validKeys) {
				if (key in params) {
					allowedParams[key] = params[key];
				}
			}
		}
		window.gtag('event', action as string, allowedParams);
	}
};
