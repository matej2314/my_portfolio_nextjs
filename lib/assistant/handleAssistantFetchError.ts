import { type Dispatch, type SetStateAction } from 'react';

import { type FloatingChatBoxState } from '@/types/floatingChatBoxTypes';

interface AssistantFetchErrorHandlerParams {
	error: unknown;
	userId: string;
	locale: string;
	setChatBoxState: Dispatch<SetStateAction<FloatingChatBoxState>>;
}

export function handleAssistantFetchError({ error, userId, locale, setChatBoxState }: AssistantFetchErrorHandlerParams): void {
	if (error instanceof Error && error.name === 'AbortError') {
		setChatBoxState(prev => ({
			...prev,
			lines: prev.lines.filter(line => line.id !== userId),
			error: locale === 'pl' ? 'Anulowano.' : 'Cancelled.',
			loading: false,
		}));
		return;
	}
	setChatBoxState(prev => ({
		...prev,
		lines: prev.lines.filter(line => line.id !== userId),
		error: locale === 'pl' ? 'Wystąpił błąd sieci.' : 'Network error occurred.',
		loading: false,
	}));
}
