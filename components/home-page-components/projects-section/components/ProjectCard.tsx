'use client';

import { type ProjectSlide } from '@/types/ProjectsGalleryTypes';
import { useRef, type MouseEvent } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { event } from '@/lib/google-analytics/gtag';

import { useProjectEnterTransition } from '@/context/ProjectEnterTransitionContext';
import { useSpotlight } from '@/hooks/useSpotlight';
import { readRect } from '@/lib/utils/utils';
import { cn } from '@/lib/utils/utils';

export const ProjectCard = ({ slide, openLabel }: { slide: ProjectSlide; openLabel: string }) => {
	const rootRef = useRef<HTMLDivElement>(null);
	const shellRef = useRef<HTMLDivElement>(null);
	useSpotlight(shellRef);
	const { startEnterTransition } = useProjectEnterTransition();
	const { project, coverImage, excerpt, techLabel } = slide;
	const href = `/home/project/${project.id}`;

	const techs = techLabel
		.split(/[·|,]/)
		.map(part => part.trim())
		.filter(Boolean);

	const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
		if (e.button !== 0) return;
		const root = rootRef.current;
		if (!root) return;
		e.preventDefault();
		startEnterTransition({
			href,
			projectId: project.id,
			rect: readRect(root),
			coverSrc: coverImage,
			title: project.project_name,
		});
		event({
			action: 'view_project',
			params: { eventName: 'view_project', eventCount: 1, eventValue: 1 },
		});
	};

	return (
		<div ref={rootRef} className='relative w-full'>
			<a
				href={href}
				onClick={onClick}
				className='group block h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0'
			>
				<div
					ref={shellRef}
					className='spotlight relative overflow-hidden rounded-[var(--radius-shell)] border border-line bg-surface-1/50 p-1.5 shadow-ambient transition-[border-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-0.5 group-hover:border-brand-line'
				>
					<div className='overflow-hidden rounded-[var(--radius-core)] border border-line-soft bg-surface-2 shadow-inner-top'>
						<div className='relative aspect-[16/10] w-full overflow-hidden'>
							<Image
								src={coverImage}
								alt={project.project_name}
								fill
								className={cn(
									'object-cover opacity-75 grayscale-[35%] transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]',
									'group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0',
								)}
								sizes='(max-width: 768px) 90vw, (max-width: 1280px) 55vw, 40vw'
							/>
							<div
								className='pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,oklch(0.16_0.005_255_/_0.85)_100%)]'
								aria-hidden
							/>
							<div
								className='pointer-events-none absolute inset-0 bg-brand/10 mix-blend-soft-light'
								aria-hidden
							/>
						</div>

						<div className='relative z-[1] flex flex-col gap-3 p-5 xl:p-6'>
							<div className='flex items-start justify-between gap-3'>
								<h3 className='font-display text-xl font-medium tracking-tight text-ink-0'>
									{project.project_name}
								</h3>
								<span className='flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-ink-2 transition-[transform,border-color,color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:border-brand-line group-hover:text-brand'>
									<Icon icon='ph:arrow-up-right-light' width={16} height={16} aria-hidden />
								</span>
							</div>

							{techs.length > 0 ? (
								<ul className='flex flex-wrap gap-1.5'>
									{techs.map(tech => (
										<li
											key={tech}
											className='rounded-full border border-line bg-surface-1/80 px-2.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-3'
										>
											{tech}
										</li>
									))}
								</ul>
							) : null}

							{excerpt ? (
								<p className='line-clamp-3 text-sm leading-relaxed text-ink-2'>{excerpt}</p>
							) : null}

							<span className='sr-only'>{openLabel}</span>
						</div>
					</div>
				</div>
			</a>
		</div>
	);
};
