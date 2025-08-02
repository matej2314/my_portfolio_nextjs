'use server';

import { cookies } from 'next/headers';
import { Locale } from '@/i18n/config';
import { APP_CONFIG } from '@/config/app.config';

export async function setLocale(locale: Locale) {
	(await cookies()).set({
		name: APP_CONFIG.auth.localeCookie.name,
		value: locale,
		path: APP_CONFIG.auth.localeCookie.path,
		maxAge: APP_CONFIG.auth.localeCookie.maxAge,
		httpOnly: APP_CONFIG.auth.localeCookie.httpOnly,
		sameSite: APP_CONFIG.auth.localeCookie.sameSite as 'lax' | 'strict' | 'none',
		secure: APP_CONFIG.auth.localeCookie.secure,
	});
}
