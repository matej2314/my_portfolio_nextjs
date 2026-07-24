import { NextRequest, NextResponse } from 'next/server';
import { APP_CONFIG } from '@/config/app.config';
import { getMetricsContentType, getMetricsText } from '@/lib/metrics/registry';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const PLAIN = { 'Content-Type': 'text/plain;charset=utf-8' } as const;

function isAuthorized(request: NextRequest): boolean {
	const expected = APP_CONFIG.metrics.protectWithToken;
	if (!expected) return true;

	const header = request.headers.get('Authorization');
	if (!header?.startsWith('Bearer ')) return false;
	const token = header.slice('Bearer '.length).trim();
	return token === expected;
}

export async function GET(request: NextRequest) {
	if (!APP_CONFIG.metrics.enabled) {
		return new NextResponse('Not found', { status: 404, headers: PLAIN });
	}
	if (!isAuthorized(request)) {
		return new NextResponse('Unauthorized', { status: 401, headers: PLAIN });
	}

	const body = await getMetricsText();
	return new NextResponse(body, {
		status: 200,
		headers: {
			'Content-Type': getMetricsContentType(),
		},
	});
}
