'use client';
import { useState } from 'react';
import { useMLetterWebGLEligible } from '@/hooks/useMLetterWebGLEligible';
import { MLetterCanvas } from './MLetterCanvas';
import MLetter from './MLetterElement';
import { defaultData } from '@/lib/defaultData';
import { cn } from '@/lib/utils/utils';

const M_LETTER_COLOR = '#ffdf20';
const mLetterSvgColors = [...defaultData.defaultMLetter.colors.slice(0, 4), M_LETTER_COLOR];

export type MLetterWithFallbackContext = 'header' | 'menuButton' | 'loading';

type Props = {
	context: MLetterWithFallbackContext;
	size?: number;
	/** Wysokość viewportu litery (px), np. 55 przy szerokości 65. */
	canvasHeight?: number;
	progress?: number;
	className?: string;
	'aria-label'?: string;
};

export function MLetterWithFallback({
	context,
	size,
	canvasHeight,
	progress = 0,
	className,
	'aria-label': ariaLabel,
}: Props) {
	const eligible = useMLetterWebGLEligible();
	const [canvasBroken, setCanvasBroken] = useState(false);
	const use3d = eligible && !canvasBroken;

	if (!use3d) {
		if (context === 'header') {
			return (
				<MLetter
					mode="button"
					size={size ?? defaultData.defaultMLetter.size}
					svgHeight={canvasHeight}
					className={cn('fill-[#ffdf20]', className)}
					aria-hidden
				/>
			);
		}
		if (context === 'menuButton') {
			return (
				<MLetter
					mode="button"
					size={size ?? defaultData.defaultMLetter.size}
					className="fill-[#ffdf20]"
				/>
			);
		}
		return (
			<MLetter
				mode="animated"
				size={size ?? defaultData.defaultMLetter.size}
				colors={mLetterSvgColors}
			/>
		);
	}

	const variant = context === 'loading' ? 'fill' : 'static';
	return (
		<MLetterCanvas
			variant={variant}
			size={size ?? defaultData.defaultMLetter.size}
			canvasHeight={canvasHeight}
			colorHex={M_LETTER_COLOR}
			showVolume={context === 'header'}
			progress={context === 'loading' ? progress : undefined}
			className={className}
			aria-label={ariaLabel}
			onWebGLContextLost={() => setCanvasBroken(true)}
		/>
	);
}
