'use client';

import dynamic from 'next/dynamic';
import { type MletterCanvasProps } from '@/types/mLetterCanvasTypes';

const MLetterCanvasCore = dynamic(
	() =>
		import('@/components/three/MLetterCanvasCore').then((m) => m.MLetterCanvasCore),
	{ ssr: false, loading: () => null },
);

export function MLetterCanvas(props: MletterCanvasProps) {
	return <MLetterCanvasCore {...props} />;
}