'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';

import NavLink from '@/components/links/NavLink';
import { cn } from '@/lib/utils/utils';

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

export default function HeroCtas({ cvHref, cvFileName }: { cvHref: string; cvFileName: string }) {
	const t = useTranslations('homePage');
	const reduced = useReducedMotion();

	return (
		<motion.div
			className='mt-6 flex flex-wrap items-center gap-4 xl:mt-7'
			initial={reduced ? false : { opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={reduced ? { duration: 0 } : { delay: 0.55, duration: 0.7, ease: EASE_EXPO }}
		>
			<NavLink
				variant='home'
				pathName='#projectsSection'
				title={t('aboutSection.viewProjects')}
				aria-label={t('aboutSection.viewProjects')}
				linkClass={cn(
					'group inline-flex items-center gap-2 rounded-full bg-brand py-1.5 pl-6 pr-1.5 text-sm font-medium text-surface-0',
					'transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
					'hover:bg-brand-bright active:scale-[0.98]',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0',
				)}
			>
				{t('aboutSection.viewProjects')}
				<span className='flex size-9 items-center justify-center rounded-full bg-surface-0/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105'>
					<Icon icon='ph:arrow-up-right-light' width={16} height={16} aria-hidden />
				</span>
			</NavLink>

			<Link
				href={cvHref}
				download={cvFileName}
				className={cn(
					'relative text-sm font-medium text-ink-1',
					'bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat',
					'transition-[color,background-size] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
					'hover:bg-[length:100%_1px] hover:text-brand',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60',
				)}
			>
				{t('aboutSection.downloadCv')}
			</Link>
		</motion.div>
	);
}
