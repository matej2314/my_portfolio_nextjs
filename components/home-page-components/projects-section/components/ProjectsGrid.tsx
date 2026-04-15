'use client';

import { motion, easeInOut, AnimatePresence, useInView } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useRef } from 'react';

import { ProjectsTrack } from './ProjectsTrack';
import { useProjectEnterTransition } from '@/context/ProjectEnterTransitionContext';
import { useCoarsePointer } from '@/hooks/useCoarsePointer';
import { buildSlides } from '@/lib/utils/buildSlides';
import { type ProjectsGalleryProps } from '@/types/ProjectsGalleryTypes';

export default function ProjectsGrid({ projects, images }: ProjectsGalleryProps) {
	const t = useTranslations('homePage.projectsSection');
	const locale = useLocale();
	const nativeScroll = useCoarsePointer();
	const { flightProjectId } = useProjectEnterTransition();

	const slides = useMemo(() => buildSlides(projects, images, locale), [projects, images, locale]);
	const trackRef = useRef<HTMLDivElement>(null);
	const listInView = useInView(trackRef, { once: true, amount: 0.2 });

	return (
		<motion.section
			initial={{ opacity: 0, scale: 0.98 }}
			whileInView={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5, ease: easeInOut }}
			viewport={{ amount: 0.25, once: true }}
			className='flex w-full min-w-0 flex-col gap-10 max-xl:gap-6 xl:gap-10'
		>
			<header className='flex w-full max-w-6xl flex-col gap-2 max-xl:gap-1.5 xl:gap-2'>
				<p className='font-semibold tracking-wide text-slate-500 max-xl:text-xs xl:text-[13px]'>{t('sectionIndex')}</p>
				<h2 className='font-light leading-tight text-slate-50 max-xl:text-[1.625rem] max-xl:leading-snug xl:text-[2.375rem]'>{t('title')}</h2>
				<div className='h-[3px] rounded-full bg-[#facc15] max-xl:w-10 xl:w-12' aria-hidden />
				<p className='max-w-3xl font-normal text-slate-400 max-xl:text-[15px] max-xl:leading-relaxed xl:text-base xl:leading-relaxed'>{t('description')}</p>
			</header>

			<AnimatePresence>
				<div
					ref={trackRef}
					className='relative min-w-0 max-w-none self-stretch max-xl:w-[calc(100%+1.5rem)] max-xl:-mr-6 xl:w-[calc(100%+3rem)] xl:-mr-12'
				>
					<ProjectsTrack
						slides={slides}
						openLabel={t('openDetails')}
						flightProjectId={flightProjectId}
						ariaLabel={t('title')}
						nativeScroll={nativeScroll}
						listInView={listInView}
					/>
				</div>
			</AnimatePresence>
		</motion.section>
	);
}
