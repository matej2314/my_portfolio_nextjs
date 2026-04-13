export interface ChatHistoryTurn {
	role: 'user' | 'assistant';
	text: string;
}

export interface ChatRequest {
	message: string;
	conversationId?: string;
	history?: ChatHistoryTurn[];
}

export interface ChatResponse {
	success: boolean;
	reply?: string;
	rejected?: boolean;
	topics?: string[];
	exampleQuestions?: Record<string, string[]>;
	error?: string;
}

export type ChatRole = 'user' | 'assistant';

interface PosChatLine {
	id: string;
	role: ChatRole;
	text: string;
}

interface RejectedChatLine {
	id: string;
	role: 'rejected';
	topics: string[];
	exampleQuestions?: Record<string, string[]>;
}

export type ChatLine = PosChatLine | RejectedChatLine;

export type AssistantStreamServerEvent = { type: 'delta'; text: string } | { type: 'done' } | { type: 'error'; error: string } | {type: 'rejected', topics: string[], exampleQuestions?: Record<string, string[]>};

