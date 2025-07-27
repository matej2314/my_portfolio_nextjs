import { NextRequest, NextResponse } from 'next/server';
import { getGA4Report } from '@/lib/google-analytics/ga4';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { startDate, endDate, metrics, dimensions, limit } = body;

		if (!startDate || !endDate) {
			return NextResponse.json({ error: 'startDate and endDate are required' }, { status: 400 });
		}

		const data = await getGA4Report({
			startDate,
			endDate,
			metrics,
			dimensions,
			limit,
		});

		return NextResponse.json(data);
	} catch (error) {
		console.error('GA4 Dynamic API error:', error);
		return NextResponse.json({ error: 'Failed to fetch analytics data' }, { status: 500 });
	}
}
