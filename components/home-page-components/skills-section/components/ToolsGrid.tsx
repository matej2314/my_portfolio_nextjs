'use client';

import { Icon } from '@iconify/react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { useMemo, useRef } from 'react';
import { useTranslations } from 'next-intl';

import TooltipElement from '@/components/ui/elements/TooltipElement';
import { type SkillsGridColumn } from '@/types/skillsGrid';
import { cn } from '@/lib/utils/utils';

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const STEP = 0.08;
const INITIAL_DELAY = 0.05;

function buildColumnSteps(columns: SkillsGridColumn[]) {
	let step = 0;
	return columns.map(col => {
		const titleStep = step++;
		const itemSteps = col.skills.map(() => step++);
		return { titleStep, itemSteps };
	});
}

export default function ToolsGrid({ columns }: { columns: SkillsGridColumn[] }) {
	const t = useTranslations('homePage.skillsSection');
	const tSkillsList = useTranslations('homePage.skillsSection.skillsList');
	const gridRef = useRef<HTMLDivElement>(null);
	const inView = useInView(gridRef, { once: true, amount: 0.2 });
	const reduced = useReducedMotion();
	const columnSteps = useMemo(() => buildColumnSteps(columns), [columns]);

	return (
		<div ref={gridRef} className='mt-2 flex flex-col gap-6'>
			<motion.h3
				className='font-mono text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-brand'
				initial={reduced ? false : { opacity: 0, y: 10 }}
				animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
				transition={{ duration: 0.4, ease: EASE_EXPO }}
			>
				{t('toolsSubsectionTitle')}
			</motion.h3>

			<div className='grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-3 xl:grid-cols-4 xl:gap-12'>
				{columns.map((col, colIndex) => {
					const { titleStep, itemSteps } = columnSteps[colIndex]!;
					return (
						<div key={col.categoryKey} className='flex min-w-0 flex-col gap-4'>
							<motion.h4
								className='font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ink-3'
								initial={reduced ? false : { opacity: 0, y: 12 }}
								animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
								transition={{
									duration: 0.4,
									ease: EASE_EXPO,
									delay: inView ? INITIAL_DELAY + titleStep * STEP : 0,
								}}
							>
								{col.title}
							</motion.h4>
							<ul className='flex flex-col gap-2'>
								{col.skills.map((skill, skillIndex) => {
									const descKey = skill.skill_description?.trim();
									const tooltipContent =
										descKey && descKey.length > 0
											? (tSkillsList as (key: string) => string)(descKey)
											: null;
									const itemStep = itemSteps[skillIndex]!;
									return (
										<motion.li
											className='w-fit'
											key={skill.id}
											initial={reduced ? false : { opacity: 0, y: 10 }}
											animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
											transition={{
												duration: 0.4,
												ease: EASE_EXPO,
												delay: inView ? INITIAL_DELAY + itemStep * STEP : 0,
											}}
										>
											<TooltipElement
												content={tooltipContent}
												side='top'
												sideOffset={8}
												className='max-w-xs border border-line bg-surface-2 text-sm text-ink-1'
												arrowClassName='border-b border-r border-line bg-surface-2 fill-surface-2'
											>
												<div
													className={cn(
														'group flex cursor-default items-center gap-3 rounded-[var(--radius-chip)] border border-line bg-surface-1/60 py-1.5 pl-1.5 pr-3',
														'transition-[transform,border-color,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
														'hover:-translate-y-0.5 hover:border-brand-line hover:bg-surface-2',
													)}
												>
													<span className='flex size-8 shrink-0 items-center justify-center rounded-[calc(var(--radius-chip)-0.25rem)] bg-surface-3/80'>
														<Icon
															icon={(skill.icon_name as string) || 'mdi:code-tags'}
															color={skill.icon_color || '#e2e8f0'}
															width={18}
															height={18}
															className='opacity-70 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:opacity-100'
														/>
													</span>
													<span className='text-sm text-ink-1'>{skill.skill_name}</span>
												</div>
											</TooltipElement>
										</motion.li>
									);
								})}
							</ul>
						</div>
					);
				})}
			</div>
		</div>
	);
}
