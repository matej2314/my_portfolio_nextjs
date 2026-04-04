'use client';

import '@react-three/fiber';
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { Font, type FontData } from 'three/examples/jsm/loaders/FontLoader.js';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import { buildTextMLetterGeometry } from './MLetterGeometry';
import { letterMFragmentShader, letterMVertexShader } from './MLetterFillShader';
import { PLUS_JAKARTA_M_LETTER_TTF } from './mLetterFont';

type MeshProps = {
	variant: 'static' | 'fill';
	progress: number;
	colorHex: string;
	/** Światło z normalnych — widać ekstruzję. */
	volumeShading?: boolean;
};

export function LetterM3DMeshLoaded({ variant, progress, colorHex, volumeShading = false }: MeshProps) {
	const meshRef = useRef<THREE.Mesh>(null);
	const fontJson = useLoader(TTFLoader, PLUS_JAKARTA_M_LETTER_TTF) as FontData;
	const font = useMemo(() => new Font(fontJson), [fontJson]);

	const { geometry, YMin, YMax } = useMemo(() => buildTextMLetterGeometry(font), [font]);

	useEffect(() => {
		return () => geometry.dispose();
	}, [geometry]);

	const material = useMemo(() => {
		const col = new THREE.Color(colorHex);
		return new THREE.ShaderMaterial({
			transparent: true,
			depthWrite: false,
			toneMapped: false,
			uniforms: {
				uFill: { value: variant === 'static' ? 1 : 0 },
				uYMin: { value: YMin },
				uYMax: { value: YMax },
				uColor: { value: col },
				uFeather: { value: 0.04 },
				uVolumeShading: { value: volumeShading ? 1 : 0 },
			},
			vertexShader: letterMVertexShader,
			fragmentShader: letterMFragmentShader,
		});
	}, [variant, colorHex, YMin, YMax, volumeShading]);

	useLayoutEffect(() => {
		const m = meshRef.current?.material as THREE.ShaderMaterial | undefined;
		if (!m) return;
		m.uniforms.uFill.value = variant === 'static' ? 1 : THREE.MathUtils.clamp(progress, 0, 1);
		m.uniforms.uYMin.value = YMin;
		m.uniforms.uYMax.value = YMax;
	}, [variant, progress, YMin, YMax]);

	useLayoutEffect(() => {
		const m = meshRef.current?.material as THREE.ShaderMaterial | undefined;
		if (!m) return;
		m.uniforms.uColor.value = new THREE.Color(colorHex);
		m.uniforms.uVolumeShading.value = volumeShading ? 1 : 0;
	}, [colorHex, volumeShading]);

	return <mesh ref={meshRef} geometry={geometry} material={material} />;
}
