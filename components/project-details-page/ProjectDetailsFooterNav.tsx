'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

type Neighbor = { id: string; name: string } | null;

export default function ProjectDetailsFooterNav({
	prev,
	next,
}: {
	prev: Neighbor;
	next: Neighbor;
}) {
	const t = useTranslations('homePage.projectsSection');
	const tDetails = useTranslations('projectDetailsPage');

	return (
		<nav
			aria-label={tDetails('projectNavLabel')}
			className='mt-6 flex w-full flex-col gap-6 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between'
		>
			<Link
				href='/home#projectsSection'
				className='text-sm font-medium text-ink-2 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60'
			>
				{t('backToProjects')}
			</Link>

			<div className='flex flex-wrap items-center gap-4 sm:justify-end'>
				{prev ? (
					<Link
						href={`/home/project/${prev.id}`}
						className='group flex max-w-[14rem] flex-col gap-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60'
					>
						<span className='font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-3'>
							{t('prevProject')}
						</span>
						<span className='truncate font-display text-sm text-ink-0 transition-colors group-hover:text-brand'>
							← {prev.name}
						</span>
					</Link>
				) : null}
				{next ? (
					<Link
						href={`/home/project/${next.id}`}
						className='group flex max-w-[14rem] flex-col gap-1 text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60'
					>
						<span className='font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-3'>
							{t('nextProject')}
						</span>
						<span className='truncate font-display text-sm text-ink-0 transition-colors group-hover:text-brand'>
							{next.name} →
						</span>
					</Link>
				) : null}
			</div>
		</nav>
	);
}
