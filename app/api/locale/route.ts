import { NextResponse } from 'next/server';
import { z } from 'zod';

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

		const response = NextResponse.json({ success: true });

		response.cookies.set('NEXT_LANG', locale, {
			path: '/',
			maxAge: 60 * 60 * 24 * 365,
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
		});

		return response;
	} catch (error: unknown) {
		if (error instanceof Error) {
			return NextResponse.json({ success: false, error: error }, { status: 500 });
		}

		return NextResponse.json({ success: false, error: 'Unexpected error' }, { status: 500 });
	}
}
