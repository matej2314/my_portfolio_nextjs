import { NextResponse } from 'next/server';
import { getGA4Report } from '@/lib/google-analytics/ga4';
import { GA4ReportResponse } from '@/types/ga4-types';
import { processGA4Data } from '@/lib/google-analytics/processGA4Data';
import logger from '@/lib/winston.config';

export async function GET() {
	try {
		const rawData = (await getGA4Report({
			startDate: '30daysAgo',
			endDate: 'today',
			limit: '50',
		})) as GA4ReportResponse;

		const processedData = processGA4Data(rawData);

		return NextResponse.json(processedData);
	} catch (error) {
		logger.error('GA4 Summary API error:', error);
		return NextResponse.json({ error: 'Failed to fetch summary analytics data' }, { status: 500 });
	}
}
