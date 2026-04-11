import { type ChatHistoryTurn } from './types';

const MAX_HISTORY_TURNS = 10;
const MAX_MESSAGE_LENGTH = 500;

export const normalizeHistory = (raw: unknown): ChatHistoryTurn[] => {
	if (!Array.isArray(raw) || raw.length === 0) return [];
	const capped = raw.slice(-MAX_HISTORY_TURNS);
	const out: ChatHistoryTurn[] = [];
	for (const item of capped) {
		if (!item || typeof item !== 'object') continue;
		const role = (item as { role?: string }).role?.toLowerCase();
		const text = (item as { text?: string }).text;
		if (role !== 'user' && role !== 'assistant') continue;
		if (typeof text !== 'string' || text.length > MAX_MESSAGE_LENGTH) continue;
		const t = text.trim();
		if (!t) continue;
		out.push({ role, text: t });
	}

	return out;
}