import { type ChatLine, type ChatHistoryTurn } from './types';

export const buildChatHistory = (lines: ChatLine[]): ChatHistoryTurn[] => {
	const turns: ChatHistoryTurn[] = [];
	for (const line of lines) {
		if (line.role === 'rejected') continue;
		turns.push({ role: line.role, text: line.text });
	}
	return turns;
}