import { type Dispatch, type SetStateAction } from 'react';
import { type FloatingChatBoxState } from '@/types/floatingChatBoxTypes';


export const updateStreamingText = (assistantId: string, deltaText: string, setChatBoxState: Dispatch<SetStateAction<FloatingChatBoxState>>) => {
    setChatBoxState(prev => ({
        ...prev,
        lines: prev.lines.map(l => (l.id === assistantId && l.role === 'assistant' ? { ...l, text: l.text + deltaText } : l)),
    }));
};