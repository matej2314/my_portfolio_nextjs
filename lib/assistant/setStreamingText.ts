import { type Dispatch, type SetStateAction } from 'react';
import { type FloatingChatBoxState } from '@/types/floatingChatBoxTypes';

export const setStreamingText = (
	assistantId: string,
	text: string,
	setChatBoxState: Dispatch<SetStateAction<FloatingChatBoxState>>,
) => {
	setChatBoxState(prev => {
		const line = prev.lines.find(l => l.id === assistantId);
		if (!line || line.role !== 'assistant' || line.text === text) return prev;
		return {
			...prev,
			lines: prev.lines.map(l => (l.id === assistantId && l.role === 'assistant' ? { ...l, text } : l)),
		};
	});
};
