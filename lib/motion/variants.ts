import type { Variants, Transition } from 'motion/react';

/** Expo out — primary entrance curve (no ease-in-out / linear). */
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

/** Soft spring for morphs (hamburger, FAB). */
export const EASE_SPRING = [0.32, 0.72, 0, 1] as const;

/** Slow ambient loops (blobs, scroll hint). */
export const EASE_DRIFT = [0.22, 0.61, 0.36, 1] as const;

export const VIEWPORT_ONCE = { once: true, margin: '-15% 0px' } as const;

export const reducedFade: Transition = { duration: 0.2, ease: EASE_EXPO };

/** Standard viewport entrance: rise + optional blur. */
export const rise = (reduced = false): Variants =>
	reduced
		? {
				hidden: { opacity: 0 },
				show: { opacity: 1, transition: reducedFade },
				visible: { opacity: 1, transition: reducedFade },
			}
		: {
				hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
				show: {
					opacity: 1,
					y: 0,
					filter: 'blur(0px)',
					transition: { duration: 0.9, ease: EASE_EXPO },
				},
				visible: {
					opacity: 1,
					y: 0,
					filter: 'blur(0px)',
					transition: { duration: 0.9, ease: EASE_EXPO },
				},
			};

/** Stagger parent — use with `rise` / `fadeUp` children. */
export const stagger = (delay = 0.07, delayChildren = 0.1): Variants => ({
	hidden: {},
	show: { transition: { staggerChildren: delay, delayChildren } },
	visible: { transition: { staggerChildren: delay, delayChildren } },
});

/** Lighter list item (forms, contact rows, skills). */
export const fadeUp = (reduced = false): Variants =>
	reduced
		? {
				hidden: { opacity: 0 },
				visible: { opacity: 1, transition: reducedFade },
				show: { opacity: 1, transition: reducedFade },
			}
		: {
				hidden: { opacity: 0, y: 14 },
				visible: {
					opacity: 1,
					y: 0,
					transition: { duration: 0.5, ease: EASE_EXPO },
				},
				show: {
					opacity: 1,
					y: 0,
					transition: { duration: 0.5, ease: EASE_EXPO },
				},
			};

/** List container opacity + stagger (ContactItems / ContactForm). */
export const listContainer = (staggerChildren = 0.1, delayChildren = 0.06): Variants => ({
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren, delayChildren },
	},
});

/** Compact scale-in for icon list rows. */
export const scaleIn: Variants = {
	hidden: { opacity: 0, scale: 0.85 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.35, ease: EASE_EXPO },
	},
	exit: { opacity: 0, scale: 0.85, transition: { duration: 0.2, ease: EASE_EXPO } },
};

export const fadeUpTransition = (reduced = false, delay = 0): Transition =>
	reduced ? { ...reducedFade, delay: 0 } : { duration: 0.5, ease: EASE_EXPO, delay };
