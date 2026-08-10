'use client';

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useMemo, useRef } from 'react';

import { useSpotlight } from '@/hooks/useSpotlight';
import { type Course } from '@/types/actionsTypes/actionsTypes';
import { cn } from '@/lib/utils/utils';

export type CoursesColumn = {
	categoryKey: string;
	title: string;
	items: Course[];
};

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const STEP = 0.08;
const INITIAL_DELAY = 0.05;

function courseYear(course: Course): number {
	return new Date(course.course_date).getFullYear();
}

function buildColumnSteps(columns: CoursesColumn[]) {
	let step = 0;
	return columns.map(col => {
		const titleStep = step++;
		const itemSteps = col.items.map(() => step++);
		return { titleStep, itemSteps };
	});
}

function CourseCard({
	course,
	delay,
	inView,
}: {
	course: Course;
	delay: number;
	inView: boolean;
}) {
	const cardRef = useRef<HTMLDivElement>(null);
	useSpotlight(cardRef);
	const reduced = useReducedMotion();

	return (
		<motion.div
			initial={reduced ? false : { opacity: 0, y: 12 }}
			animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
			transition={{ duration: 0.45, ease: EASE_EXPO, delay }}
			className='rounded-[var(--radius-shell)] border border-line bg-surface-1/50 p-1.5 shadow-ambient'
		>
			<div
				ref={cardRef}
				className='spotlight flex flex-col gap-3 rounded-[var(--radius-core)] border border-line-soft bg-surface-2 p-5 shadow-inner-top'
			>
				<p className='font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-3'>
					{courseYear(course)}
					{' · '}
					{course.course_organizer}
				</p>
				<p className='font-display text-base font-medium leading-snug tracking-tight text-ink-0 xl:text-lg'>
					{course.course_name}
				</p>
			</div>
		</motion.div>
	);
}

export default function CoursesByCategoryGrid({ columns }: { columns: CoursesColumn[] }) {
	const gridRef = useRef<HTMLDivElement>(null);
	const inView = useInView(gridRef, { once: true, amount: 0.15 });
	const reduced = useReducedMotion();

	const columnsReversed = useMemo(() => [...columns].reverse(), [columns]);
	const columnSteps = useMemo(() => buildColumnSteps(columnsReversed), [columnsReversed]);

	return (
		<div ref={gridRef} className='flex flex-col gap-10'>
			{columnsReversed.map((col, colIndex) => {
				const { titleStep, itemSteps } = columnSteps[colIndex]!;
				return (
					<div key={col.categoryKey} className='flex min-w-0 flex-col gap-4'>
						<motion.h3
							className='font-mono text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-brand'
							initial={reduced ? false : { opacity: 0, y: 12 }}
							animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
							transition={{
								duration: 0.4,
								ease: EASE_EXPO,
								delay: inView ? INITIAL_DELAY + titleStep * STEP : 0,
							}}
						>
							{col.title}
						</motion.h3>
						<div
							className={cn(
								'grid grid-cols-1 gap-3 md:grid-cols-2',
								col.items.length > 2 && 'xl:grid-cols-3',
							)}
						>
							{col.items.map((course, itemIndex) => (
								<CourseCard
									key={course.id}
									course={course}
									inView={inView}
									delay={inView ? INITIAL_DELAY + itemSteps[itemIndex]! * STEP : 0}
								/>
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
}
