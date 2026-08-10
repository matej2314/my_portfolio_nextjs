import { getTranslations } from 'next-intl/server';
import { type ReactNode } from 'react';

import { type Project } from '@/types/actionsTypes/actionsTypes';

function ProseBlock({ text }: { text: string }) {
	const blocks = text
		.split(/\n{2,}/)
		.map(b => b.trim())
		.filter(Boolean);

	return (
		<div className='flex max-w-[70ch] flex-col gap-4'>
			{blocks.map((block, index) => {
				const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
				const looksLikeList = lines.length > 1 && lines.every(l => /^[-•*]\s|^\d+[.)]\s/.test(l));

				if (looksLikeList) {
					return (
						<ul key={index} className='list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-ink-1 xl:text-base'>
							{lines.map((line, i) => (
								<li key={i}>{line.replace(/^[-•*]\s|^\d+[.)]\s/, '')}</li>
							))}
						</ul>
					);
				}

				if (block.startsWith('>') || (block.startsWith('"') && block.endsWith('"'))) {
					return (
						<blockquote
							key={index}
							className='border-l border-brand pl-4 font-display text-lg font-medium leading-snug text-ink-0 xl:text-xl'
						>
							{block.replace(/^>\s*/, '').replace(/^"|"$/g, '')}
						</blockquote>
					);
				}

				return (
					<p key={index} className='text-pretty text-[15px] leading-relaxed text-ink-1 xl:text-base xl:leading-[1.7]'>
						{block}
					</p>
				);
			})}
		</div>
	);
}

function BezelCard({ title, children }: { title: string; children: ReactNode }) {
	return (
		<section className='rounded-[var(--radius-shell)] border border-line bg-surface-1/50 p-1.5 shadow-ambient'>
			<div className='rounded-[var(--radius-core)] border border-line-soft bg-surface-2 p-6 shadow-inner-top xl:p-8'>
				<h2 className='font-mono text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-brand'>{title}</h2>
				<div className='mt-5'>{children}</div>
			</div>
		</section>
	);
}

export default async function DisplayGoalDescription({
	selectedProject,
	locale,
	variant = 'default',
}: {
	selectedProject: Project;
	locale: string;
	variant?: 'default' | 'pen';
}) {
	const t = await getTranslations('projectDetailsPage');

	const goal = locale === 'en' ? selectedProject.goal : selectedProject.goal_pl;
	const longText = locale === 'en' ? selectedProject.long_text : selectedProject.long_text_pl;

	if (variant === 'pen') {
		return (
			<div className='flex w-full min-w-0 flex-col gap-6'>
				{goal ? (
					<BezelCard title={t('goalLabel')}>
						<p className='max-w-[70ch] text-pretty text-[15px] leading-relaxed text-ink-1 xl:text-base xl:leading-[1.7]'>
							{goal}
						</p>
					</BezelCard>
				) : null}
				{longText ? (
					<BezelCard title={t('assumptionsLabel')}>
						<ProseBlock text={longText} />
					</BezelCard>
				) : null}
			</div>
		);
	}

	return (
		<div className='flex w-full flex-col items-center gap-4'>
			<h2 className='font-display text-3xl tracking-wide text-brand'>{t('goalLabel')}</h2>
			<p className='max-w-[70ch] text-pretty font-display tracking-wide text-ink-1'>{goal}</p>
			<h2 className='font-display text-3xl tracking-wide text-brand'>{t('descriptionLabel')}</h2>
			<p className='max-w-[70ch] text-pretty font-display text-base leading-[1.7rem] tracking-wide text-ink-1'>
				{longText}
			</p>
		</div>
	);
}
