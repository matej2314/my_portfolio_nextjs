'use client';

import { motion, easeOut } from 'motion/react';

import { type AboutMetricDisplay } from '@/types/metricTypes';

export default function MetricsSection({ metrics }: { metrics: AboutMetricDisplay[] }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.45, ease: easeOut }}
			viewport={{ amount: 0.25, once: true }}
			className="w-full"
		>
			{/* Wrapper wewnętrzny: motion nie psuje display: grid na wąskim ekranie */}
			<div className="grid w-full min-w-0 grid-cols-2 gap-x-3 gap-y-6 place-items-center text-center max-[480px]:gap-x-2 max-[480px]:gap-y-5 sm:gap-x-8 sm:gap-y-8 md:flex md:flex-wrap md:justify-around md:gap-x-10 md:gap-y-6 lg:gap-x-12 lg:gap-y-8">
				{metrics.map((metric) => (
					<div
						key={metric.stat}
						className="flex min-w-0 max-w-[11rem] flex-col items-center gap-1 font-jakarta sm:max-w-none"
					>
						<p className="text-[1.75rem] font-bold leading-tight text-yellow-300 sm:text-[2rem]">
							{metric.stat}
						</p>
						<p className="text-sm font-normal text-slate-400">{metric.label}</p>
					</div>
				))}
			</div>
		</motion.div>
	);
}
