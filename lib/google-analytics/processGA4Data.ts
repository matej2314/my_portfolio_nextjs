import { type GA4ReportResponse, type ProcessedAnalyticsData } from '@/types/ga4-types';

export function processGA4Data(rawData: GA4ReportResponse): ProcessedAnalyticsData {
	const { rows, dimensionHeaders, metricHeaders } = rawData;

	// Mapping indexes of columns
	const eventNameIndex = dimensionHeaders.findIndex(h => h.name === 'eventName');
	const pagePathIndex = dimensionHeaders.findIndex(h => h.name === 'pagePath');
	const countryIndex = dimensionHeaders.findIndex(h => h.name === 'country');
	const deviceCategoryIndex = dimensionHeaders.findIndex(h => h.name === 'deviceCategory');
	const fileExtensionIndex = dimensionHeaders.findIndex(h => h.name === 'fileExtension');
	const categoryIndex = dimensionHeaders.findIndex(h => h.name === 'category');

	const eventCountIndex = metricHeaders.findIndex(h => h.name === 'eventCount');
	const totalUsersIndex = metricHeaders.findIndex(h => h.name === 'totalUsers');
	const averageSessionDurationIndex = metricHeaders.findIndex(h => h.name === 'averageSessionDuration');
	const engagementRateIndex = metricHeaders.findIndex(h => h.name === 'engagementRate');

	// Aggregation of data
	let totalUsers = 0;
	let totalPageViews = 0;
	let totalScrolls = 0;
	let totalUserEngagement = 0;
	let totalProjectViews = 0;
	let totalContacts = 0;
	let totalCvDownloads = 0;
	let totalSessionDuration = 0;
	let totalEngagementRate = 0;
	let sessionCount = 0;

	const pageViews: { [key: string]: number } = {};
	const countries: { [key: string]: number } = {};
	const devices: { [key: string]: number } = {};

	rows.forEach(row => {
		const eventName = row.dimensionValues[eventNameIndex]?.value || '';
		const pagePath = row.dimensionValues[pagePathIndex]?.value || '';
		const country = row.dimensionValues[countryIndex]?.value || '';
		const deviceCategory = row.dimensionValues[deviceCategoryIndex]?.value || '';
		const fileExtension = row.dimensionValues[fileExtensionIndex]?.value || '';

		const eventCount = parseInt(row.metricValues[eventCountIndex]?.value || '0');
		const users = parseInt(row.metricValues[totalUsersIndex]?.value || '0');
		const sessionDuration = parseFloat(row.metricValues[averageSessionDurationIndex]?.value || '0');
		const engagementRate = parseFloat(row.metricValues[engagementRateIndex]?.value || '0');

		// Aggregation of metrics
		totalUsers = Math.max(totalUsers, users); // We take the maximum value of users

		// Aggregation of events by type
		switch (eventName) {
			case 'page_view':
				totalPageViews += eventCount;
				pageViews[pagePath] = (pageViews[pagePath] || 0) + eventCount;
				break;
			case 'scroll':
				totalScrolls += eventCount;
				break;
			case 'user_engagement':
				totalUserEngagement += eventCount;
				break;
			case 'view_project':
				totalProjectViews += eventCount;
				break;
			case 'contact':
				if (categoryIndex) {
					const category = row.dimensionValues[categoryIndex]?.value || '';
					if (category === 'contact') {
						totalContacts += eventCount;
					}
				}
				break;
			case 'file_download':
				if (fileExtension === 'pdf') {
					totalCvDownloads += eventCount;
				}
				break;
		}

		// Aggregation of session time and engagement rate
		if (sessionDuration > 0) {
			totalSessionDuration += sessionDuration;
			sessionCount++;
		}
		if (engagementRate > 0) {
			totalEngagementRate += engagementRate;
		}

		// Aggregation of countries and devices
		if (country) {
			countries[country] = (countries[country] || 0) + users;
		}
		if (deviceCategory) {
			devices[deviceCategory] = (devices[deviceCategory] || 0) + users;
		}
	});

	// Processing top pages, countries and devices
	const topPages = Object.entries(pageViews)
		.map(([pagePath, views]) => ({ pagePath, views }))
		.sort((a, b) => b.views - a.views)
		.slice(0, 5);

	const topCountries = Object.entries(countries)
		.map(([country, users]) => ({ country, users }))
		.sort((a, b) => b.users - a.users)
		.slice(0, 5);

	const deviceBreakdown = Object.entries(devices)
		.map(([device, users]) => ({ device, users }))
		.sort((a, b) => b.users - a.users);

	const result = {
		totalUsers,
		totalPageViews,
		totalScrolls,
		totalUserEngagement,
		totalProjectViews,
		totalContacts,
		totalCvDownloads,
		averageSessionDuration: sessionCount > 0 ? totalSessionDuration / sessionCount : 0,
		engagementRate: sessionCount > 0 ? totalEngagementRate / sessionCount : 0,
		topPages,
		topCountries,
		deviceBreakdown,
	};

	return result;
}
