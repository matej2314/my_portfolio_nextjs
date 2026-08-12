'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

import NavLink from '@/components/links/NavLink';
import { cn } from '@/lib/utils/utils';

interface DescriptionContentProps {
	description: string;
	cvHref: string;
	cvFileName: string;
}

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, amount: 0.25 } as const;

export default function DescriptionContent({ description, cvHref, cvFileName }: DescriptionContentProps) {
	const t = useTranslations('homePage');
	const rootRef = useRef<HTMLDivElement>(null);
	const inView = useInView(rootRef, VIEWPORT);
	const reduced = useReducedMotion();

	return (
		<div ref={rootRef} className='flex flex-col gap-8'>
			<motion.p
				className='max-w-[62ch] text-pretty text-[15px] leading-relaxed text-ink-1 xl:text-base xl:leading-[1.7]'
				initial={reduced ? false : { opacity: 0, y: 14 }}
				animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
				transition={{ duration: 0.5, ease: EASE_EXPO }}
			>
				{description}
			</motion.p>

			<motion.div
				className='flex flex-wrap items-center gap-4'
				data-name='aboutCta'
				initial={reduced ? false : { opacity: 0, y: 12 }}
				animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
				transition={{ duration: 0.5, ease: EASE_EXPO, delay: 0.12 }}
			>
				<Link
					href={cvHref}
					download={cvFileName}
					className={cn(
						'group inline-flex items-center gap-2 rounded-full bg-brand py-1.5 pl-6 pr-1.5 text-sm font-medium text-surface-0',
						'transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
						'hover:bg-brand-bright active:scale-[0.98]',
						'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0',
					)}
				>
					{t('aboutSection.downloadCv')}
					<span className='flex size-9 items-center justify-center rounded-full bg-surface-0/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0.5 group-hover:scale-105'>
						<Icon icon='ph:arrow-down-light' width={16} height={16} aria-hidden />
					</span>
				</Link>

				<NavLink
					variant='home'
					pathName='#projectsSection'
					title={t('aboutSection.viewProjects')}
					aria-label={t('aboutSection.viewProjects')}
					linkClass={cn(
						'relative inline-flex min-h-11 items-center text-sm font-medium text-ink-1',
						'bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat',
						'transition-[color,background-size] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
						'hover:bg-[length:100%_1px] hover:text-brand',
						'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60',
					)}
				>
					{t('aboutSection.viewProjects')}
				</NavLink>
			</motion.div>
		</div>
	);
}
