import { google } from 'googleapis';

import { defaultData } from '@/lib/defaultData';

import { type GA4Params, type RequestBody } from '@/types/ga4-types';

const SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];

const email = process.env.GOOGLE_CLIENT_MAIL;
const key = process.env.GOOGLE_PRIVATE_KEY;
const defaultMetrics = defaultData.defaultGA4Metrics;
const defaultDimensions = defaultData.defaultGA4Dimensions;

const jwtClient = new google.auth.JWT(email, undefined, key, SCOPES);

const analytics = google.analyticsdata('v1beta');

export async function getGA4Report({ startDate, endDate, metrics = defaultMetrics, dimensions = defaultDimensions, limit }: GA4Params) {
	await jwtClient.authorize();

	const requestBody: RequestBody = {
		dateRanges: [{ startDate, endDate }],
		metrics: metrics.map(name => ({ name })),
		dimensions: dimensions.map(name => ({ name })),
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
