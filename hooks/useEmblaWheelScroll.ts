import { useEffect } from "react";
import { type CarouselApi } from "@/components/ui/carousel";

export const useEmblaWheelScroll = (api: CarouselApi | undefined) => {
	useEffect(() => {
		if (!api) return;
		const root = api.rootNode();
		const onWheel = (e: WheelEvent) => {
			if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
			e.preventDefault();
			e.stopPropagation();
			if (e.deltaY > 8) api.scrollNext();
			else if (e.deltaY < -8) api.scrollPrev();
		};
		root.addEventListener('wheel', onWheel, { passive: false });
		return () => root.removeEventListener('wheel', onWheel);
	}, [api]);
}