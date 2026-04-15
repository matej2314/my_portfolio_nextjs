'use client';

import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useRef,
	useState,
	type ReactNode,
} from 'react';
import { useReducedMotion } from 'motion/react';
import { useRouter } from 'next/navigation';

import ProjectEnterFlightPortal from '@/components/home-page-components/projects-section/components/ProjectEnterFlightPortal';

export type ProjectCardRect = { top: number; left: number; width: number; height: number };

export type ProjectEnterPayload = {
	href: string;
	projectId: string;
	rect: ProjectCardRect;
	coverSrc: string;
	title: string;
};

function motionReduced(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

type Ctx = {
	startEnterTransition: (p: ProjectEnterPayload) => void;
	flightProjectId: string | null;
};

const ProjectEnterTransitionContext = createContext<Ctx | null>(null);

export function ProjectEnterTransitionProvider({ children }: { children: ReactNode }) {
	const router = useRouter();
	const reduced = useReducedMotion();
	const [flightProjectId, setFlightProjectId] = useState<string | null>(null);
	const [flightPayload, setFlightPayload] = useState<ProjectEnterPayload | null>(null);
	const busyRef = useRef(false);

	const onFlightDone = useCallback(() => {
		setFlightPayload(null);
		setFlightProjectId(null);
		busyRef.current = false;
	}, []);

	const startEnterTransition = useCallback(
		(p: ProjectEnterPayload) => {
			if (busyRef.current) return;
			const skipMotion = Boolean(reduced) || motionReduced();
			if (skipMotion) {
				router.push(p.href);
				return;
			}
			busyRef.current = true;
			setFlightProjectId(p.projectId);
			setFlightPayload(p);
		},
		[reduced, router],
	);

	const value = useMemo(
		() => ({
			startEnterTransition,
			flightProjectId,
		}),
		[startEnterTransition, flightProjectId],
	);

	return (
		<ProjectEnterTransitionContext.Provider value={value}>
			{children}
			{flightPayload ? (
				<ProjectEnterFlightPortal key={flightPayload.href} payload={flightPayload} onDone={onFlightDone} />
			) : null}
		</ProjectEnterTransitionContext.Provider>
	);
}

export function useProjectEnterTransition() {
	const ctx = useContext(ProjectEnterTransitionContext);
	if (!ctx) throw new Error('useProjectEnterTransition: missing ProjectEnterTransitionProvider');
	return ctx;
}
