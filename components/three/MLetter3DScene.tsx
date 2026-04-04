'use client';

import { LetterM3DMesh } from './MLetter3dMesh';

type SceneProps = {
	variant: 'static' | 'fill';
	progress: number;
	colorHex: string;
	/** Tylko cieniowanie normalnych — bez perspektywy / obrotu (prosta litera). */
	volumeShading: boolean;
};

export function LetterM3DScene({ variant, progress, colorHex, volumeShading }: SceneProps) {
	return (
		<>
			<ambientLight intensity={0.5} />
			<directionalLight position={[3, 5, 6]} intensity={0.6} />
			<group scale={0.94} position={[0, 0, 0]}>
				<group scale={[1.2, 1, 1]}>
					<LetterM3DMesh
						variant={variant}
						progress={progress}
						colorHex={colorHex}
						volumeShading={volumeShading}
					/>
				</group>
			</group>
		</>
	);
}
