'use client';

import { motion, useReducedMotion } from 'motion/react';

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

export default function HeroEyebrow({ label }: { label: string }) {
	const reduced = useReducedMotion();

	return (
		<motion.span
			className='inline-flex items-center gap-2 rounded-full border border-brand-line bg-brand-tint px-3 py-1 font-mono text-[0.625rem] font-medium uppercase tracking-[0.22em] text-brand'
			initial={reduced ? false : { opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={reduced ? { duration: 0 } : { duration: 0.6, ease: EASE_EXPO }}
		>
			<span className='relative flex size-1.5'>
				<span className='absolute inset-0 animate-ping rounded-full bg-brand opacity-40 motion-reduce:animate-none' />
				<span className='relative size-1.5 rounded-full bg-brand' />
			</span>
			{label}
		</motion.span>
	);
}
