import * as THREE from 'three';
import { type Font } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export type ReturnedGeometry = {
	geometry: THREE.BufferGeometry;
	YMin: number;
	YMax: number;
};

/**
 * Litera „M” z {@link TextGeometry} (font Jakarta z TTF).
 * Po `center()` bounding box jest pod shader wypełniania w osi Y.
 */
export function buildTextMLetterGeometry(font: Font): ReturnedGeometry {
	const geometry = new TextGeometry('M', {
		font,
		size: 3.5,
		depth: 1.9,
		curveSegments: 18,
		bevelEnabled: false,
	});

	geometry.computeBoundingBox();
	geometry.center();
	geometry.computeBoundingBox();
	const box = geometry.boundingBox!;

	return {
		geometry,
		YMin: box.min.y,
		YMax: box.max.y,
	};
}
