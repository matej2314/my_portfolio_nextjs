import { type Dispatch, type SetStateAction } from 'react';

import { advanceTypewriter, TYPEWRITER_CHARS_PER_SECOND, TYPEWRITER_MAX_FRAME_MS } from '@/lib/assistant/advanceTypewriter';
import { finalizeStream } from '@/lib/assistant/finalizeStream';
import { setStreamingText } from '@/lib/assistant/setStreamingText';
import { type FloatingChatBoxState } from '@/types/floatingChatBoxTypes';

interface CreateAssistantTypewriterParams {
	assistantId: string;
	reducedMotion: boolean;
	setChatBoxState: Dispatch<SetStateAction<FloatingChatBoxState>>;
	charsPerSecond?: number;
}

export const createAssistantTypewriter = ({
	assistantId,
	reducedMotion,
	setChatBoxState,
	charsPerSecond = TYPEWRITER_CHARS_PER_SECOND,
}: CreateAssistantTypewriterParams) => {
	let source = '';
	let displayed = 0;
	let lastTs: number | null = null;
	let rafId: number | null = null;
	let streamDone = false;
	let stopped = false;

	const shownLength = () => Math.floor(displayed);

	const stop = () => {
		stopped = true;
		if (rafId == null) return;
		cancelAnimationFrame(rafId);
		rafId = null;
	};

	const flush = () => {
		setStreamingText(assistantId, source.slice(0, shownLength()), setChatBoxState);
	};

	const finish = () => {
		displayed = source.length;
		flush();
		finalizeStream(setChatBoxState);
		stop();
	};

	const tick = (ts: number) => {
		if (stopped) return;
		rafId = null;

		if (lastTs == null) lastTs = ts;
		const elapsed = Math.min(ts - lastTs, TYPEWRITER_MAX_FRAME_MS);
		lastTs = ts;

		const prevShown = shownLength();
		displayed = reducedMotion ? source.length : advanceTypewriter(displayed, source.length, elapsed, charsPerSecond);

		if (shownLength() !== prevShown) flush();

		if (streamDone && shownLength() >= source.length) {
			finish();
			return;
		}

		if (shownLength() >= source.length) {
			lastTs = null;
			return;
		}

		rafId = requestAnimationFrame(tick);
	};

	const ensureRunning = () => {
		if (stopped || rafId != null) return;
		lastTs = null;
		rafId = requestAnimationFrame(tick);
	};

	return {
		appendDelta: (text: string) => {
			if (stopped || !text) return;
			source += text;
			if (reducedMotion) {
				displayed = source.length;
				flush();
				return;
			}
			ensureRunning();
		},
		markDone: () => {
			if (stopped) return;
			streamDone = true;
			if (reducedMotion || shownLength() >= source.length) {
				finish();
				return;
			}
			ensureRunning();
		},
		stop,
	};
};
