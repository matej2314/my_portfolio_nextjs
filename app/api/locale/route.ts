import { NextResponse } from 'next/server';
import { z } from 'zod';
import { APP_CONFIG } from '@/config/app.config';

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

		response.cookies.set(APP_CONFIG.auth.localeCookie.name, locale, {
			path: APP_CONFIG.auth.localeCookie.path,
			maxAge: APP_CONFIG.auth.localeCookie.maxAge,
			httpOnly: APP_CONFIG.auth.localeCookie.httpOnly,
			sameSite: APP_CONFIG.auth.localeCookie.sameSite as 'lax' | 'strict' | 'none',
			secure: APP_CONFIG.auth.localeCookie.secure,
		});

		return response;
	} catch (error: unknown) {
		if (error instanceof Error) {
			return NextResponse.json({ success: false, error: error }, { status: 500 });
		}

		return NextResponse.json({ success: false, error: 'Unexpected error' }, { status: 500 });
	}
}
