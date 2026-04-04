import { useSyncExternalStore } from "react";

export const useCoarsePointer = () => {
	return useSyncExternalStore(
		cb => {
			const mq = window.matchMedia('(pointer: coarse)');
			mq.addEventListener('change', cb);
			return () => mq.removeEventListener('change', cb);
		},
		() => window.matchMedia('(pointer: coarse)').matches,
		() => false,
	);
}