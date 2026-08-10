'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useMemo } from 'react';
import { defaultData } from '@/lib/defaultData';
import { cn } from '@/lib/utils/utils';
import { EASE_EXPO } from '@/lib/motion/variants';
import { type AnimatedMProps } from '@/types/AnimatedMTypes';

const STROKE_W = 10;
const STROKE_H = 65;
const LEFT_ARM = 'translate(-20, -42) rotate(135 20 60)';
const RIGHT_ARM = 'translate(30, 25) rotate(45 60 60)';

const legLeftVariants = {
	initial: { x: -40, opacity: 0 },
	animate: { x: 0, opacity: 1 },
} as const;

const legRightVariants = {
	initial: { x: 40, opacity: 0 },
	animate: { x: 0, opacity: 1 },
} as const;

const armLeftVariants = {
	initial: { attrY: 28, opacity: 0 },
	animate: { attrY: 0, opacity: 1 },
} as const;

const armRightVariants = {
	initial: { attrY: -28, opacity: 0 },
	animate: { attrY: 0, opacity: 1 },
} as const;

function MGeometry() {
	return (
		<>
			<rect x='0' y='0' width={STROKE_W} height={STROKE_H} />
			<rect x='0' y='0' width={STROKE_W} height={STROKE_H} transform={LEFT_ARM} />
			<rect x='0' y='0' width={STROKE_W} height={STROKE_H} transform={RIGHT_ARM} />
			<rect x='90' y='0' width={STROKE_W} height={STROKE_H} />
		</>
	);
}

export default function MLetter({
	size = defaultData.defaultMLetter.size,
	svgHeight,
	duration = defaultData.defaultMLetter.duration,
	colors = defaultData.defaultMLetter.colors,
	mode = defaultData.defaultMLetter.mode as 'animated' | 'button',
	className,
	'aria-hidden': ariaHidden,
}: AnimatedMProps) {
	const height = svgHeight ?? (size * 130) / 110;
	const reduced = useReducedMotion();
	const fill = colors[4] ?? '#8FCB9A';

	const timing = useMemo(() => {
		const drawDuration = Math.min(duration, 0.7);
		return {
			drawDuration,
			armDelay: drawDuration * 0.35,
			armDuration: drawDuration * 0.85,
		};
	}, [duration]);

	if (mode === 'button') {
		const buttonHeight = svgHeight ?? size;
		return (
			<svg
				width={size}
				height={buttonHeight}
				viewBox='0 0 100 68'
				xmlns='http://www.w3.org/2000/svg'
				className={cn(
					'block fill-current transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
					'group-hover:opacity-100 group-hover:scale-[1.03]',
					className,
				)}
				aria-hidden={ariaHidden}
			>
				<MGeometry />
			</svg>
		);
	}

	const startAtEnd = !!reduced;

	return (
		<motion.svg
			width={size}
			height={height}
			viewBox='0 0 100 100'
			xmlns='http://www.w3.org/2000/svg'
			initial={startAtEnd ? false : 'initial'}
			animate='animate'
			aria-label='M letter'
			role='img'
			fill={fill}
		>
			{/* Legs: CSS x OK. Arms: SVG transform + opacity/attrY only (CSS scale overrides SVG transform). */}
			<motion.rect
				x='0'
				y='0'
				width={STROKE_W}
				height={STROKE_H}
				variants={legLeftVariants}
				transition={startAtEnd ? { duration: 0 } : { duration: timing.drawDuration, ease: EASE_EXPO }}
			/>

			<motion.rect
				x='0'
				y='0'
				width={STROKE_W}
				height={STROKE_H}
				transform={LEFT_ARM}
				variants={armLeftVariants}
				transition={
					startAtEnd
						? { duration: 0 }
						: { duration: timing.armDuration, ease: EASE_EXPO, delay: timing.armDelay }
				}
			/>

			<motion.rect
				x='0'
				y='0'
				width={STROKE_W}
				height={STROKE_H}
				transform={RIGHT_ARM}
				variants={armRightVariants}
				transition={
					startAtEnd
						? { duration: 0 }
						: { duration: timing.armDuration, ease: EASE_EXPO, delay: timing.armDelay }
				}
			/>

			<motion.rect
				x='90'
				y='0'
				width={STROKE_W}
				height={STROKE_H}
				variants={legRightVariants}
				transition={startAtEnd ? { duration: 0 } : { duration: timing.drawDuration, ease: EASE_EXPO }}
			/>
		</motion.svg>
	);
}
