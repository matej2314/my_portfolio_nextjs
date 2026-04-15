import { type ProjectSlide } from '@/types/ProjectsGalleryTypes';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { event } from '@/lib/google-analytics/gtag';

export const ProjectCard = ({ slide, openLabel, overlayActive, onBeforeNavigate }: { slide: ProjectSlide; openLabel: string; overlayActive: boolean; onBeforeNavigate: (projectId: string, root: HTMLElement | null) => void }) => {
	const rootRef = useRef<HTMLDivElement>(null);
	const { project, coverImage, excerpt, techLabel } = slide;
	const href = `/home/project/${project.id}`;

	return (
		<div ref={rootRef} className='relative h-[280px] min-h-[280px] w-full'>
			<Link
				href={href}
				scroll={false}
				className={`group block h-full w-full outline-none ring-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0 ${overlayActive ? 'pointer-events-none' : ''}`}
				onClick={() => {
					onBeforeNavigate(project.id, rootRef.current);
					event({
						action: 'view_project',
						params: { eventName: 'view_project', eventCount: 1, eventValue: 1 },
					});
				}}
			>
				<div className='relative flex h-[280px] w-full flex-col justify-end overflow-hidden rounded-xl border border-[#facc15] bg-[#0c0c0c] shadow-md'>
					<Image src={coverImage} alt={project.project_name} fill className='object-cover opacity-70 transition duration-300 group-hover:scale-105 group-hover:opacity-100 group-focus:scale-105 group-focus:opacity-100 group-focus-visible:scale-105 group-focus-visible:opacity-85' sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />
					<div className='relative z-[1] flex flex-col gap-3 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 pt-14'>
						<h3 className='text-xl font-semibold text-[#fbbf24]'>{project.project_name}</h3>
						<p className='text-xs font-semibold uppercase tracking-wide text-slate-200'>{techLabel}</p>
						{excerpt ? <p className='line-clamp-3 text-sm leading-relaxed text-slate-200'>{excerpt}</p> : null}
						<span className='text-sm font-normal text-[#facc15]'>{openLabel}</span>
					</div>
				</div>
			</Link>
		</div>
	);
};
