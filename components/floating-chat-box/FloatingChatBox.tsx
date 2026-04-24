'use client';

import { Icon } from '@iconify/react';
import { motion } from 'motion/react';
import { type CSSProperties } from 'react';

import { useFloatingChatBox } from '@/hooks/useFloatingChatBox';

import { cn } from '@/lib/utils/utils';
import ResponseRenderer from '@/components/floating-chat-box/ResponseRenderer';
import { ChatStatusMessages } from '@/components/floating-chat-box/ChatStatusMessages';
import FloatingBoxHeader from '@/components/ui/elements/floating-boxes/FloatingBoxHeader';
import FloatingBoxLayout from '@/components/ui/elements/floating-boxes/FloatingBoxLayout';
import { refusalCopy } from '@/lib/assistant/refusalCopy';

export default function FloatingChatBox() {
	const { chatBoxState, setChatBoxState, handleSubmit, messagesEndRef, chatInputRef, regionId, locale, chatBoxPanelTransition, tuckAfterOpen, tuckDuration, revealAfterClose, revealDuration, subtitle, streamingAssistantLineId, CHAT_PANEL_WIDTH, ACCENT, CARD_BG, BORDER, SHOW_DELAY_CHAT_BOX, ENTER_DURATION_CHAT_BOX, reduced } = useFloatingChatBox();

	return (
		<FloatingBoxLayout
			open={chatBoxState.open}
			reduced={reduced}
			regionId={regionId}
			rootOverlayClassName={`top-[calc(50%+6.25rem)] ${chatBoxState.open ? 'z-30' : 'z-10'}`}
			enterDelay={SHOW_DELAY_CHAT_BOX}
			enterDuration={ENTER_DURATION_CHAT_BOX}
			panelTransition={chatBoxPanelTransition}
			onOpenLauncher={() => setChatBoxState(prev => ({ ...prev, open: true }))}
			launcherTranslationKey={`${chatBoxState.open ? 'homePage.floatingChat.toggleClose' : 'homePage.floatingChat.toggleOpen'}`}
			launcherIconName='mdi:robot'
			launcherStyle={{ CARD_BG, BORDER, ACCENT, tuckAfterOpen, tuckDuration, revealAfterClose, revealDuration }}
			panelClassName='min-h-[500px] h-full flex align-stretch'
			cardClassName={cn('max-h-[min(32rem,calc(100vh-4rem))]', CHAT_PANEL_WIDTH)}
			regionAriaLabel={locale === 'pl' ? 'Okno czatu z asystentem AI' : 'AI assistant chat panel'}
			cardBackgroundColor={CARD_BG}
			cardBorderColor={BORDER}
		>
			<FloatingBoxHeader className='relative flex shrink-0 items-center gap-3 border-b p-4 pr-12' style={{ borderColor: BORDER }}>
				<motion.button type='button' aria-label={locale === 'pl' ? 'Zamknij czat' : 'Close chat'} onClick={() => setChatBoxState(prev => ({ ...prev, open: false }))} className='absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5' style={{ color: ACCENT }} whileHover={reduced ? undefined : { opacity: 0.9 }} whileTap={reduced ? undefined : { scale: 0.95 }}>
					<Icon icon='mdi:close' width={22} height={22} />
				</motion.button>
				<div className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#2a2a2b]' aria-hidden>
					<Icon icon='mdi:robot' width={24} height={24} style={{ color: ACCENT }} />
				</div>
				<div className='min-w-0'>
					<p className='truncate text-lg font-semibold text-white'>{locale === 'pl' ? 'Asystent AI' : 'AI assistant'}</p>
					<p className='truncate text-xs text-slate-400'>{subtitle}</p>
				</div>
			</FloatingBoxHeader>
			<div className='flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto no-scrollbar px-3 py-3' style={{ scrollbarGutter: 'stable' }}>
				{chatBoxState.lines.length === 0 && !chatBoxState.loading && <p className='px-1 text-center text-sm text-slate-500'>{locale === 'pl' ? 'Zadaj pytanie o projekty, umiejętności lub doświadczenie.' : 'Ask about projects, skills, or experience.'}</p>}
				{chatBoxState.lines.map(line =>
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
								{line.role === 'user' ? line.text : <ResponseRenderer content={line.text} isAnimating={streamingAssistantLineId === line.id} />}
							</div>
						</div>
					),
				)}
				<ChatStatusMessages chatBoxState={chatBoxState} locale={locale} />
				<div ref={messagesEndRef} />
			</div>
			<div className='shrink-0 border-t p-3' style={{ borderColor: BORDER }}>
				<form className='flex flex-col gap-2 sm:flex-row sm:items-stretch' onSubmit={handleSubmit}>
					<label htmlFor={`${regionId}-chat-input`} className='sr-only'>
						{locale === 'pl' ? 'Treść wiadomości' : 'Message'}
					</label>
					<input
						ref={chatInputRef}
						id={`${regionId}-chat-input`}
						type='text'
						value={chatBoxState.input}
						onChange={e => setChatBoxState(prev => ({ ...prev, input: e.target.value }))}
						disabled={chatBoxState.loading}
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
					<motion.button type='submit' disabled={chatBoxState.loading || !chatBoxState.input.trim()} className='shrink-0 rounded-lg px-4 py-2 text-sm font-medium text-[#1a1a1b] disabled:opacity-80' style={{ backgroundColor: ACCENT }} whileHover={reduced || chatBoxState.loading ? undefined : { filter: 'brightness(1.06)' }} whileTap={reduced || chatBoxState.loading ? undefined : { scale: 0.98 }}>
						{locale === 'pl' ? 'Wyślij' : 'Send'}
					</motion.button>
				</form>
			</div>
		</FloatingBoxLayout>
	);
}
