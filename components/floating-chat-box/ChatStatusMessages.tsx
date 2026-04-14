import { type FloatingChatBoxState } from '@/types/floatingChatBoxTypes';


export const ChatStatusMessages = ({ chatBoxState, locale }: { chatBoxState: FloatingChatBoxState, locale: string }) => {
    return (
        <>
        {chatBoxState.loading && <p className='text-center text-xs text-slate-500'>{locale === 'pl' ? 'Generuję odpowiedź…' : 'Generating reply…'}</p>}
        {chatBoxState.error && <p className='text-center text-sm text-red-400'>{chatBoxState.error}</p>}
        
        </>
    )
}