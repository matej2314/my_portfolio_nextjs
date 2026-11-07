import { type AssistantStatusPhase, type ChatLine } from "@/lib/assistant/types";


export type FloatingChatBoxState = {
    open: boolean;
    lines: ChatLine[];
    input: string;
    loading: boolean;
    statusPhase: AssistantStatusPhase | null;
    error: string | null;
}