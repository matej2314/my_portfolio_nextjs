'use client';

import { motion } from 'framer-motion';

import { type MetricItem } from "@/types/metricTypes"

export default function MetricsSection({ metrics }: { metrics: MetricItem[] }) {


    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ amount: 0.4, once: false }}
            id="metrics"
            className="w-1/2 h-full text-green-300 font-mono flex justify-center pl-8">
            <div className="w-full h-full flex flex-col">
                <ul className="w-full h-full flex flex-col">
                    {metrics.map((metric) => (
                        <li key={metric.label}
                            className="text-lg"
                        >
                            {metric.label}
                            {' ' + '.'.repeat(25 - metric.label.length)}
                            {' ' + metric.value}
                        </li>
                    ))}
                </ul>
            </div>
        </motion.section>
    )
}