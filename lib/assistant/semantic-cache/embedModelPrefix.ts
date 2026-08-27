import { APP_CONFIG } from '@/config/app.config';

const QUERY_PREFIX = 'search_query: ';
const DOCUMENT_PREFIX = 'search_document: ';

const applyPrefix = (text: string, prefix: string): string => {
	const trimmed = text.trim();
	if (!trimmed) return '';
	if (APP_CONFIG.assistantCache.semantic.embedPrefixMode === 'none') return trimmed;
	return `${prefix}${trimmed}`;
};

export const withEmbedQueryPrefix = (text: string): string => applyPrefix(text, QUERY_PREFIX);

export const withEmbedDocumentPrefix = (text: string): string => applyPrefix(text, DOCUMENT_PREFIX);
