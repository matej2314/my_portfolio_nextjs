export const TYPEWRITER_CHARS_PER_SECOND = 80;
export const TYPEWRITER_MAX_FRAME_MS = 50;

export const advanceTypewriter = (
	displayed: number,
	sourceLength: number,
	elapsedMs: number,
	charsPerSecond: number,
): number => {
	if (displayed >= sourceLength) return sourceLength;
	if (elapsedMs <= 0 || charsPerSecond <= 0) return displayed;
	return Math.min(sourceLength, displayed + elapsedMs * (charsPerSecond / 1000));
};
