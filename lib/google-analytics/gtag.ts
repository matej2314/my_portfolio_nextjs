export const GA_MEASUREMENT_ID = process.env.GA_ID;

type GAAction = 'download_cv' | 'contact' | 'view_project';

export type GAEvent = {
	action: GAAction;
	params?: {
		category?: string;
		label?: string;
		value?: number;
		[key: string]: unknown;
	};
};

export const pageview = (url: string) => {
	if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
		window.gtag('config', GA_MEASUREMENT_ID, {
			page_path: url,
		});
	}
};

export const event = ({ action, params }: GAEvent) => {
	if (typeof window !== 'undefined' && window.gtag) {
		window.gtag('event', action, {
			...params,
		});
	}
};
