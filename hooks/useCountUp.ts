'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

function easeOutCubic(t: number) {
	return 1 - Math.pow(1 - t, 3);
}

/** Animates an integer from 0 → target when `active`. Honors prefers-reduced-motion. */
export function useCountUp(target: number, active: boolean, durationMs = 1100) {
	const reduced = useReducedMotion();
	const [value, setValue] = useState(reduced || !active ? target : 0);

	useEffect(() => {
		if (!active) return;
		if (reduced) {
			setValue(target);
			return;
		}

		let frame = 0;
		const start = performance.now();

		const tick = (now: number) => {
			const t = Math.min(1, (now - start) / durationMs);
			if (t >= 1) {
				setValue(target);
				return;
			}
			setValue(Math.round(easeOutCubic(t) * target));
			frame = requestAnimationFrame(tick);
		};

		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [active, durationMs, reduced, target]);

	return value;
}
