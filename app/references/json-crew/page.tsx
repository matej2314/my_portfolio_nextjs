import Link from 'next/link';
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
		<main id='main-content' tabIndex={-1} className='relative min-h-[100dvh] bg-surface-0 px-5 py-16 text-ink-1 outline-none xl:px-12 xl:py-24'>
			<div
				className='pointer-events-none absolute inset-0 bg-[radial-gradient(42rem_28rem_at_12%_-10%,var(--color-brand-tint),transparent_60%)]'
				aria-hidden
			/>

			<article className='relative mx-auto flex w-full max-w-[720px] flex-col gap-10'>
				<nav>
					<Link
						href='/home'
						className='font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ink-3 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60'
					>
						← {t('backToHome')}
					</Link>
				</nav>

				<header className='flex flex-col gap-4 border-b border-line pb-10'>
					<p className='font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-brand'>{t('documentMeta')}</p>
					<blockquote className='font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.15] tracking-tight text-ink-0'>
						{t('jsonCrew')}
					</blockquote>
					<p className='font-mono text-xs tracking-wide text-ink-3'>{t('issuer')}</p>
				</header>

				<p className='max-w-[58ch] text-pretty text-base leading-relaxed text-ink-1'>{t('lead')}</p>

				<div className='flex flex-col gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between'>
					<ReferencesDownloadButton btnText={t('download')} pendingText={t('downloading')} />
					<Link
						href='/home#experienceSection'
						className='text-sm text-ink-2 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60'
					>
						{t('backToHome')}
					</Link>
				</div>
			</article>
		</main>
	);
}
