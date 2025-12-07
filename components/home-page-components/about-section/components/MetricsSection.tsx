'use client';

import { motion, easeOut, AnimatePresence } from 'motion/react';

import { useDeviceType } from '@/hooks/useDeviceType';

import { type MetricItem } from '@/types/metricTypes';

export default function MetricsSection({ metrics }: { metrics: MetricItem[] }) {
	const device = useDeviceType();
	const dotsCount = 23;

	return (
		<motion.section initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: easeOut }} viewport={{ amount: 0.3, once: true }} id='metrics' className='w-full sm:w-1/2 h-full text-green-300 font-mono flex justify-center'>
			<div className='w-full h-full flex flex-col'>
				{!metrics && (
					<div className='w-full h-full flex justify-center items-center'>
						<p className='text-slate-400'>No data</p>
					</div>
				)}
				<ul className='w-full h-full flex flex-col gap-3 md:gap-2 justify-center'>
					{metrics &&
						metrics.map(metric => (
							<li key={metric.label} className='text-sm md:text-[1.1rem] xxl:text-lg'>
								{device === 'mobile' ? (
									<>
										{metric.label} =&gt; {metric.value}
									</>
								) : (
									<>
										{metric.label}
										{' ' + '.'.repeat(Math.max(1, dotsCount - metric.label.length))}
										{' ' + metric.value}
									</>
								)}
							</li>
						))}
				</ul>
			</div>
		</motion.section>
	);
}
