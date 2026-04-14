'use client';

import { useState, useId, useEffect, useRef, useMemo, type FormEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { defaultData } from '@/lib/defaultData';
import { useLocale } from 'next-intl';
import { useReducedMotion } from 'motion/react';

import {buildChatHistory} from '@/lib/assistant/buildChatHistory';
import { handleLLMErrorResponse } from '@/lib/assistant/handleLLMErrorResponse';
import { applyNonStreamingResponse } from '@/lib/assistant/applyNonStreamingResponse';
import { handleAssistantFetchError } from '@/lib/assistant/handleAssistantFetchError';
import { updateStreamingText } from '@/lib/assistant/updateStreamingText';
import { finalizeStream } from '@/lib/assistant/finalizeStream';

import { type AssistantStreamServerEvent, type ChatLine } from '@/lib/assistant/types';
import { type ChatResponse } from '@/lib/assistant/types';
import { type FloatingChatBoxState } from '@/types/floatingChatBoxTypes';


export const useFloatingChatBox = () => {
    const reduced = useReducedMotion();

	const [chatBoxState, setChatBoxState] = useState<FloatingChatBoxState>({
		open: false,
		lines: [],
		input: '',
		loading: false,
		error: null,
	});

	const messagesEndRef = useRef<HTMLDivElement>(null);

	const regionId = useId();
	const locale = useLocale();
	const { config } = defaultData.floatingBoxesData;
	const { accent: ACCENT, cardBg: CARD_BG, border: BORDER, calcPanelDuration, showDelayChatBox: SHOW_DELAY_CHAT_BOX, enterDurationBox: ENTER_DURATION_CHAT_BOX, chatBoxWidth: CHAT_PANEL_WIDTH } = config;

	const CHAT_BOX_PANEL_DURATION = calcPanelDuration(reduced ?? false);
	const chatBoxPanelTransition = reduced ? { duration: 0 } : { duration: CHAT_BOX_PANEL_DURATION, ease: 'easeInOut' as const };

	const tuckAfterOpen = reduced ? 0 : CHAT_BOX_PANEL_DURATION * 0.55;
	const tuckDuration = config.calcTuckDuration(reduced ?? false);
	const revealAfterClose = reduced ? 0 : CHAT_BOX_PANEL_DURATION * 0.42;
	const revealDuration = config.calcRevealDuration(reduced ?? false);

	const subtitle = useMemo(() => (chatBoxState.loading ? (locale === 'pl' ? 'Odpowiadam…' : 'Thinking…') : locale === 'pl' ? 'msliwowski.net - asystent AI' : 'msliwowski.net - AI assistant'), [chatBoxState.loading, locale]);

	const streamingAssistantLineId = useMemo(() => {
		if (!chatBoxState.loading || chatBoxState.lines.length === 0) return null;
		const last = chatBoxState.lines[chatBoxState.lines.length - 1];
		return last.role === 'assistant' ? last.id : null;
	}, [chatBoxState.loading, chatBoxState.lines]);

	useEffect(() => {
		if (chatBoxState.loading && messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
		}
	}, [chatBoxState.lines.length, chatBoxState.loading]);

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		const text = chatBoxState.input.trim();
		if (!text || chatBoxState.loading) return;

		const userId = uuidv4();

		setChatBoxState(prev => ({
			...prev,
			error: null,
			input: '',
			lines: [...prev.lines, { id: userId, role: 'user', text }],
			loading: true,
		}));

		const history = buildChatHistory(chatBoxState.lines);
		const abortController = new AbortController();
		try {
			const response = await fetch('/api/assistant/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: text, history }),
				signal: abortController.signal,
			});
			if (handleLLMErrorResponse(response, { userId, locale, setChatBoxState })) return;

			const contentType = response.headers.get('content-type');
			if (contentType?.includes('text/event-stream')) {
				const assistantId = uuidv4();
				setChatBoxState(prev => ({
					...prev,
					lines: [...prev.lines, { id: assistantId, role: 'assistant', text: '' }],
				}));
				const reader = response.body?.getReader();
				if (!reader) {
					throw new Error('No response body reader');
				}
				const decoder = new TextDecoder();
				let buffer = '';
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					buffer += decoder.decode(value, { stream: true });
					const lines = buffer.split('\n\n');
					buffer = lines.pop() ?? '';
					for (const line of lines) {
						if (!line.trim() || !line.startsWith('data: ')) continue;
						try {
							const jsonStr = line.slice(6);
							const event = JSON.parse(jsonStr) as AssistantStreamServerEvent;
							switch (event.type) {
								case 'delta':
									updateStreamingText(assistantId, event.text, setChatBoxState);
									break;
								case 'done':
									finalizeStream(setChatBoxState);
									break;
								case 'error':
									setChatBoxState(prev => ({
										...prev,
										lines: prev.lines.filter(l => l.id !== assistantId),
										error: event.error,
										loading: false,
									}));
									break;
								case 'rejected':
									setChatBoxState(prev => ({
										...prev,
										lines: [
											...prev.lines.filter(l => l.id !== assistantId),
											{
												id: uuidv4(),
												role: 'rejected',
												topics: event.topics,
												exampleQuestions: event.exampleQuestions,
											} as ChatLine,
										],
										loading: false,
									}));
									break;
							}
						} catch (parseError) {
							console.error('[SSE PARSE ERROR]:', parseError, line);
						}
					}
				}
				return;
			}
			const data = (await response.json()) as ChatResponse;
			applyNonStreamingResponse({ data, userId, locale, setChatBoxState });
		} catch (error) {
			handleAssistantFetchError({ error, userId, locale, setChatBoxState });
		}
    }
    
    return {
        chatBoxState,
        setChatBoxState,
        handleSubmit,
        messagesEndRef,
        regionId,
        locale,
        config,
        CHAT_BOX_PANEL_DURATION,
        chatBoxPanelTransition,
        tuckAfterOpen,
        tuckDuration,
        revealAfterClose,
        revealDuration,
        subtitle,
        streamingAssistantLineId,
        CHAT_PANEL_WIDTH,
        ACCENT,
        CARD_BG,
        BORDER,
        SHOW_DELAY_CHAT_BOX,
        ENTER_DURATION_CHAT_BOX,
        reduced,
    }
};
