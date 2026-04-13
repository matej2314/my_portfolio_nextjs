'use client';

import { motion, easeInOut } from 'motion/react';
import { useState } from 'react';

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { useEmblaWheelScroll } from '@/hooks/useEmblaWheelScroll';
import { ProjectCard } from './ProjectCard';
import { type ProjectSlide } from '@/types/ProjectsGalleryTypes';

const listVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.12,
			delayChildren: 0.06,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 18 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.45, ease: easeInOut },
	},
};

const STAGGER = 0.12;
const DELAY_CHILDREN = 0.06;

export const ProjectsTrack = ({
	slides,
	openLabel,
	overlayCardProjectId,
	onBeforeNavigate,
	ariaLabel,
	nativeScroll,
	listInView,
}: {
	slides: ProjectSlide[];
	openLabel: string;
	overlayCardProjectId: string | null;
	onBeforeNavigate: (projectId: string, root: HTMLElement | null) => void;
	ariaLabel: string;
	nativeScroll: boolean;
	listInView: boolean;
}) => {
	if (nativeScroll) {
		return (
			<div
				role='region'
				aria-roledescription='carousel'
				aria-label={ariaLabel}
				className='touch-pan-x overscroll-x-contain overflow-x-auto overflow-y-hidden scroll-smooth outline-none focus:outline-none focus-visible:outline-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
				style={{ WebkitOverflowScrolling: 'touch' }}
			>
				<motion.ul
					className='flex w-max min-w-full snap-x snap-mandatory pb-2 pl-0 max-xl:gap-4 max-xl:pr-4 xl:gap-5 xl:pr-8'
					initial='hidden'
					animate={listInView ? 'visible' : 'hidden'}
					variants={listVariants}
				>
					{slides.map(slide => (
						<motion.li
							key={slide.project.id}
							variants={itemVariants}
							role='group'
							aria-roledescription='slide'
							className='w-[min(22rem,calc(100vw-2.5rem))] shrink-0 snap-center snap-always xl:w-[min(24rem,calc(50vw-2rem))] 2xl:w-[min(26rem,calc(33.333vw-1.75rem))]'
						>
							<ProjectCard slide={slide} openLabel={openLabel} overlayActive={overlayCardProjectId === slide.project.id} onBeforeNavigate={onBeforeNavigate} />
						</motion.li>
					))}
				</motion.ul>
			</div>
		);
	}

	const [api, setApi] = useState<CarouselApi | undefined>();
	useEmblaWheelScroll(api);

	return (
		<Carousel setApi={setApi} className='w-full min-w-0 outline-none ring-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0' aria-label={ariaLabel}>
			<CarouselContent className='-ml-0 gap-4'>
				{slides.map((slide, index) => (
					<CarouselItem key={slide.project.id} className='basis-full pl-0 xl:basis-1/2 2xl:basis-1/3'>
						<motion.div
							className='h-full w-full'
							initial={{ opacity: 0, y: 18 }}
							animate={listInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
							transition={{
								duration: 0.45,
								ease: easeInOut,
								delay: listInView ? DELAY_CHILDREN + index * STAGGER : 0,
							}}
						>
							<ProjectCard slide={slide} openLabel={openLabel} overlayActive={overlayCardProjectId === slide.project.id} onBeforeNavigate={onBeforeNavigate} />
						</motion.div>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
};