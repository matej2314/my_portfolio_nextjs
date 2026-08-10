'use client';

import { Icon } from '@iconify/react';
import { motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { useEmblaWheelScroll } from '@/hooks/useEmblaWheelScroll';
import { ProjectCard } from './ProjectCard';
import ProjectCardPlaceholder from './ProjectCardPlaceholder';
import { type ProjectSlide } from '@/types/ProjectsGalleryTypes';
import { cn } from '@/lib/utils/utils';
import { EASE_EXPO, fadeUp, stagger } from '@/lib/motion/variants';

const listVariants = stagger(0.12, 0.06);

const STAGGER = 0.12;
const DELAY_CHILDREN = 0.06;

function TrackChrome({
	api,
	count,
	selected,
	prevLabel,
	nextLabel,
	progressLabel,
}: {
	api: CarouselApi | undefined;
	count: number;
	selected: number;
	prevLabel: string;
	nextLabel: string;
	progressLabel: string;
}) {
	if (count <= 1) return null;
	const progress = count > 1 ? ((selected + 1) / count) * 100 : 100;

	return (
		<div className='mt-6 flex items-center justify-between gap-4'>
			<div
				className='h-px flex-1 overflow-hidden rounded-full bg-line'
				role='progressbar'
				aria-valuemin={1}
				aria-valuemax={count}
				aria-valuenow={selected + 1}
				aria-label={progressLabel}
			>
				<div
					className='h-full bg-brand transition-[width] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]'
					style={{ width: `${progress}%` }}
				/>
			</div>
			<div className='flex items-center gap-2'>
				<button
					type='button'
					aria-label={prevLabel}
					onClick={() => api?.scrollPrev()}
					className={cn(
						'flex size-10 items-center justify-center rounded-full border border-line bg-surface-1/70 text-ink-1',
						'transition-[border-color,color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
						'hover:border-brand-line hover:text-brand active:scale-[0.96]',
						'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60',
					)}
				>
					<Icon icon='ph:arrow-left-light' width={18} height={18} aria-hidden />
				</button>
				<button
					type='button'
					aria-label={nextLabel}
					onClick={() => api?.scrollNext()}
					className={cn(
						'flex size-10 items-center justify-center rounded-full border border-line bg-surface-1/70 text-ink-1',
						'transition-[border-color,color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
						'hover:border-brand-line hover:text-brand active:scale-[0.96]',
						'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60',
					)}
				>
					<Icon icon='ph:arrow-right-light' width={18} height={18} aria-hidden />
				</button>
			</div>
		</div>
	);
}

export const ProjectsTrack = ({
	slides,
	openLabel,
	flightProjectId,
	ariaLabel,
	nativeScroll,
	listInView,
}: {
	slides: ProjectSlide[];
	openLabel: string;
	flightProjectId: string | null;
	ariaLabel: string;
	nativeScroll: boolean;
	listInView: boolean;
}) => {
	const t = useTranslations('homePage.projectsSection');
	const reduced = useReducedMotion();
	const itemVariants = fadeUp(!!reduced);
	const [api, setApi] = useState<CarouselApi | undefined>();
	const [selected, setSelected] = useState(0);
	useEmblaWheelScroll(nativeScroll ? undefined : api);

	const onSelect = useCallback(() => {
		if (!api) return;
		setSelected(api.selectedScrollSnap());
	}, [api]);

	useEffect(() => {
		if (nativeScroll || !api) return;
		onSelect();
		api.on('select', onSelect);
		api.on('reInit', onSelect);
		return () => {
			api.off('select', onSelect);
			api.off('reInit', onSelect);
		};
	}, [api, nativeScroll, onSelect]);

	if (nativeScroll) {
		return (
			<div
				role='region'
				aria-roledescription='carousel'
				aria-label={ariaLabel}
				className='touch-pan-x overscroll-x-contain overflow-x-auto overflow-y-hidden scroll-smooth outline-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
				style={{ WebkitOverflowScrolling: 'touch' }}
			>
				<motion.ul
					className='flex w-max min-w-full snap-x snap-mandatory pb-2 pl-0 max-xl:gap-4 max-xl:pr-4 xl:gap-5 xl:pr-8'
					initial='hidden'
					animate={listInView ? 'visible' : 'hidden'}
					variants={listVariants}
				>
					{slides.map((slide, index) => (
						<motion.li
							key={slide.project.id}
							variants={itemVariants}
							role='group'
							aria-roledescription='slide'
							className={cn(
								'shrink-0 snap-center snap-always',
								index === 0
									? 'w-[min(28rem,calc(100vw-2.5rem))] xl:w-[min(32rem,calc(58vw-2rem))]'
									: 'w-[min(22rem,calc(100vw-2.5rem))] xl:w-[min(24rem,calc(42vw-2rem))]',
							)}
						>
							{flightProjectId === slide.project.id ? (
								<ProjectCardPlaceholder />
							) : (
								<ProjectCard slide={slide} openLabel={openLabel} />
							)}
						</motion.li>
					))}
				</motion.ul>
			</div>
		);
	}

	return (
		<div className='w-full min-w-0'>
			<Carousel
				setApi={setApi}
				className='w-full min-w-0 outline-none'
				aria-label={ariaLabel}
			>
				<CarouselContent className='-ml-0 gap-4'>
					{slides.map((slide, index) => (
						<CarouselItem
							key={slide.project.id}
							className={cn(
								'pl-0',
								index === 0 ? 'basis-[min(100%,32rem)] xl:basis-[58%]' : 'basis-full xl:basis-[42%]',
							)}
						>
							<motion.div
								className='h-full w-full'
								initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
								animate={
									listInView
										? reduced
											? { opacity: 1 }
											: { opacity: 1, y: 0 }
										: reduced
											? { opacity: 0 }
											: { opacity: 0, y: 18 }
								}
								transition={{
									duration: reduced ? 0.2 : 0.5,
									ease: EASE_EXPO,
									delay: listInView ? DELAY_CHILDREN + index * STAGGER : 0,
								}}
							>
								{flightProjectId === slide.project.id ? (
									<ProjectCardPlaceholder />
								) : (
									<ProjectCard slide={slide} openLabel={openLabel} />
								)}
							</motion.div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
			<TrackChrome
				api={api}
				count={slides.length}
				selected={selected}
				prevLabel={t('prevProject')}
				nextLabel={t('nextProject')}
				progressLabel={t('progressLabel', { current: selected + 1, total: slides.length })}
			/>
		</div>
	);
};
