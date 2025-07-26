import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];

const email = process.env.GOOGLE_CLIENT_MAIL;
const key = process.env.GOOGLE_PRIVATE_KEY;

const jwtClient = new google.auth.JWT(email, undefined, key, SCOPES);

const analytics = google.analyticsdata('v1beta');

type GA4Params = {
	startDate: string;
	endDate: string;
	metrics?: string[];
	dimensions?: string[];
	limit?: number;
};

interface RequestBody {
	dateRanges: {
		startDate: string;
		endDate: string;
	}[];
	metrics: {
		name: string;
	}[];
	dimensions: {
		name: string;
	}[];
	limit?: string;
}

export async function getGA4REport({ startDate, endDate, metrics = ['eventCount', 'totalUsers', 'averageSessionDuration', 'engagementRate'], dimensions = ['eventName', 'pagePath', 'contentId', 'deviceCategory', 'operatingSystem', 'pageReferrer', 'date', 'country'], limit }: GA4Params) {
	await jwtClient.authorize();

	const requestBody: RequestBody = {
		dateRanges: [{ startDate, endDate }],
		metrics: metrics.map(metric => ({ name: metric })),
		dimensions: dimensions.map(dimension => ({ name: dimension })),
	};

	if (limit) {
		requestBody.limit = limit.toString();
	}

	const response = await analytics.properties.runReport({
		property: `properties/${process.env.GA4_PROPERTY_ID}`,
		requestBody,
	});

	return response.data;
}
