'use client';

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';

export type ProjectCardRect = { top: number; left: number; width: number; height: number };

type Pending = { projectId: string; rect: ProjectCardRect };

type Ctx = {
	beginOpen: (projectId: string, rect: ProjectCardRect) => void;
	/** Odczyt prostokąta bez czyszczenia — pierwszy render shellu ma poprawne `initial` */
	peekOpenGeometry: (projectId: string) => ProjectCardRect | null;
	consumeOpenGeometry: (projectId: string) => ProjectCardRect | null;
	/** Karta z overlay: tylko `pointer-events-none` (zostaje widoczna pod animacją) */
	overlayCardProjectId: string | null;
	endOverlay: () => void;
	getLastRect: () => ProjectCardRect | null;
};

const HomeProjectTransitionContext = createContext<Ctx | null>(null);

export function HomeProjectTransitionProvider({ children }: { children: ReactNode }) {
	const pendingRef = useRef<Pending | null>(null);
	const lastRectRef = useRef<ProjectCardRect | null>(null);
	const [overlayCardProjectId, setOverlayCardProjectId] = useState<string | null>(null);

	const beginOpen = useCallback((projectId: string, rect: ProjectCardRect) => {
		pendingRef.current = { projectId, rect };
		lastRectRef.current = rect;
		setOverlayCardProjectId(projectId);
	}, []);

	const peekOpenGeometry = useCallback((projectId: string) => {
		const p = pendingRef.current;
		if (!p || p.projectId !== projectId) return null;
		return p.rect;
	}, []);

	const consumeOpenGeometry = useCallback((projectId: string) => {
		const p = pendingRef.current;
		if (!p || p.projectId !== projectId) return null;
		pendingRef.current = null;
		return p.rect;
	}, []);

	const endOverlay = useCallback(() => {
		setOverlayCardProjectId(null);
		lastRectRef.current = null;
	}, []);

	const getLastRect = useCallback(() => lastRectRef.current, []);

	const value = useMemo(
		() => ({
			beginOpen,
			peekOpenGeometry,
			consumeOpenGeometry,
			overlayCardProjectId,
			endOverlay,
			getLastRect,
		}),
		[beginOpen, peekOpenGeometry, consumeOpenGeometry, overlayCardProjectId, endOverlay, getLastRect],
	);

	return <HomeProjectTransitionContext.Provider value={value}>{children}</HomeProjectTransitionContext.Provider>;
}

export function useHomeProjectTransition() {
	const ctx = useContext(HomeProjectTransitionContext);
	if (!ctx) throw new Error('useHomeProjectTransition: missing HomeProjectTransitionProvider');
	return ctx;
}
