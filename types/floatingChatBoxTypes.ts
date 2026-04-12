import { type ChatLine } from "@/lib/assistant/types";


export type FloatingChatBoxState = {
    open: boolean;
    lines: ChatLine[];
    input: string;
    loading: boolean;
    error: string | null;
}