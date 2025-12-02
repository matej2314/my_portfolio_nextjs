'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ExperienceDot from './components/ExperienceDot';
import { type GetExperiencesType } from '@/types/actionsTypes/actionsTypes';

export default function ExperienceSection({ experiences }: { experiences: GetExperiencesType | undefined }) {
	const containerRef = useRef<HTMLDivElement>(null);
	const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
	const lineRef = useRef<HTMLDivElement>(null);
	const [highlightHeight, setHighlightHeight] = useState<number>(0);

	const experienceData = experiences && !('error' in experiences) ? experiences.experiences : [];
	const sortedExperiences = [...experienceData].sort((a, b) => {
		const dateA = a.employed_since ? new Date(a.employed_since).getTime() : 0;
		const dateB = b.employed_since ? new Date(b.employed_since).getTime() : 0;
		return dateB - dateA;
	});

	useEffect(() => {
		const container = containerRef.current;
		const dots = dotRefs.current;
		const line = lineRef.current;

		if (!container || !line || dots.length === 0) return;

		const updateHighlightHeight = () => {
			if (!lineRef.current || !containerRef.current) return;

			const containerRect = containerRef.current.getBoundingClientRect();
			const lineRect = lineRef.current.getBoundingClientRect();
			const containerCenter = containerRect.top + containerRect.height / 2;

			// Find the dot closest to the center of the viewport
			let closestIndex = 0;
			let closestDistance = Infinity;

			dotRefs.current.forEach((dot, index) => {
				if (!dot) return;
				const dotRect = dot.getBoundingClientRect();
				const dotCenter = dotRect.top + dotRect.height / 2;
				const distance = Math.abs(dotCenter - containerCenter);

				if (distance < closestDistance) {
					closestDistance = distance;
					closestIndex = index;
				}
			});

			const closestDot = dotRefs.current[closestIndex];
			if (!closestDot) return;

			const dotRect = closestDot.getBoundingClientRect();
			const dotCenter = dotRect.top + dotRect.height / 2;
			const height = dotCenter - lineRect.top;

			setHighlightHeight(Math.max(0, height));
		};

		// Initial update
		updateHighlightHeight();

		// Update on scroll
		const handleScroll = () => {
			updateHighlightHeight();
		};

		container.addEventListener('scroll', handleScroll, { passive: true });

		// Also use Intersection Observer for more precise detection
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						updateHighlightHeight();
					}
				});
			},
			{
				root: containerRef.current,
				rootMargin: '-40% 0px -40% 0px',
				threshold: 0,
			}
		);

		dotRefs.current.forEach(dot => {
			if (dot) observer.observe(dot);
		});

		return () => {
			if (container) {
				container.removeEventListener('scroll', handleScroll);
			}
			dots.forEach(dot => {
				if (dot) observer.unobserve(dot);
			});
		};
	}, [sortedExperiences.length]);

	if (!experiences || 'error' in experiences) {
		return <p>Failed to fetch experiences</p>;
	}

	const handleDotClick = (index: number) => {
		const dotElement = dotRefs.current[index];
		if (dotElement && containerRef.current) {
			dotElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	};

	return (
		<section id='experienceSection' className='w-full min-h-screen flex flex-col text-slate-200 snap-center'>
			<span className='text-4xl text-green-400 px-4 lg:px-8'>Experience &#123;</span>

			<div ref={containerRef} className='w-full flex-1 overflow-y-auto scroll-smooth snap-y snap-mandatory no-scrollbar relative' style={{ maxHeight: 'calc(100vh - 4rem)' }}>
				<div className='relative w-full flex items-start justify-center'>
					<div className='relative flex flex-col items-center w-full max-w-full px-4'>
						<span className='absolute top-[calc(50vh-18%)] left-1/2 -translate-x-1/2 z-20 text-xl text-green-500 whitespace-nowrap'>{sortedExperiences[0]?.employed_since ? new Date(sortedExperiences[0].employed_since).getFullYear() : 'Present'}</span>
						<div className='relative w-full' style={{ minHeight: `${sortedExperiences.length * 30}vh`, paddingTop: 'calc(50vh - 50vh)' }}>
							<div ref={lineRef} className='absolute left-1/2 top-[20vh] -translate-x-1/2 w-2 bg-green-400 rounded-full shadow-2xl shadow-green-400 z-0' style={{ height: 'calc(100% - (50vh - 3rem))' }}>
								<motion.div className='absolute top-0 left-0 w-2 bg-yellow-300 rounded-full shadow-2xl shadow-yellow-300' animate={{ height: highlightHeight }} transition={{ duration: 0.3, ease: 'easeInOut' }} />
							</div>
							{sortedExperiences.map((experience, index) => (
								<ExperienceDot
									key={experience.id}
									ref={el => {
										dotRefs.current[index] = el;
									}}
									experience={experience}
									onClick={() => handleDotClick(index)}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
