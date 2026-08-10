'use client';

import { useLenis } from 'lenis/react';
import { useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';

function setProgress(el: HTMLDivElement | null, progress: number, reduced: boolean | null) {
	if (!el) return;
	const p = reduced ? (progress > 0 ? 1 : 0) : Math.min(1, Math.max(0, progress));
	el.style.transform = `scaleX(${p})`;
}

/** 2px top progress bar — Lenis `progress` with native scroll fallback on `#mainSection`. */
export default function ScrollProgressBar() {
	const barRef = useRef<HTMLDivElement>(null);
	const reduced = useReducedMotion();

	useLenis(lenis => {
		setProgress(barRef.current, lenis.progress, reduced);
	});

	useEffect(() => {
		const root = document.getElementById('mainSection');
		if (!root) return;

		const onScroll = () => {
			const max = root.scrollHeight - root.clientHeight;
			const p = max > 0 ? root.scrollTop / max : 0;
			setProgress(barRef.current, p, reduced);
		};

		onScroll();
		root.addEventListener('scroll', onScroll, { passive: true });
		return () => root.removeEventListener('scroll', onScroll);
	}, [reduced]);

	return (
		<div className='pointer-events-none fixed inset-x-0 top-0 z-[55] h-0.5 bg-transparent' aria-hidden>
			<div ref={barRef} className='h-full w-full origin-left scale-x-0 bg-brand will-change-transform' />
		</div>
	);
}
