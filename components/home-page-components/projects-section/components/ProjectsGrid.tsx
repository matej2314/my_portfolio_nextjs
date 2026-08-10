'use client';

import { motion, AnimatePresence, useInView } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useRef } from 'react';

import { ProjectsTrack } from './ProjectsTrack';
import { useProjectEnterTransition } from '@/context/ProjectEnterTransitionContext';
import { useCoarsePointer } from '@/hooks/useCoarsePointer';
import { buildSlides } from '@/lib/utils/buildSlides';
import { type ProjectsGalleryProps } from '@/types/ProjectsGalleryTypes';

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ProjectsGrid({ projects, images }: ProjectsGalleryProps) {
	const t = useTranslations('homePage.projectsSection');
	const locale = useLocale();
	const nativeScroll = useCoarsePointer();
	const { flightProjectId } = useProjectEnterTransition();

	const slides = useMemo(() => buildSlides(projects, images, locale), [projects, images, locale]);
	const trackRef = useRef<HTMLDivElement>(null);
	const listInView = useInView(trackRef, { once: true, amount: 0.2 });

	return (
		<motion.div
			initial={{ opacity: 0, y: 16 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.55, ease: EASE_EXPO }}
			viewport={{ amount: 0.2, once: true }}
			className='flex w-full min-w-0 flex-col'
		>
			<AnimatePresence>
				<div
					ref={trackRef}
					className='relative min-w-0 max-w-none self-stretch max-xl:w-[calc(100%+1rem)] max-xl:-mr-4 xl:w-[calc(100%+3rem)] xl:-mr-12'
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
		</motion.div>
	);
}
