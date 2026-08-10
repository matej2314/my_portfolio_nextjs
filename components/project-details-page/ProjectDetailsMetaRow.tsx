'use client';

import { useTranslations } from 'next-intl';

type Props = {
	stackSummary: string;
	demoUrl: string | null;
	repoUrl: string | null;
};

export default function ProjectDetailsMetaRow({ stackSummary, demoUrl, repoUrl }: Props) {
	const t = useTranslations('projectDetailsPage');

	return (
		<div className='flex w-full min-w-0 flex-col items-start gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between'>
			<p className='font-mono text-xs tracking-wide text-ink-3'>{stackSummary}</p>
			<div className='flex flex-wrap items-center gap-x-3 text-sm font-medium'>
				{demoUrl ? (
					<a
						href={demoUrl}
						target='_blank'
						rel='noopener noreferrer'
						className='text-brand transition-colors hover:text-brand-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60'
					>
						{t('metaDemo')}
					</a>
				) : (
					<span className='text-ink-3'>{t('metaDemo')}</span>
				)}
				{demoUrl && repoUrl ? <span className='text-ink-3' aria-hidden>·</span> : null}
				{repoUrl ? (
					<a
						href={repoUrl}
						target='_blank'
						rel='noopener noreferrer'
						className='text-brand transition-colors hover:text-brand-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60'
					>
						{t('metaRepo')}
					</a>
				) : (
					<span className='text-ink-3'>{t('metaRepo')}</span>
				)}
			</div>
		</div>
	);
}
