'use client';

import { motion } from 'framer-motion';

import { useDeviceType } from '@/hooks/useDeviceType';

import { type MetricItem } from "@/types/metricTypes"

export default function MetricsSection({ metrics }: { metrics: MetricItem[] }) {

    const device = useDeviceType();

    const dotsCount = 27;
    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ amount: 0.4, once: false }}
            id="metrics"
            className="w-full sm:w-1/2 h-full text-green-300 font-mono flex justify-center pl-8">
            <div className="w-full h-full flex flex-col">
                <ul className="w-full h-full flex flex-col gap-3 md:gap-2 justify-center">
                    {metrics.map((metric) => (
                        <li key={metric.label}
                            className="text-sm xl:text-lg"
                        >
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
    )
}