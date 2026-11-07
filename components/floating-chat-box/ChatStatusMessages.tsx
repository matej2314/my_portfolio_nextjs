import { type AssistantStatusPhase } from '@/lib/assistant/types';
import { type FloatingChatBoxState } from '@/types/floatingChatBoxTypes';

const STATUS_COPY: Record<AssistantStatusPhase, { pl: string; en: string }> = {
	searching: { pl: 'Wyszukuję informacje…', en: 'Looking up information…' },
	composing: { pl: 'Przygotowuję odpowiedź…', en: 'Preparing reply…' },
};

const loadingCopy = (phase: AssistantStatusPhase | null, locale: string): string => {
	if (phase === null) return locale === 'pl' ? 'Generuję odpowiedź…' : 'Generating reply…';
	return locale === 'pl' ? STATUS_COPY[phase].pl : STATUS_COPY[phase].en;
};

export const ChatStatusMessages = ({ chatBoxState, locale }: { chatBoxState: FloatingChatBoxState, locale: string }) => {
    return (
        <>
        {chatBoxState.loading && <p className='text-center text-xs text-slate-500'>{loadingCopy(chatBoxState.statusPhase, locale)}</p>}
        {chatBoxState.error && <p className='text-center text-sm text-red-400'>{chatBoxState.error}</p>}
        
        </>
    )
}
