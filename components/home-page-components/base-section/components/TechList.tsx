'use client';

import { motion, useReducedMotion } from 'motion/react';

import { EASE_EXPO, EASE_DRIFT, stagger } from '@/lib/motion/variants';

export default function TechList({ techArray }: { techArray: string[] }) {
	const reduced = useReducedMotion();

	return (
		<motion.span
			className='inline font-mono text-[clamp(0.9rem,1.6vw,1.125rem)] font-medium tracking-wide text-ink-1'
			initial='hidden'
			animate='visible'
			variants={stagger(0.07, 0.35)}
		>
			{techArray.map((tech, index) => (
				<motion.span
					key={`${index}-${tech}`}
					className='inline'
					variants={{
						hidden: reduced ? { opacity: 1 } : { opacity: 0, y: 8 },
						visible: {
							opacity: 1,
							y: 0,
							transition: reduced ? { duration: 0 } : { duration: 0.45, ease: EASE_EXPO },
						},
					}}
				>
					{tech}
					{index < techArray.length - 1 ? (
						<motion.span
							className='mx-2 inline-block text-brand'
							animate={
								reduced
									? undefined
									: {
											opacity: [0.35, 1, 0.35],
										}
							}
							transition={
								reduced
									? undefined
									: {
											duration: 2.4,
											repeat: Infinity,
											delay: index * 0.35,
											ease: EASE_DRIFT,
										}
							}
							aria-hidden
						>
							·
						</motion.span>
					) : null}
				</motion.span>
			))}
		</motion.span>
	);
}
