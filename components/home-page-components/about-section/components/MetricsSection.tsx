'use client';

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';

import { useCountUp } from '@/hooks/useCountUp';
import { useSpotlight } from '@/hooks/useSpotlight';
import { type AboutMetricDisplay } from '@/types/metricTypes';

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const STAGGER = 0.1;

function parseStat(stat: string): { target: number; suffix: string; numeric: boolean } {
	if (/^[A-Za-z]/.test(stat)) {
		return { target: 0, suffix: stat, numeric: false };
	}
	const match = stat.match(/^(\d+)(.*)$/);
	if (!match) return { target: 0, suffix: stat, numeric: false };
	return { target: Number(match[1]), suffix: match[2] ?? '', numeric: true };
}

function MetricTile({
	metric,
	index,
	inView,
}: {
	metric: AboutMetricDisplay;
	index: number;
	inView: boolean;
}) {
	const cardRef = useRef<HTMLDivElement>(null);
	useSpotlight(cardRef);
	const { target, suffix, numeric } = parseStat(metric.stat);
	const counted = useCountUp(target, inView && numeric);
	const reduced = useReducedMotion();

	const display = numeric ? `${counted}${suffix}` : metric.stat;

	return (
		<motion.div
			initial={reduced ? false : { opacity: 0, y: 18 }}
			animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
			transition={{ duration: 0.55, ease: EASE_EXPO, delay: index * STAGGER }}
			className='rounded-[var(--radius-shell)] border border-line bg-surface-1/50 p-1.5 shadow-ambient'
		>
			<div
				ref={cardRef}
				className='spotlight flex h-full min-h-[7.5rem] flex-col justify-between rounded-[var(--radius-core)] border border-line-soft bg-surface-2 p-5 shadow-inner-top xl:min-h-[8.5rem] xl:p-6'
			>
				<p className='font-display text-[2rem] font-medium tabular-nums tracking-tight text-ink-0 xl:text-[2.5rem]'>
					{display}
				</p>
				<p className='font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-3'>{metric.label}</p>
			</div>
		</motion.div>
	);
}

export default function MetricsSection({ metrics }: { metrics: AboutMetricDisplay[] }) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, amount: 0.3 });

	return (
		<div ref={ref} className='grid w-full min-w-0 grid-cols-2 gap-3 xl:grid-cols-4 xl:gap-4'>
			{metrics.map((metric, index) => (
				<MetricTile key={`${metric.stat}-${metric.label}`} metric={metric} index={index} inView={inView} />
			))}
		</div>
	);
}
