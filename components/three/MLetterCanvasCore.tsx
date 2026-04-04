'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { LetterM3DScene } from './MLetter3DScene';
import { type MletterCanvasProps } from '@/types/mLetterCanvasTypes';

const DEFAULT_M_LETTER_COLOR_HEX = '#fde047';

type CoreProps = MletterCanvasProps & {
	onWebGLContextLost?: () => void;
};

export function MLetterCanvasCore({
	size = 110,
	canvasHeight: canvasHeightProp,
	variant = 'static',
	progress = 0,
	colorHex = DEFAULT_M_LETTER_COLOR_HEX,
	showVolume = false,
	className,
	onWebGLContextLost,
	'aria-label': ariaLabel,
	'aria-hidden': ariaHidden,
}: CoreProps) {
	const h = canvasHeightProp ?? (size * 130) / 110;

	const aspect = size / h;
	const viewHalfY = 3.2;
	const viewHalfX = viewHalfY * aspect;

	const gl = {
		alpha: true,
		antialias: true,
		preserveDrawingBuffer: false,
		powerPreference: 'high-performance' as const,
	};

	return (
		<div className={className} style={{ width: size, height: h }} aria-label={ariaLabel} aria-hidden={ariaHidden} role='img'>
			<Canvas
				orthographic
				camera={{
					position: [0, 0, 10],
					zoom: 1,
					left: -viewHalfX,
					right: viewHalfX,
					top: viewHalfY,
					bottom: -viewHalfY,
					near: 0.1,
					far: 100,
				}}
				gl={gl}
				dpr={[1, 2.5]}
				style={{ width: '100%', height: '100%' }}
				onCreated={({ gl: renderer }) => {
					// Bez ACES itp. — jasne kolory (np. #ffdf20) są bliżej CSS/SVG niż przy domyślnym tone mappingu.
					renderer.toneMapping = THREE.NoToneMapping;
					renderer.outputColorSpace = THREE.SRGBColorSpace;
					const canvas = renderer.domElement;
					const lost = () => onWebGLContextLost?.();
					canvas.addEventListener('webglcontextlost', lost);
				}}
			>
				<Suspense fallback={null}>
					<LetterM3DScene
						variant={variant}
						progress={progress}
						colorHex={colorHex}
						volumeShading={showVolume}
					/>
				</Suspense>
			</Canvas>
		</div>
	);
}
