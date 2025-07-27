export interface GAMetrics {
	totalUsers: number;
	sessions: number;
	screenPageViews: number;
	bounceRate: number;
	averageSessionDuration: number;
	eventCount: number;
}

export interface GA4Event {
	action: string;
	params: {
		eventName: string;
		eventCount: number;
		eventValue?: number;
		[key: string]: any; // if there are other parameters
	};
}

// Types for raw data from /api/analytics
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

// Types for raw data from Google Analytics 4 API
export interface GA4DimensionHeader {
	name: string;
}

export interface GA4MetricHeader {
	name: string;
	type: string;
}

export interface GA4DimensionValue {
	value: string;
}

export interface GA4MetricValue {
	value: string;
}

export interface GA4Row {
	dimensionValues: GA4DimensionValue[];
	metricValues: GA4MetricValue[];
}

export interface GA4Metadata {
	currencyCode: string;
	timeZone: string;
}

export interface GA4ReportResponse {
	dimensionHeaders: GA4DimensionHeader[];
	metricHeaders: GA4MetricHeader[];
	rows: GA4Row[];
	rowCount: number;
	metadata: GA4Metadata;
	kind: string;
}

// Processed data for components
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

// Type for processed data from GA4
export interface ProcessedAnalyticsData {
	totalUsers: number;
	totalPageViews: number;
	totalScrolls: number;
	totalUserEngagement: number;
	totalProjectViews: number;
	totalContacts: number;
	totalCvDownloads: number;
	averageSessionDuration: number;
	engagementRate: number;
	topPages: Array<{ pagePath: string; views: number }>;
	topCountries: Array<{ country: string; users: number }>;
	deviceBreakdown: Array<{ device: string; users: number }>;
}

type Limit = string | null | undefined;

export type GA4Params = {
	startDate: string;
	endDate: string;
	metrics?: string[];
	dimensions?: string[];
	limit?: Limit;
};

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

type DateRanges = {
	startDate: string;
	endDate: string;
};

type Metric = {
	name: string;
};

type Dimension = {
	name: string;
};

export type RequestBody = {
	dateRanges: DateRanges[];
	metrics: Metric[];
	dimensions: Dimension[];
	limit?: Limit;
};
