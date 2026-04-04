'use client';

import { Icon } from '@iconify/react';
import { motion, easeInOut, AnimatePresence, useInView } from 'motion/react';
import { useMemo, useRef } from 'react';
import { useTranslations } from 'next-intl';

import TooltipElement from '@/components/ui/elements/TooltipElement';

import { type SkillsGridColumn } from '@/types/skillsGrid';


const STEP = 0.10;
const INITIAL_DELAY = 0.05;

function buildColumnSteps(columns: SkillsGridColumn[]) {
	let step = 0;
	return columns.map((col) => {
		const titleStep = step++;
		const itemSteps = col.skills.map(() => step++);
		return { titleStep, itemSteps };
	});
}

export default function SkillsGrid({ columns }: { columns: SkillsGridColumn[] }) {
	const t = useTranslations('homePage.skillsSection.skillsList');
	const gridRef = useRef<HTMLDivElement>(null);
	const inView = useInView(gridRef, { once: true, amount: 0.2 });
	const columnSteps = useMemo(() => buildColumnSteps(columns), [columns]);

	return (
		<AnimatePresence>
			<div ref={gridRef} className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
				{columns.map((col, colIndex) => {
					const { titleStep, itemSteps } = columnSteps[colIndex]!;
					return (
						<div key={col.categoryKey} className="flex min-w-0 flex-col gap-4">
							<motion.h3
								className="text-sm font-semibold text-[#facc15]"
								initial={{ opacity: 0, y: 12 }}
								animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
								transition={{
									duration: 0.4,
									ease: easeInOut,
									delay: inView ? INITIAL_DELAY + titleStep * STEP : 0,
								}}
							>
								{col.title}
							</motion.h3>
							<ul className="flex flex-col gap-1.5">
								{col.skills.map((skill, skillIndex) => {
									const descKey = skill.skill_description?.trim();
									const tooltipContent =
										descKey && descKey.length > 0
											? (t as (key: string) => string)(descKey)
											: null;
									const itemStep = itemSteps[skillIndex]!;
									return (
										<motion.li
											className="w-fit"
											key={skill.id}
											initial={{ opacity: 0, y: 10 }}
											animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
											transition={{
												duration: 0.38,
												ease: easeInOut,
												delay: inView ? INITIAL_DELAY + itemStep * STEP : 0,
											}}
										>
											<TooltipElement
												content={tooltipContent}
												side="top"
												sideOffset={8}
												className="max-w-xs border-[2px] border-yellow-600 bg-yellow-400 text-sm text-slate-700"
												arrowClassName="border-b-[2px] border-r-[2px] border-yellow-600 bg-yellow-300 fill-yellow-300"
											>
												<div className="flex cursor-default items-center gap-3 rounded-md py-0.5">
													<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1e293b]">
														<Icon
															icon={(skill.icon_name as string) || 'mdi:code-tags'}
															color={skill.icon_color || '#e2e8f0'}
															width={20}
															height={20}
														/>
													</span>
													<span className="text-base font-normal text-[#e2e8f0]">{skill.skill_name}</span>
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
		</AnimatePresence>
	);
}
