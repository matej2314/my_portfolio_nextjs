import { google } from 'googleapis';
import path from 'path';
import { readFileSync } from 'fs';
import { setCache, getCache } from '@/lib/redis/redis';

const SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];
const credentialsPath = path.join(process.cwd(), '/credentials/myPortfolio-f6f80beac2cd.json');
const credentials = JSON.parse(readFileSync(credentialsPath, 'utf8'));

const jwtClient = new google.auth.JWT(credentials.client_email, undefined, credentials.private_key, SCOPES);

const analytics = google.analyticsdata('v1beta');

type GA4Params = {
	startDate: string;
	endDate: string;
	metrics?: string[];
	dimensions?: string[];
	limit?: number;
};

export async function getGA4REport({ startDate, endDate, metrics = ['eventCount', 'totalUsers', 'averageSessionDuration', 'engagementRate'], dimensions = ['eventName', 'pagePath', 'contentId', 'deviceCategory', 'operatingSystem', 'pageReferrer', 'date', 'country'], limit }: GA4Params) {
	await jwtClient.authorize();

	const requestBody: any = {
		dateRanges: [{ startDate, endDate }],
		metrics: metrics.map(metric => ({ name: metric })),
		dimensions: dimensions.map(dimension => ({ name: dimension })),
	};

	if (limit) {
		requestBody.limit = limit;
	}

	const response = await analytics.properties.runReport({
		property: `properties/${process.env.GA4_PROPERTY_ID}`,
		auth: jwtClient,
		requestBody,
	});

	return response.data;
}
