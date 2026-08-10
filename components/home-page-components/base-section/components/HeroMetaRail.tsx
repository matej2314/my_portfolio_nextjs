'use client';

import { motion, useReducedMotion } from 'motion/react';

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

type HeroMetaRailProps = {
	location: string;
	stack: string;
	year: string;
};

export default function HeroMetaRail({ location, stack, year }: HeroMetaRailProps) {
	const reduced = useReducedMotion();
	const rows = [
		{ label: '01', value: location },
		{ label: '02', value: stack },
		{ label: '03', value: year },
	];

	return (
		<motion.aside
			aria-label='Profile meta'
			className='flex w-full max-w-sm flex-col gap-5 border-t border-line pt-6 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0'
			initial={reduced ? false : { opacity: 0, x: 18 }}
			animate={{ opacity: 1, x: 0 }}
			transition={reduced ? { duration: 0 } : { delay: 0.45, duration: 0.75, ease: EASE_EXPO }}
		>
			{rows.map(row => (
				<div key={row.label} className='grid grid-cols-[2rem_1fr] gap-3'>
					<span className='font-mono text-[0.65rem] tracking-widest text-ink-3'>{row.label}</span>
					<p className='font-mono text-xs leading-relaxed tracking-wide text-ink-2'>{row.value}</p>
				</div>
			))}
		</motion.aside>
	);
}
