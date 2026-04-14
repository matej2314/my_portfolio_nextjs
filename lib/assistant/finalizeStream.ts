import { type Dispatch, type SetStateAction } from 'react';
import { type FloatingChatBoxState } from '@/types/floatingChatBoxTypes';


export const finalizeStream = (setChatBoxState: Dispatch<SetStateAction<FloatingChatBoxState>>) => {
    setChatBoxState(prev => ({ ...prev, loading: false }));
};