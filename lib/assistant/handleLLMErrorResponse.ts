import { type Dispatch, type SetStateAction } from 'react';
import { type FloatingChatBoxState } from '@/types/floatingChatBoxTypes';

interface HandleLLMErrorResponseParams {
	userId: string;
	locale: string;
	setChatBoxState: Dispatch<SetStateAction<FloatingChatBoxState>>;
}

export function handleLLMErrorResponse(response: Response, { userId, locale, setChatBoxState }: HandleLLMErrorResponseParams): boolean {
	const rollbackUserAndSetError = (errorMsg: string) => {
		setChatBoxState(prev => ({
			...prev,
			lines: prev.lines.filter(line => line.id !== userId),
			error: errorMsg,
			loading: false,
		}));
	};

	if (response.status === 429) {
		const retryAfter = response.headers.get('Retry-After');
		const minutes = retryAfter ? Math.ceil(Number(retryAfter) / 60) : 15;
		const errorMsg = locale === 'pl' ? `Przekroczono limit zapytań. Spróbuj ponownie za ${minutes} minut.` : `You've exceeded the request limit. Please try again in ${minutes} minutes.`;
		rollbackUserAndSetError(errorMsg);
		return true;
	}
	if (response.status === 503) {
		const errorMsg = locale === 'pl' ? `Usługa asystenta jest obciążona. Spróbuj ponownie później.` : `The assistant service is overloaded. Please try again later.`;
		setChatBoxState(prev => ({
			...prev,
			lines: prev.lines.filter(line => line.id !== userId),
			error: errorMsg,
			loading: false,
		}));
		return true;
	}
	if (!response.ok) {
		const errorMsg = locale === 'pl' ? 'Wystąpił błąd podczas komunikacji z usługą asystenta. Spróbuj ponownie.' : 'An error occurred while communicating with the assistant service. Please try again.';
		rollbackUserAndSetError(errorMsg);
		return true;
	}
	return false;
}
