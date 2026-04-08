export interface ChatRequest {
    message: string;
    locale?: string;
    conversationId?: string;
}

export interface ChatResponse {
    success: boolean;
    reply?: string;
    rejected?: boolean;
    topics?: string[];
    exampleQuestions?: Record<string, string[]>;
    error?: string;
}

