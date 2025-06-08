'use server';

import { cookies } from 'next/headers';
import { Locale } from '@/i18n/config';

const COOKIE_NAME = 'NEXT_LANG';

export async function setLocale(locale: Locale) {
	(await cookies()).set({
		name: COOKIE_NAME,
		value: locale,
		path: '/',
		maxAge: 60 * 60 * 24 * 365,
		httpOnly: false,
	});
}
