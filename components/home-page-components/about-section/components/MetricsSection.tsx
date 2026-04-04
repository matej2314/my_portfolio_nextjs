'use client';

import { motion, easeOut, useInView } from 'motion/react';
import { useRef } from 'react';

import { type AboutMetricDisplay } from '@/types/metricTypes';

export default function MetricsSection({ metrics }: { metrics: AboutMetricDisplay[] }) {

const statRef = useRef<HTMLDivElement>(null);
const isInView = useInView(statRef, { amount: 0.25, once: true });

	


	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			whileInView={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
			transition={{ duration: 0.45, ease: easeOut }}
			viewport={{ amount: 0.25, once: true }}
			className="grid grid-cols-2 md:flex md:w-full flex-wrap justify-around sm:gap-10 md:gap-12"
		>
			{metrics.map((metric) => (
				<motion.div key={metric.stat} ref={statRef} className="flex min-w-[6.5rem] flex-col items-center gap-1 text-center">
					<p  className="text-[1.75rem] font-bold leading-tight text-yellow-300 sm:text-[2rem]">{metric.stat}</p>
					<p className="text-sm font-normal text-slate-400">{metric.label}</p>
				</motion.div>
			))}
		</motion.div>
	);
}
