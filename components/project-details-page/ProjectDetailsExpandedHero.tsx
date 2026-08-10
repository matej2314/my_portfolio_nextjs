import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import ProjectDetailsBackNav from '@/components/project-details-page/ProjectDetailsBackNav';
import { type Project } from '@/types/actionsTypes/actionsTypes';

type Props = {
	project: Project;
	coverSrc: string | undefined;
	techChips: string[];
	leadText: string;
	navMode: 'intercept' | 'page';
};

export default async function ProjectDetailsExpandedHero({
	project,
	coverSrc,
	techChips,
	leadText,
	navMode,
}: Props) {
	const t = await getTranslations('projectDetailsPage');

	return (
		<header className='relative isolate w-full overflow-hidden border-b border-line'>
			<div className='absolute inset-0' aria-hidden>
				{coverSrc ? (
					<Image
						src={coverSrc}
						alt=''
						fill
						role='presentation'
						className='object-cover opacity-35 grayscale-[40%]'
						sizes='100vw'
						priority={navMode === 'intercept'}
					/>
				) : null}
				<div className='absolute inset-0 bg-[linear-gradient(180deg,oklch(0.16_0.005_255_/_0.55)_0%,var(--color-surface-0)_78%)]' />
				<div className='absolute inset-0 bg-brand/10 mix-blend-soft-light' />
			</div>

			<div className='relative z-[1] mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-5 pb-16 pt-8 xl:px-12 xl:pb-24 xl:pt-10'>
				<ProjectDetailsBackNav projectName={project.project_name} mode={navMode} />

				<div className='grid gap-10 xl:grid-cols-12 xl:gap-12'>
					<div className='flex flex-col gap-5 xl:col-span-8'>
						<p className='font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-ink-3'>
							{project.project_category || t('stackLabel')}
							{project.difficulty ? ` · ${project.difficulty}` : ''}
						</p>
						<h1 className='font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.08] tracking-tight text-ink-0'>
							{project.project_name}
						</h1>
						{leadText ? (
							<p className='max-w-[58ch] text-pretty text-base leading-relaxed text-ink-1 xl:text-lg xl:leading-[1.7]'>
								{leadText}
							</p>
						) : null}
						{techChips.length > 0 ? (
							<ul className='flex flex-wrap gap-2 pt-1'>
								{techChips.map(tech => (
									<li
										key={tech}
										className='rounded-full border border-line bg-surface-1/70 px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-2'
									>
										{tech}
									</li>
								))}
							</ul>
						) : null}
					</div>

					<div className='flex flex-col justify-end gap-4 xl:col-span-4'>
						{(project.project_URL || project.repo) && (
							<div className='flex flex-wrap gap-3'>
								{project.project_URL ? (
									<a
										href={project.project_URL}
										target='_blank'
										rel='noopener noreferrer'
										className='group inline-flex items-center gap-2 rounded-full bg-brand py-1.5 pl-5 pr-1.5 text-sm font-medium text-surface-0 transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-brand-bright active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60'
									>
										{t('metaDemo')}
										<span className='flex size-8 items-center justify-center rounded-full bg-surface-0/10 text-base transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px'>
											↗
										</span>
									</a>
								) : null}
								{project.repo ? (
									<a
										href={project.repo}
										target='_blank'
										rel='noopener noreferrer'
										className='inline-flex items-center gap-2 rounded-full border border-brand-line bg-brand-tint px-5 py-2.5 text-sm font-medium text-brand transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-brand hover:text-brand-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60'
									>
										{t('metaRepo')}
									</a>
								) : null}
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
