import { getTranslations } from 'next-intl/server';

import { type Project } from '@/types/actionsTypes/actionsTypes';

export default async function DisplayConclusion({
	selectedProject,
	locale,
	variant = 'default',
}: {
	selectedProject: Project;
	locale: string;
	variant?: 'default' | 'pen';
}) {
	const t = await getTranslations('projectDetailsPage');
	const text = locale === 'en' ? selectedProject.conclusion : selectedProject.conclusion_pl;

	if (!text) return null;

	if (variant === 'pen') {
		return (
			<section className='rounded-[var(--radius-shell)] border border-line bg-surface-1/50 p-1.5 shadow-ambient'>
				<div className='rounded-[var(--radius-core)] border border-line-soft bg-surface-2 p-6 shadow-inner-top xl:p-8'>
					<h2 className='font-mono text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-brand'>
						{t('conclusion')}
					</h2>
					<p className='mt-5 max-w-[70ch] text-pretty text-[15px] leading-relaxed text-ink-1 xl:text-base xl:leading-[1.7]'>
						{text}
					</p>
				</div>
			</section>
		);
	}

	return (
		<div className='flex h-fit w-full flex-col items-center justify-center gap-4'>
			<h2 className='font-display text-3xl text-brand'>{t('conclusion')}</h2>
			<p className='max-w-[70ch] text-pretty font-display tracking-wide text-ink-1'>{text}</p>
		</div>
	);
}
