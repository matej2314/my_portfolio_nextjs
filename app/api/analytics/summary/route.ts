import { NextResponse } from 'next/server';
import { getGA4REport } from '@/lib/google-analytics/ga4';

export async function GET() {
	try {
		const data = await getGA4REport({
			startDate: '7daysAgo',
			endDate: 'today',
			limit: 20,
		});

		return NextResponse.json(data);
	} catch (error) {
		console.error(`GA4 summary API error: ${error}`);
		return NextResponse.json({ error: 'Failed to fetch summary analytics data' }, { status: 500 });
	}
}
