'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

import LoadingScreen from '@/components/LoadingScreen';

type Phase = 'pending' | 'draw' | 'exit' | 'done';

export default function HomeContent({ children }: { children: ReactNode }) {
	const reduced = useReducedMotion();
	const [phase, setPhase] = useState<Phase>('pending');

	useEffect(() => {
		if (reduced == null) return;

		if (reduced) {
			setPhase('done');
			return;
		}

		setPhase('draw');
		const timer = window.setTimeout(() => setPhase('exit'), 720);
		return () => window.clearTimeout(timer);
	}, [reduced]);

	return (
		<>
			{children}
			{phase === 'draw' || phase === 'exit' ? (
				<LoadingScreen phase={phase === 'exit' ? 'exit' : 'draw'} onExitComplete={() => setPhase('done')} />
			) : null}
		</>
	);
}
