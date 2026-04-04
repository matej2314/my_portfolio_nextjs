import { motion, easeInOut } from 'motion/react';
import { defaultData } from '@/lib/defaultData';
import { cn } from '@/lib/utils/utils';
import { type AnimatedMProps } from '@/types/AnimatedMTypes';

export default function MLetter({ size = defaultData.defaultMLetter.size, svgHeight, duration = defaultData.defaultMLetter.duration, colors = defaultData.defaultMLetter.colors, mode = defaultData.defaultMLetter.mode as 'animated' | 'button', className, 'aria-hidden': ariaHidden }: AnimatedMProps) {
	const height = svgHeight ?? (size * 130) / 110;

	if (mode === 'button') {
		return (
			<svg width={size} height={height} viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg' className={cn(` fill-yellow-400`, className)} aria-hidden={ariaHidden}>
				<rect x='0' y='0' width='10' height='65' />
				<rect x='0' y='0' width='10' height='65' transform='translate(-20, -42) rotate(135 20 60)' />
				<rect x='0' y='0' width='10' height='65' transform='translate(30, 25) rotate(45 60 60)' />
				<rect x='90' y='0' width='10' height='65' />
			</svg>
		);
	}

	return (
		<motion.svg width={size} height={height} viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg' initial='initial' animate='animate' transition={{ duration: duration, ease: easeInOut }} aria-label='M letter' role='img' fill={colors[4]}>
			{/* Left leg */}
			<motion.rect
				x='0'
				y='0'
				width='10'
				height='65'
				variants={{
					initial: { x: -40, opacity: 0 },
					animate: { x: 0, opacity: 1 },
				}}
				transition={{ duration: 0.7, ease: easeInOut }}
			/>

			{/* Left arm */}
			<motion.rect
				x='0'
				y='0'
				width='10'
				height='65'
				transform='translate(-20, -42) rotate(135 20 60)'
				variants={{
					initial: { attrY: 30, opacity: 0 },
					animate: { attrY: 0, opacity: 1 },
				}}
				transition={{ duration: 0.7, ease: easeInOut, delay: 0.7 }}
			/>

			{/* Right arm */}
			<motion.rect
				x='0'
				y='0'
				width='10'
				height='65'
				transform='translate(30, 25) rotate(45 60 60)'
				variants={{
					initial: { attrY: -30, opacity: 0 },
					animate: { attrY: 0, opacity: 1 },
				}}
				transition={{ duration: 0.7, ease: easeInOut, delay: 0.7 }}
			/>

			{/* Right leg */}
			<motion.rect
				x='90'
				y='0'
				width='10'
				height='65'
				variants={{
					initial: { x: 40, opacity: 0 },
					animate: { x: 0, opacity: 1 },
				}}
				transition={{ duration: 0.7, ease: easeInOut }}
			/>
		</motion.svg>
	);
}
