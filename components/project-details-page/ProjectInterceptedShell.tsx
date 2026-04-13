'use client';

import { motion, useAnimate, useReducedMotion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, useState, useMemo, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import ContentContainer from '@/components/ContentContainer';
import { ProjectInterceptCloseProvider } from '@/components/project-details-page/ProjectInterceptCloseContext';
import { useHomeProjectTransition, type ProjectCardRect } from '@/context/HomeProjectTransitionContext';

type Props = {
	projectId: string;
	children: ReactNode;
};

function motionReduced(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function ProjectInterceptedShell({ projectId, children }: Props) {
	const router = useRouter();
	const { peekOpenGeometry, consumeOpenGeometry, getLastRect, endOverlay } = useHomeProjectTransition();
	const reduceMotion = useReducedMotion();
	const [scope, animate] = useAnimate();
	const [fromRect] = useState<ProjectCardRect | null>(() => peekOpenGeometry(projectId));
	const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);

	useLayoutEffect(() => {
		consumeOpenGeometry(projectId);
	}, [projectId, consumeOpenGeometry]);

	useEffect(() => {
		setPortalEl(document.body);
	}, []);

	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = '';
		};
	}, []);

	const handleClose = useCallback(async () => {
		const el = scope.current as HTMLElement | null;
		const rect = getLastRect();
		const reduced = Boolean(reduceMotion) || motionReduced();
		if (el && rect && !reduced) {
			await animate(
				el,
				{
					top: rect.top,
					left: rect.left,
					width: rect.width,
					height: rect.height,
					borderRadius: 12,
					x: 0,
					y: 0,
				},
				{ duration: 0.34, ease: [0.22, 1, 0.36, 1] },
			);
		}
		router.back();
	}, [animate, scope, getLastRect, reduceMotion, router]);

	useEffect(() => {
		return () => {
			endOverlay();
		};
	}, [endOverlay]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') void handleClose();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [handleClose]);

	const reduced = Boolean(reduceMotion) || motionReduced();

	const initial = fromRect
		? {
				top: fromRect.top,
				left: fromRect.left,
				width: fromRect.width,
				height: fromRect.height,
				borderRadius: 12,
			}
		: {
				top: '50%',
				left: '50%',
				width: 'min(92vw, 400px)',
				height: 280,
				x: '-50%',
				y: '-50%',
				borderRadius: 12,
			};

	// Jedna krzywa dla top/left/width/height/x/y — mieszanie spring + różnych czasów x/width
	// powodowało „najpierw lewa strona, potem prawa”; tween zsynchronizowany = równomierne powiększenie.
	const transition = useMemo(() => (reduced ? { duration: 0.12, ease: 'easeOut' as const } : { duration: 0.52, ease: [0.22, 1, 0.36, 1] as const }), [reduced]);

	if (!portalEl) return null;

	return createPortal(
		<>
			<motion.button type='button' aria-label='Close project' className='fixed inset-0 z-40 cursor-default bg-[#000805]' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0.05 : 0.2 }} onClick={() => void handleClose()} />
			<motion.div
				ref={scope}
				className='fixed z-50 flex flex-col overflow-hidden bg-[#0c0c0c] shadow-2xl'
				initial={initial}
				animate={{
					top: 0,
					left: '50%',
					width: 'min(100vw, 1440px)',
					height: '100dvh',
					borderRadius: 0,
					x: '-50%',
					y: 0,
				}}
				transition={transition}
			>
				<ProjectInterceptCloseProvider onRequestClose={handleClose}>
					<div className='no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain'>
						<ContentContainer>{children}</ContentContainer>
					</div>
				</ProjectInterceptCloseProvider>
			</motion.div>
		</>,
		portalEl,
	);
}
