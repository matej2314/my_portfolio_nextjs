export type MletterCanvasVariant = 'static' | 'fill';

export type MletterCanvasProps = {
	/** Szerokość canvas (px). */
	size?: number;
	/** Wysokość canvas (px); brak = proporcja 110:130 jak wcześniej. */
	canvasHeight?: number;
	variant?: MletterCanvasVariant;
	progress?: number;
	/** Kolor wypełnienia (hex), np. dla spójności z wersją SVG. */
	colorHex?: string;
	/** Perspektywa + cieniowanie (np. logo w menu). */
	showVolume?: boolean;
	className?: string;
	'aria-label'?: string;
	'aria-hidden'?: boolean;
	onWebGLContextLost?: () => void;
};
