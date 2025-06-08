import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
	const cookieStore = cookies();
	const localeCookie = (await cookieStore).get('NEXT_LANG')?.value;
	const locale = localeCookie === 'pl' || localeCookie === 'en' ? localeCookie : 'en';

	return {
		locale,
		messages: (await import(`../messages/${locale}.json`)).default,
	};
});
