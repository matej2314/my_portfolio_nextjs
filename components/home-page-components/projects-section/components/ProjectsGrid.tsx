'use client';

import { motion, easeInOut, AnimatePresence, useInView } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useMemo, useRef } from 'react';

import { ProjectsTrack } from './ProjectsTrack';
import { useHomeProjectTransition } from '@/context/HomeProjectTransitionContext';
import { useCoarsePointer } from '@/hooks/useCoarsePointer';
import { readRect } from '@/lib/utils/utils';
import { buildSlides } from '@/lib/utils/buildSlides';
import { type ProjectsGalleryProps } from '@/types/ProjectsGalleryTypes';

export default function ProjectsGrid({ projects, images }: ProjectsGalleryProps) {
	const t = useTranslations('homePage.projectsSection');
	const locale = useLocale();
	const nativeScroll = useCoarsePointer();
	const { beginOpen, overlayCardProjectId } = useHomeProjectTransition();

	const slides = useMemo(() => buildSlides(projects, images, locale), [projects, images, locale]);
	const trackRef = useRef<HTMLDivElement>(null);
	const listInView = useInView(trackRef, { once: true, amount: 0.2 });

	const onBeforeNavigate = useCallback(
		(projectId: string, root: HTMLElement | null) => {
			if (root) beginOpen(projectId, readRect(root));
		},
		[beginOpen],
	);

	return (
		<motion.section initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: easeInOut }} viewport={{ amount: 0.25, once: true }} className='flex w-full min-w-0 flex-col gap-10'>
			<header className='flex w-full max-w-6xl flex-col gap-2'>
				<p className='text-[13px] font-semibold tracking-wide text-slate-500'>{t('sectionIndex')}</p>
				<h2 className='text-[2rem] font-light leading-tight text-slate-50 sm:text-[2.375rem]'>{t('title')}</h2>
				<div className='h-[3px] w-12 rounded-full bg-[#facc15]' aria-hidden />
				<p className='max-w-3xl text-base font-normal leading-relaxed text-slate-400'>{t('description')}</p>
			</header>

			<AnimatePresence>
				<div
					ref={trackRef}
					className='relative min-w-0 w-[calc(100%+1.5rem)] max-w-none self-stretch -mr-6 sm:w-[calc(100%+2.5rem)] sm:-mr-10 md:w-[calc(100%+3rem)] md:-mr-12'
				>
					<ProjectsTrack
						slides={slides}
						openLabel={t('openDetails')}
						overlayCardProjectId={overlayCardProjectId}
						onBeforeNavigate={onBeforeNavigate}
						ariaLabel={t('title')}
						nativeScroll={nativeScroll}
						listInView={listInView}
					/>
				</div>
			</AnimatePresence>
		</motion.section>
	);
}
