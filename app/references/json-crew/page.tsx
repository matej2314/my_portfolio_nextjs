import { generatePageMetadata } from '@/lib/generatePageMetadata';
import { getTranslations } from 'next-intl/server';
import { ReferencesDownloadButton } from './download-button';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
	return generatePageMetadata('page', null, {
		title: 'Referencje JSON Crew | msliwowski.net',
		description: 'Pobierz referencje w formacie PDF.',
	});
}

export default async function JsonCrewReferencesPage() {
	const t = await getTranslations('references');

	return (
		<main className='flex min-h-screen items-center justify-center bg-[#000805] px-4 flex-col gap-4'>
			<h1 className='text-2xl md:text-4xl font-bold text-white'>{t('jsonCrew')}</h1>
			<ReferencesDownloadButton btnText={t('download')} />
			<a href='/home' className='text-yellow-300 hover:text-yellow-400 focus:text-yellow-400 focus:outline-none'>{t('backToHome')}</a>
		</main>
	);
}
