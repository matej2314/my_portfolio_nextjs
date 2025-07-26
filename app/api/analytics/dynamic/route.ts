import { NextRequest, NextResponse } from 'next/server';
import { getGA4REport } from '@/lib/google-analytics/ga4';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { startDate, endDate, metrics, dimensions, limit } = body;

		if (!startDate || !endDate) {
			return NextResponse.json({ error: 'Start date and end date are required' }, { status: 400 });
		}

		const data = await getGA4REport({ startDate, endDate, metrics, dimensions, limit });

		return NextResponse.json(data);
	} catch (error) {
		console.error('GA4 Dynamic API error:', error);
		return NextResponse.json({ error: 'Failed to fetch dynamic analytics data' }, { status: 500 });
	}
}
