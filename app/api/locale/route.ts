import { NextResponse } from 'next/server';
import { z } from 'zod';
import { setUserLocale } from '@/lib/locale';

const LocaleSchema = z.object({
	locale: z.enum(['en', 'pl']),
});

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const parsedBody = LocaleSchema.safeParse(body);

		if (!parsedBody.success) {
			return NextResponse.json({ success: false, error: 'Invalid input', issues: parsedBody.error?.flatten() }, { status: 400 });
		}

		const { locale } = parsedBody.data;
		await setUserLocale(locale);

		return NextResponse.json({ success: true });
	} catch (error: unknown) {
		if (error instanceof Error) {
			return NextResponse.json({ success: false, error: error }, { status: 500 });
		}

		return NextResponse.json({ success: false, error: 'Unexpected error' }, { status: 500 });
	}
}
