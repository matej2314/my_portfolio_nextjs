'use server';

import { cookies } from 'next/headers';
import { defaultLocale } from '@/i18n/config';

const COOKIE_NAME = 'NEXT_LANG';

export async function getUserLocale() {
	return (await cookies()).get(COOKIE_NAME)?.value || defaultLocale;
}
