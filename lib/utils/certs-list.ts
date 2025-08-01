import { type RefObject } from 'react';

export const calculateElementPosition = (containerRef: RefObject<HTMLDivElement>, dotRefs: { current: (HTMLDivElement | null)[] }, index: number) => {
	const containerLeft = containerRef.current?.getBoundingClientRect().left;
	const dotLeft = dotRefs.current[index]?.getBoundingClientRect().left;
	const dotWidth = dotRefs.current[index]?.offsetWidth;

	if (!containerLeft || !dotLeft || !dotWidth) return 0;

	const width = dotLeft - containerLeft + dotWidth / 2;

	return width;
};

export const validateRefs = (containerRef: RefObject<HTMLDivElement>, dotRefs: { current: (HTMLDivElement | null)[] }, index: number): boolean => {
	return !!(containerRef.current && dotRefs.current[index]);
};
