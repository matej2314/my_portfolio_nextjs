import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { observeCvDownload, observeReferenceDownload, assistantUiOpensTotal, type DeviceClass } from '@/lib/metrics/productMetrics';
import { deviceClassFromUserAgent } from '@/lib/metrics/deviceClass';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EventSchema = z.discriminatedUnion('type', [
	z.object({
		type: z.literal('cv_download'),
		locale: z.enum(['pl', 'en']),
	}),
	z.object({
		type: z.literal('reference_download'),
		reference: z.literal('json_crew'),
	}),
	z.object({
		type: z.literal('assistant_ui_open'),
	}),
]);

const PLAIN = { 'Content-Type': 'text/plain; charset=utf-8' } as const;

export async function POST(request: NextRequest) {
	let json: unknown;
	try {
		json = await request.json();
	} catch {
		return new NextResponse('Bad Request', { status: 400, headers: PLAIN });
	}

	const parsed = EventSchema.safeParse(json);
	if (!parsed.success) {
		return new NextResponse('Bad Request', { status: 400, headers: PLAIN });
	}

	const device: DeviceClass = deviceClassFromUserAgent(request.headers.get('user-agent'));

	switch (parsed.data.type) {
		case 'cv_download':
			observeCvDownload(parsed.data.locale, device);
			break;
		case 'reference_download':
			observeReferenceDownload(parsed.data.reference, device);
			break;
		case 'assistant_ui_open':
			assistantUiOpensTotal.inc({ device });
			break;
	}

	return new NextResponse(null, { status: 204 });
}
