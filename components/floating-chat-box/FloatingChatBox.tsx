'use client';

import { Icon } from '@iconify/react';
import { motion, useReducedMotion } from 'motion/react';
import { type CSSProperties, useId, useState } from 'react';

import { defaultData } from '@/lib/defaultData';
import { cn } from '@/lib/utils/utils';

const SHOW_DELAY_S = 3;
const ENTER_DURATION_S = 0.72;

const MOCK_USER_MESSAGE =
	'Jakie technologie i narzędzia wykorzystujesz najczęściej w projektach frontendowych?';

const MOCK_AI_REPLY =
	'W projektach webowych najczęściej pracuję w React i Next.js, z TypeScriptem jako językiem bazowym. Stylowanie to głównie Tailwind CSS, a do animacji lubię Motion. Backend i integracje obsługuję wtedy, gdy trzeba — np. API Routes w Next albo proste endpointy.';

/** Szerzej niż karta kontaktu (`20rem`), żeby czat był czytelniejszy. */
const CHAT_PANEL_W = 'w-[min(25rem,calc(100vw-3rem))]';

export default function FloatingChatBox() {
	const reduced = useReducedMotion();
	const [open, setOpen] = useState(false);
	const regionId = useId();
	const { config } = defaultData.floatingContactData;

	const ACCENT = config.accent;
	const CARD_BG = config.cardBg;
	const BORDER = config.border;

	const PANEL_DURATION = reduced ? 0 : 0.5;
	const panelTransition = reduced ? { duration: 0 } : { duration: PANEL_DURATION, ease: 'easeInOut' as const };

	const tuckAfterOpen = reduced ? 0 : PANEL_DURATION * 0.55;
	const tuckDuration = reduced ? 0 : 0.38;
	const revealAfterClose = reduced ? 0 : PANEL_DURATION * 0.42;
	const revealDuration = reduced ? 0 : 0.42;

	return (
		<motion.div
			className={`pointer-events-none fixed right-1 top-[calc(50%+6.25rem)] ${open ? 'z-30' : 'z-10'} flex -translate-y-1/2 flex-row items-start overflow-visible`}
			style={{ gap: open ? 0 : 8 }}
			initial={reduced ? false : { opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={
				reduced
					? { duration: 0 }
					: { delay: SHOW_DELAY_S, duration: ENTER_DURATION_S, ease: [0.22, 1, 0.36, 1] }
			}
		>
			<motion.div
				aria-hidden
				className='shrink-0'
				initial={false}
				animate={{ width: open ? 0 : 56 }}
				transition={panelTransition}
			/>
			<motion.button
				type='button'
				aria-expanded={false}
				aria-controls={regionId}
				aria-label='Otwórz czat z asystentem AI'
				aria-hidden={open}
				tabIndex={open ? -1 : 0}
				onClick={() => setOpen(true)}
				className={cn(
					'pointer-events-auto absolute left-0 top-1/2 z-[5] flex size-14 cursor-pointer items-center justify-center rounded-full border-2 shadow-lg',
					open && 'pointer-events-none',
				)}
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
				transition={
					reduced
						? { duration: 0 }
						: open
							? { delay: tuckAfterOpen, duration: tuckDuration, ease: [0.4, 0, 0.2, 1] }
							: { delay: revealAfterClose, duration: revealDuration, ease: [0.22, 1, 0.36, 1] }
				}
				whileHover={reduced || open ? undefined : { opacity: 1 }}
				whileTap={reduced || open ? undefined : { scale: 0.96 }}
			>
				<Icon icon='mdi:robot' width={26} height={26} style={{ color: ACCENT }} />
			</motion.button>

			<motion.div
				className={cn('relative z-10 overflow-hidden', open ? 'pointer-events-auto' : 'pointer-events-none')}
				initial={false}
				animate={{ width: open ? 'auto' : 0 }}
				transition={panelTransition}
			>
				<div
					id={regionId}
					role='region'
					aria-label='Okno czatu z asystentem AI'
					aria-hidden={!open}
					className={cn('flex max-h-[min(32rem,calc(100vh-4rem))] flex-col rounded-2xl border shadow-xl', CHAT_PANEL_W)}
					style={{ backgroundColor: CARD_BG, borderColor: BORDER }}
				>
					<header className='relative flex shrink-0 items-center gap-3 border-b p-4 pr-12' style={{ borderColor: BORDER }}>
						<motion.button
							type='button'
							aria-label='Zamknij czat'
							onClick={() => setOpen(false)}
							className='absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5'
							style={{ color: ACCENT }}
							whileHover={reduced ? undefined : { opacity: 0.9 }}
							whileTap={reduced ? undefined : { scale: 0.95 }}
						>
							<Icon icon='mdi:close' width={22} height={22} />
						</motion.button>
						<div
							className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#2a2a2b]'
							aria-hidden
						>
							<Icon icon='mdi:robot' width={24} height={24} style={{ color: ACCENT }} />
						</div>
						<div className='min-w-0'>
							<p className='truncate text-lg font-semibold text-white'>Asystent AI</p>
							<p className='truncate text-xs text-slate-400'>Wkrótce podłączenie modelu</p>
						</div>
					</header>

					<div
						className='flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3 py-3'
						style={{ scrollbarGutter: 'stable' }}
					>
						<div className='flex flex-col items-end gap-1'>
							<span className='text-[0.65rem] font-medium uppercase tracking-wide text-slate-500'>Ty</span>
							<div
								className='max-w-[95%] rounded-2xl rounded-br-md px-3 py-2.5 text-sm leading-relaxed text-white'
								style={{ backgroundColor: 'rgb(30 58 138 / 0.55)' }}
							>
								{MOCK_USER_MESSAGE}
							</div>
						</div>
						<div className='flex flex-col items-start gap-1'>
							<span className='text-[0.65rem] font-medium uppercase tracking-wide text-slate-500'>Asystent</span>
							<div
								className='max-w-[95%] rounded-2xl rounded-bl-md border px-3 py-2.5 text-sm leading-relaxed text-slate-200'
								style={{
									backgroundColor: 'rgb(22 101 52 / 0.25)',
									borderColor: 'rgb(34 197 94 / 0.2)',
								}}
							>
								{MOCK_AI_REPLY}
							</div>
						</div>
					</div>

					<div className='shrink-0 border-t p-3' style={{ borderColor: BORDER }}>
						<form
							className='flex flex-col gap-2 sm:flex-row sm:items-stretch'
							onSubmit={e => e.preventDefault()}
						>
							<label htmlFor={`${regionId}-chat-input`} className='sr-only'>
								Treść wiadomości
							</label>
							<input
								id={`${regionId}-chat-input`}
								type='text'
								placeholder='Napisz wiadomość…'
								className='min-h-9 w-full flex-1 rounded-lg border bg-[#2a2a2b] px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--chat-input-focus)] focus-visible:ring-offset-0 focus-visible:ring-offset-transparent'
								style={
									{
										borderColor: BORDER,
										'--chat-input-focus': ACCENT,
									} as CSSProperties & { '--chat-input-focus': string }
								}
								autoComplete='off'
							/>
							<motion.button
								type='submit'
								className='shrink-0 rounded-lg px-4 py-2 text-sm font-medium text-[#1a1a1b]'
								style={{ backgroundColor: ACCENT }}
								whileHover={reduced ? undefined : { filter: 'brightness(1.06)' }}
								whileTap={reduced ? undefined : { scale: 0.98 }}
							>
								Submit
							</motion.button>
						</form>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}
