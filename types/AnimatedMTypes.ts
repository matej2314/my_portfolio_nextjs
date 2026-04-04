export interface AnimatedMProps {
	size?: number;
	/** Nadpisuje wysokość SVG zamiast (size * 130) / 110. */
	svgHeight?: number;
	className?: string;
	'aria-hidden'?: boolean;
	duration?: number;
	colors?: string[];
	mode: 'animated' | 'button';
}
