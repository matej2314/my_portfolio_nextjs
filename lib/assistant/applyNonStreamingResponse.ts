import { type Dispatch, type SetStateAction } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { type ChatLine, ChatResponse } from './types';
import { type FloatingChatBoxState } from '@/types/floatingChatBoxTypes';

interface ApplyNonStreamingResponseParams {
	data: ChatResponse;
	userId: string;
	locale: string;
	setChatBoxState: Dispatch<SetStateAction<FloatingChatBoxState>>;
}

export function applyNonStreamingResponse({ data, userId, locale, setChatBoxState }: ApplyNonStreamingResponseParams): void {
	if (!data.success) {
		const errorMsg = data.error ?? (locale === 'pl' ? 'Wystąpił błąd podczas komunikacji z usługą asystenta. Spróbuj ponownie.' : 'An error occurred while communicating with the assistant service. Please try again.');
		setChatBoxState(prev => ({
			...prev,
			lines: prev.lines.filter(line => line.id !== userId),
			error: errorMsg,
			loading: false,
		}));
		return;
	}
	if (data.rejected) {
		setChatBoxState(prev => ({
			...prev,
			lines: [
				...prev.lines,
				{
					id: uuidv4(),
					role: 'rejected',
					topics: data.topics ?? [],
					exampleQuestions: data.exampleQuestions,
				} as ChatLine,
			],
			loading: false,
		}));
		return;
	}
	if (data.reply) {
		setChatBoxState(prev => ({
			...prev,
			lines: [
				...prev.lines,
				{
					id: uuidv4(),
					role: 'assistant',
					text: data.reply ?? '',
				} as ChatLine,
			],
			loading: false,
		}));
	} else {
		setChatBoxState(prev => ({ ...prev, loading: false }));
	}
}
