export const float32Buffer = (values: number[]): Buffer => {
	const arr = Float32Array.from(values);
	return Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength);
};

export const maxCosineDistance = (similarityThreshold: number): number => 1 - similarityThreshold;
