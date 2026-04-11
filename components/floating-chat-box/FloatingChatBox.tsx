'use client';

import { Icon } from '@iconify/react';
import { v4 as uuidv4 } from 'uuid';
import { motion, useReducedMotion } from 'motion/react';
import { type CSSProperties, useId, useMemo, useState } from 'react';
import { useLocale } from 'next-intl';

import MarkdownRenderer from '@/components/blog-page-components/MarkdownRenderer';

import { cn } from '@/lib/utils/utils';
import { refusalCopy } from '@/lib/assistant/refusalCopy';
import { buildChatHistory } from '@/lib/assistant/buildChatHistory';

import { defaultData } from '@/lib/defaultData';

import { type ChatLine } from '@/lib/assistant/types';
import { type ChatResponse } from '@/lib/assistant/types';

export default function FloatingChatBox() {
	const reduced = useReducedMotion();
	const [open, setOpen] = useState(false);
	const [lines, setLines] = useState<ChatLine[]>([]);
	const [input, setInput] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
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

	const subtitle = useMemo(() => (loading ? (locale === 'pl' ? 'Odpowiadam…' : 'Thinking…') : locale === 'pl' ? 'msliwowski.net - asystent AI' : 'msliwowski.net - AI assistant'), [loading, locale]);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const text = input.trim();
		if (!text || loading) return;

		setError(null);
		setInput('');
		const userId = uuidv4();
		setLines(prev => [...prev, { id: userId, role: 'user', text }]);
		setLoading(true);

		const history = buildChatHistory(lines);

		try {
			const response = await fetch('/api/assistant/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: text, history }),
			});

			const data = (await response.json()) as ChatResponse;

			if (!response.ok || !data.success) {
				setLines(prev => prev.filter(line => line.id !== userId));
				setError(data.error ?? (locale === 'pl' ? 'Nie udało się wysłać wiadomości.' : 'Could not sent the message.'));
				return;
			}

			if (data.rejected) {
				setLines(
					prev =>
						[
							...prev,
							{
								id: uuidv4(),
								role: 'rejected',
								topics: data.topics ?? [],
								exampleQuestions: data.exampleQuestions,
							},
						] as ChatLine[],
				);
				return;
			}

			if (data.reply) {
				setLines(prev => [...prev, { id: uuidv4(), role: 'assistant', text: data.reply }] as ChatLine[]);
			}
		} catch (error) {
			setLines(prev => prev.filter(line => line.id !== userId));
			setError(locale === 'pl' ? 'Błąd sieciowy.' : 'Network error.');
		} finally {
			setLoading(false);
		}
	}

	return (
		<motion.div className={`pointer-events-none fixed right-1 top-[calc(50%+6.25rem)] ${open ? 'z-30' : 'z-10'} flex -translate-y-1/2 flex-row items-start overflow-visible`} style={{ gap: open ? 0 : 8 }} initial={reduced ? false : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={reduced ? { duration: 0 } : { delay: SHOW_DELAY_CHAT_BOX, duration: ENTER_DURATION_CHAT_BOX, ease: [0.22, 1, 0.36, 1] }}>
			<motion.div aria-hidden className='shrink-0' initial={false} animate={{ width: open ? 0 : 56 }} transition={chatBoxPanelTransition} />
			<motion.button
				type='button'
				aria-expanded={open}
				aria-controls={regionId}
				aria-label={locale === 'pl' ? 'Otwórz czat z asystentem AI' : 'Open AI assistant chat'}
				aria-hidden={open}
				tabIndex={open ? -1 : 0}
				onClick={() => setOpen(true)}
				className={cn('pointer-events-auto absolute left-0 top-1/2 z-[5] flex size-14 cursor-pointer items-center justify-center rounded-full border-2 shadow-lg', open && 'pointer-events-none')}
				style={{
					backgroundColor: CARD_BG,
					borderColor: BORDER,
					boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
					transformOrigin: 'center center',
				}}
				initial={false}
				animate={
					reduced
						? {
								scale: open ? 0.01 : 1,
								x: 0,
								y: '-50%',
								opacity: open ? 0 : 1,
								filter: 'none',
								rotate: 0,
							}
						: open
							? {
									scale: 0.14,
									x: 52,
									y: 'calc(-50% + 14px)',
									opacity: 0,
									filter: 'blur(3px)',
									rotate: -6,
								}
							: {
									scale: 1,
									x: 0,
									y: '-50%',
									opacity: 1,
									filter: 'blur(0px)',
									rotate: 0,
								}
				}
				transition={reduced ? { duration: 0 } : open ? { delay: tuckAfterOpen, duration: tuckDuration, ease: [0.4, 0, 0.2, 1] } : { delay: revealAfterClose, duration: revealDuration, ease: [0.22, 1, 0.36, 1] }}
				whileHover={reduced || open ? undefined : { opacity: 1 }}
				whileTap={reduced || open ? undefined : { scale: 0.96 }}
			>
				<Icon icon='mdi:robot' width={26} height={26} style={{ color: ACCENT }} />
			</motion.button>
			<motion.div className={cn('relative z-10 overflow-hidden min-h-[500px] h-full flex align-stretch', open ? 'pointer-events-auto' : 'pointer-events-none')} initial={false} animate={{ width: open ? 'auto' : 0 }} transition={chatBoxPanelTransition}>
				<div id={regionId} role='region' aria-label={locale === 'pl' ? 'Okno czatu z asystentem AI' : 'AI assistant chat panel'} aria-hidden={!open} className={cn('flex max-h-[min(32rem,calc(100vh-4rem))] flex-col rounded-2xl border shadow-xl', CHAT_PANEL_WIDTH)} style={{ backgroundColor: CARD_BG, borderColor: BORDER }}>
					<header className='relative flex shrink-0 items-center gap-3 border-b p-4 pr-12' style={{ borderColor: BORDER }}>
						<motion.button type='button' aria-label={locale === 'pl' ? 'Zamknij czat' : 'Close chat'} onClick={() => setOpen(false)} className='absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5' style={{ color: ACCENT }} whileHover={reduced ? undefined : { opacity: 0.9 }} whileTap={reduced ? undefined : { scale: 0.95 }}>
							<Icon icon='mdi:close' width={22} height={22} />
						</motion.button>
						<div className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#2a2a2b]' aria-hidden>
							<Icon icon='mdi:robot' width={24} height={24} style={{ color: ACCENT }} />
						</div>
						<div className='min-w-0'>
							<p className='truncate text-lg font-semibold text-white'>{locale === 'pl' ? 'Asystent AI' : 'AI assistant'}</p>
							<p className='truncate text-xs text-slate-400'>{subtitle}</p>
						</div>
					</header>
					<div className='flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto no-scrollbar px-3 py-3' style={{ scrollbarGutter: 'stable' }}>
						{lines.length === 0 && !loading && <p className='px-1 text-center text-sm text-slate-500'>{locale === 'pl' ? 'Zadaj pytanie o projekty, umiejętności lub doświadczenie.' : 'Ask about projects, skills, or experience.'}</p>}
						{lines.map(line =>
							line.role === 'rejected' ? (
								<div key={line.id} className='flex flex-col gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2.5 text-sm text-slate-200'>
									<p>{refusalCopy(locale)}</p>
									{line.topics.length > 0 && (
										<ul className='list-inside list-disc text-xs text-slate-400'>
											{line.topics.map(t => (
												<li key={t}>{t}</li>
											))}
										</ul>
									)}
								</div>
							) : (
								<div key={line.id} className={cn('flex flex-col gap-1', line.role === 'user' ? 'items-end' : 'items-start')}>
									<span className='text-[0.65rem] font-medium uppercase tracking-wide text-slate-500'>{line.role === 'user' ? (locale === 'pl' ? 'Ty' : 'You') : locale === 'pl' ? 'Asystent' : 'Assistant'}</span>
									<div
										className={cn('max-w-[95%] rounded-2xl px-3 py-2.5 text-sm leading-relaxed', line.role === 'user' ? 'rounded-br-md text-white' : 'rounded-bl-md border text-slate-200')}
										style={
											line.role === 'user'
												? { backgroundColor: 'rgb(30 58 138 / 0.55)' }
												: {
														backgroundColor: 'rgb(22 101 52 / 0.25)',
														borderColor: 'rgb(34 197 94 / 0.2)',
													}
										}
									>
										{line.role === 'user' ? (
											line.text
										) : (
											<MarkdownRenderer
												content={line.text}
												className={cn(
													'break-words text-sm leading-relaxed text-slate-200',
													'[&_p]:m-0 [&_p+p]:mt-2',
													'[&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-4',
													'[&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-4',
													'[&_li]:my-0.5',
													'[&_strong]:font-semibold [&_strong]:text-slate-100',
													'[&_a]:underline [&_a]:text-slate-100',
													'[&_h1]:text-base [&_h1]:font-semibold [&_h1]:mt-2 [&_h1]:mb-1',
													'[&_h2]:text-base [&_h2]:font-semibold [&_h2]:mt-2 [&_h2]:mb-1',
													'[&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mt-2 [&_h3]:mb-1',
												)}
											/>
										)}
									</div>
								</div>
							),
						)}
						{loading && <p className='text-center text-xs text-slate-500'>{locale === 'pl' ? 'Generuję odpowiedź…' : 'Generating reply…'}</p>}
						{error && <p className='text-center text-sm text-red-400'>{error}</p>}
					</div>
					<div className='shrink-0 border-t p-3' style={{ borderColor: BORDER }}>
						<form className='flex flex-col gap-2 sm:flex-row sm:items-stretch' onSubmit={handleSubmit}>
							<label htmlFor={`${regionId}-chat-input`} className='sr-only'>
								{locale === 'pl' ? 'Treść wiadomości' : 'Message'}
							</label>
							<input
								id={`${regionId}-chat-input`}
								type='text'
								value={input}
								onChange={e => setInput(e.target.value)}
								disabled={loading}
								placeholder={locale === 'pl' ? 'Napisz wiadomość…' : 'Type a message…'}
								className='min-h-9 w-full flex-1 rounded-lg border bg-[#2a2a2b] px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--chat-input-focus)] focus-visible:ring-offset-0 focus-visible:ring-offset-transparent disabled:opacity-60'
								style={
									{
										borderColor: BORDER,
										'--chat-input-focus': ACCENT,
									} as CSSProperties & { '--chat-input-focus': string }
								}
								autoComplete='off'
							/>
							<motion.button type='submit' disabled={loading || !input.trim()} className='shrink-0 rounded-lg px-4 py-2 text-sm font-medium text-[#1a1a1b] disabled:opacity-80' style={{ backgroundColor: ACCENT }} whileHover={reduced || loading ? undefined : { filter: 'brightness(1.06)' }} whileTap={reduced || loading ? undefined : { scale: 0.98 }}>
								{locale === 'pl' ? 'Wyślij' : 'Send'}
							</motion.button>
						</form>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}
