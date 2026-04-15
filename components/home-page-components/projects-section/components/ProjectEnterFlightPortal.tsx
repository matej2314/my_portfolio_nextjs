'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useAnimate } from 'motion/react';
import { useRouter } from 'next/navigation';

import type { ProjectEnterPayload } from '@/context/ProjectEnterTransitionContext';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const MEASURE_TIMEOUT_MS = 2800;

const REVEAL_DURATION = 0.55;
const BACKDROP_FADE_DURATION = 0.48;

/** Czeka na pierwszy paint widoku projektu (marker z RSC) i zwraca prostokąt contentu w viewportcie. */
async function waitForProjectContentRect(projectId: string, signal: { cancelled: boolean }): Promise<DOMRect | null> {
	const selector = `[data-project-enter-end][data-project-id="${CSS.escape(projectId)}"]`;
	const deadline = performance.now() + MEASURE_TIMEOUT_MS;

	while (performance.now() < deadline && !signal.cancelled) {
		const el = document.querySelector(selector);
		if (el) {
			const r = el.getBoundingClientRect();
			if (r.width > 0 && r.height > 0) return r;
		}
		await new Promise<void>(resolve => {
			requestAnimationFrame(() => resolve());
		});
	}
	return null;
}

function fallbackContentRect(): { top: number; left: number; width: number; height: number } {
	const vw = window.innerWidth;
	const vh = window.innerHeight;
	const pad = vw >= 640 ? 48 : 24;
	const width = Math.min(1200, Math.max(280, vw - pad));
	const height = Math.min(Math.round(vh * 0.88), 720);
	const left = (vw - width) / 2;
	const top = Math.max(16, (vh - height) / 2);
	return { top, left, width, height };
}

export default function ProjectEnterFlightPortal({
	payload,
	onDone,
}: {
	payload: ProjectEnterPayload;
	onDone: () => void;
}) {
	const router = useRouter();
	const [cardRef, animateCard] = useAnimate();
	const [backdropRef, animateBackdrop] = useAnimate();
	const finishedRef = useRef(false);

	useEffect(() => {
		finishedRef.current = false;
		const signal = { cancelled: false };

		const finish = () => {
			if (finishedRef.current || signal.cancelled) return;
			finishedRef.current = true;
			onDone();
		};

		const run = async () => {
			await new Promise<void>(resolve => {
				requestAnimationFrame(() => resolve());
			});
			if (signal.cancelled) return;

			const card = cardRef.current;
			const backdrop = backdropRef.current;
			if (!card || !backdrop) {
				router.push(payload.href);
				finish();
				return;
			}

			const { rect } = payload;
			const vh = window.innerHeight;
			const vw = window.innerWidth;
			const cTop = (vh - rect.height) / 2;
			const cLeft = (vw - rect.width) / 2;

			await animateCard(
				card,
				{
					top: rect.top,
					left: rect.left,
					width: rect.width,
					height: rect.height,
					borderRadius: 12,
					x: 0,
					y: 0,
					opacity: 1,
				},
				{ duration: 0 },
			);
			await animateBackdrop(backdrop, { opacity: 1 }, { duration: 0 });
			if (signal.cancelled) return;

			await animateCard(
				card,
				{
					top: cTop,
					left: cLeft,
					width: rect.width,
					height: rect.height,
					borderRadius: 12,
					x: 0,
					y: 0,
					opacity: 1,
				},
				{ duration: 0.4, ease: EASE },
			);
			if (signal.cancelled) return;

			void router.push(payload.href);

			const target = await waitForProjectContentRect(payload.projectId, signal);
			if (signal.cancelled) return;

			const end = target
				? {
						top: target.top,
						left: target.left,
						width: target.width,
						height: target.height,
						borderRadius: 0,
						x: 0,
						y: 0,
					}
				: (() => {
						const f = fallbackContentRect();
						return {
							top: f.top,
							left: f.left,
							width: f.width,
							height: f.height,
							borderRadius: 0,
							x: 0,
							y: 0,
						};
					})();

			// Powiększenie do docelowego prostokąta + jednoczesne znikanie — odsłania stronę projektu pod spodem
			await Promise.all([
				animateCard(
					card,
					{
						...end,
						opacity: 0,
					},
					{ duration: REVEAL_DURATION, ease: EASE },
				),
				animateBackdrop(backdrop, { opacity: 0 }, { duration: BACKDROP_FADE_DURATION, ease: EASE }),
			]);
			if (signal.cancelled) return;

			finish();
		};

		void run();

		return () => {
			signal.cancelled = true;
		};
	}, [payload, animateCard, animateBackdrop, router, onDone, cardRef, backdropRef]);

	return createPortal(
		<>
			<motion.div
				ref={backdropRef}
				className='pointer-events-none fixed inset-0 z-[90] bg-black/40'
				initial={{ opacity: 1 }}
				aria-hidden
			/>
			<motion.div
				ref={cardRef}
				className='fixed z-[100] flex flex-col justify-end overflow-hidden border border-[#facc15] bg-[#0c0c0c] shadow-2xl'
				initial={false}
				style={{ willChange: 'top, left, width, height, border-radius, transform, opacity' }}
			>
				<div
					className='pointer-events-none absolute inset-0 bg-cover bg-center opacity-90'
					style={{ backgroundImage: `url(${JSON.stringify(payload.coverSrc)})` }}
					aria-hidden
				/>
				<div className='relative z-[1] bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 pt-14'>
					<p className='truncate text-xl font-semibold text-[#fbbf24]'>{payload.title}</p>
				</div>
			</motion.div>
		</>,
		document.body,
	);
}
