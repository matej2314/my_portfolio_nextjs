export interface GAMetrics {
	totalUsers: number;
	sessions: number;
	screenPageViews: number;
	bounceRate: number;
	averageSessionDuration: number;
	eventCount: number;
}

export interface GA4Event {
	eventName: string;
	eventCount: number;
	eventValue?: number;
}

// Typy dla danych z endpointu /api/analytics
export interface AnalyticsData {
	eventName: string;
	date?: string;
	deviceCategory?: string;
	operatingSystem?: string;
	country?: string;
	pagePath?: string;
	eventCount?: string;
	totalUsers?: string;
	category?: string;
	label?: string;
	engagementRate?: string;
}

export interface AnalyticsSummary {
	totalPageViews: number;
	totalDownloads: number;
	totalContacts: number;
	totalProjectViews: number;
	totalUsers: number;
	engagementRate: number;
	topPages: Array<{ pagePath: string; views: number }>;
	topCountries: Array<{ country: string; users: number }>;
	deviceBreakdown: Array<{ device: string; users: number }>;
}
