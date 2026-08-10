'use client';

import { motion, useReducedMotion } from 'motion/react';

import MLetter from './ui/elements/MLetterElement';
import { EASE_EXPO, EASE_SPRING } from '@/lib/motion/variants';

type LoadingScreenProps = {
	phase: 'draw' | 'exit';
	onExitComplete?: () => void;
};

const BRAND_M: string[] = ['#1a1f1c', '#6a9e74', '#7fb889', '#8FCB9A', '#8FCB9A'];

const markEnter = { opacity: 0, scale: 0.96 } as const;
const markVisible = { opacity: 1, scale: 1 } as const;
const overlayVisible = { clipPath: 'inset(0 0 0% 0)' } as const;
const overlayExit = { clipPath: 'inset(0 0 100% 0)' } as const;

export default function LoadingScreen({ phase, onExitComplete }: LoadingScreenProps) {
	const reduced = useReducedMotion();

	return (
		<motion.div
			key='loading-screen'
			className='fixed inset-0 z-[70] flex items-center justify-center bg-surface-0'
			initial={overlayVisible}
			animate={phase === 'exit' ? overlayExit : overlayVisible}
			transition={reduced ? { duration: 0 } : { duration: 0.85, ease: EASE_EXPO }}
			onAnimationComplete={() => {
				if (phase === 'exit') onExitComplete?.();
			}}
			aria-busy={phase === 'draw'}
			aria-live='polite'
		>
			<motion.div
				initial={reduced ? false : markEnter}
				animate={markVisible}
				transition={reduced ? { duration: 0 } : { duration: 0.35, ease: EASE_SPRING }}
			>
				<MLetter mode='animated' size={110} duration={0.7} colors={BRAND_M} />
			</motion.div>
		</motion.div>
	);
}
