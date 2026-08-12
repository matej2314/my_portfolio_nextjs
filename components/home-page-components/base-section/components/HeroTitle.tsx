'use client';

import { motion, useReducedMotion } from 'motion/react';

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

export default function HeroTitle({ title }: { title: string }) {
	const reduced = useReducedMotion();
	const words = title.split(' ');

	return (
		<h1 className='max-w-[14ch] font-display text-[clamp(2.75rem,6vw,4.75rem)] font-medium leading-[1.05] tracking-[-0.035em] text-ink-0 text-balance'>
			{words.map((word, index) => (
				<span key={`${word}-${index}`} className='mr-[0.22em] inline-block overflow-hidden align-bottom last:mr-0'>
					<motion.span
						className='inline-block'
						initial={reduced ? false : { y: '110%' }}
						animate={{ y: 0 }}
						transition={
							reduced
								? { duration: 0 }
								: { duration: 1, delay: 0.08 + index * 0.055, ease: EASE_EXPO }
						}
					>
						{word}
					</motion.span>
				</span>
			))}
		</h1>
	);
}
