'use client';

import { useEffect, useRef, type RefObject } from 'react';

/** Sets --mx/--my on the element from pointer position (rAF, no React state). */
export function useSpotlight(ref: RefObject<HTMLElement | null>) {
	const frame = useRef(0);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const onMove = (event: MouseEvent) => {
			cancelAnimationFrame(frame.current);
			frame.current = requestAnimationFrame(() => {
				const rect = el.getBoundingClientRect();
				if (rect.width === 0 || rect.height === 0) return;
				const mx = ((event.clientX - rect.left) / rect.width) * 100;
				const my = ((event.clientY - rect.top) / rect.height) * 100;
				el.style.setProperty('--mx', `${mx}%`);
				el.style.setProperty('--my', `${my}%`);
			});
		};

		el.addEventListener('mousemove', onMove, { passive: true });
		return () => {
			cancelAnimationFrame(frame.current);
			el.removeEventListener('mousemove', onMove);
		};
	}, [ref]);
}
