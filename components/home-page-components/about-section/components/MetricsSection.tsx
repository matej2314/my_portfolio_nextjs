'use client';

import { motion, easeOut, AnimatePresence, useInView } from 'motion/react';
import { useRef } from 'react';

import { type AboutMetricDisplay } from '@/types/metricTypes';

const STAGGER = 0.14;
const DELAY_CHILDREN = 0.06;

export default function MetricsSection({ metrics }: { metrics: AboutMetricDisplay[] }) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, amount: 0.25 });

	return (
		<div
			ref={ref}
			className="grid w-full min-w-0 grid-cols-2 place-items-center text-center max-xl:gap-x-2 max-xl:gap-y-5 xl:flex xl:flex-wrap xl:justify-around xl:gap-x-12 xl:gap-y-8"
		>
			<AnimatePresence initial={false}>
				{metrics.map((metric, index) => (
					<motion.div
						key={metric.stat}
						layout
						initial={{ opacity: 0, y: 16 }}
						animate={
							inView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 16 }
						}
						exit={{
							opacity: 0,
							y: -10,
							transition: { duration: 0.3, ease: easeOut },
						}}
						transition={
							inView
								? {
										duration: 0.45,
										ease: easeOut,
										delay: DELAY_CHILDREN + index * STAGGER,
									}
								: { duration: 0.2, ease: easeOut }
						}
						className="flex min-w-0 max-w-[11rem] flex-col items-center gap-1 font-jakarta xl:max-w-none"
					>
						<p className="font-bold leading-tight text-yellow-300 max-xl:text-[1.75rem] xl:text-[2rem]">
							{metric.stat}
						</p>
						<p className="text-sm font-normal text-slate-400">{metric.label}</p>
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
}
