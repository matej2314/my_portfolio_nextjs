'use client';

import { motion, easeInOut, AnimatePresence, useInView } from 'motion/react';
import { useMemo, useRef } from 'react';

import { type Course } from '@/types/actionsTypes/actionsTypes';

export type CoursesColumn = {
	categoryKey: string;
	title: string;
	items: Course[];
};

const STEP = 0.1;
const INITIAL_DELAY = 0.05;

function courseYear(course: Course): number {
	return new Date(course.course_date).getFullYear();
}

function buildColumnSteps(columns: CoursesColumn[]) {
	let step = 0;
	return columns.map((col) => {
		const titleStep = step++;
		const itemSteps = col.items.map(() => step++);
		return { titleStep, itemSteps };
	});
}

export default function CoursesByCategoryGrid({ columns }: { columns: CoursesColumn[] }) {
	const gridRef = useRef<HTMLDivElement>(null);
	const inView = useInView(gridRef, { once: true, amount: 0.2 });

	const columnsReversed = useMemo(() => [...columns].reverse(), [columns]);
	const columnSteps = useMemo(() => buildColumnSteps(columnsReversed), [columnsReversed]);

	return (
		<AnimatePresence>
			<div
				ref={gridRef}
				className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-12 xl:gap-y-10"
			>
				{columnsReversed.map((col, colIndex) => {
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
							<div className="flex flex-col gap-4">
								{col.items.map((course, itemIndex) => {
									const itemStep = itemSteps[itemIndex]!;
									return (
										<motion.div
											key={course.id}
											className="flex flex-col gap-2"
											initial={{ opacity: 0, y: 10 }}
											animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
											transition={{
												duration: 0.38,
												ease: easeInOut,
												delay: inView ? INITIAL_DELAY + itemStep * STEP : 0,
											}}
										>
											<p className="text-base font-semibold leading-snug text-slate-50">{course.course_name}</p>
											<p className="text-sm font-normal text-slate-500">
												{courseYear(course)}
												{' · '}
												{course.course_organizer}
											</p>
										</motion.div>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</AnimatePresence>
	);
}
