'use client';

import { Icon } from '@iconify/react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useId, useState } from 'react';

import ContactRow from './ContactRow';

import { defaultData } from '@/lib/defaultData';
import { cn } from '@/lib/utils/utils';
import { type FloatingContactRow, type SocialLinkItem } from '@/types/floatingContactTypes';

const SHOW_DELAY_S = 3;
const ENTER_DURATION_S = 0.72;

export default function FloatingContactBox() {
	const t = useTranslations('homePage.floatingContact');
	const reduced = useReducedMotion();
	const [open, setOpen] = useState(false);
	const regionId = useId();
	const { photoSrc, fullName, contactRows, socialLinks, config } = defaultData.floatingContactData;

	const ACCENT = config.accent;
	const CARD_BG = config.cardBg;
	const BORDER = config.border;
	const CARD_W = config.cardWidth;

	const PANEL_DURATION = reduced ? 0 : 0.5;
	const panelTransition = reduced ? { duration: 0 } : { duration: PANEL_DURATION, ease: 'easeInOut' as const };

	const tuckAfterOpen = reduced ? 0 : PANEL_DURATION * 0.55;
	const tuckDuration = reduced ? 0 : 0.38;
	const revealAfterClose = reduced ? 0 : PANEL_DURATION * 0.42;
	const revealDuration = reduced ? 0 : 0.42;

	return (
		<motion.div
			className={`pointer-events-none fixed right-1 top-1/2 ${open ? 'z-30' : 'z-10'} flex -translate-y-1/2 flex-row items-start overflow-visible`}
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
				aria-label={t('toggleOpen')}
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
				<Icon icon='mdi:contact' width={26} height={26} style={{ color: ACCENT }} />
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
					aria-label={t('regionLabel')}
					aria-hidden={!open}
					className={cn('flex flex-col rounded-2xl border shadow-xl', CARD_W)}
					style={{ backgroundColor: CARD_BG, borderColor: BORDER }}
				>
					<header className='relative flex gap-3 border-b p-4' style={{ borderColor: BORDER }}>
						<motion.button
							type='button'
							aria-label={t('toggleClose')}
							onClick={() => setOpen(false)}
							className='absolute right-2 top-2 rounded-lg p-1.5'
							style={{ color: ACCENT }}
							whileHover={reduced ? undefined : { opacity: 0.9 }}
							whileTap={reduced ? undefined : { scale: 0.95 }}
						>
							<Icon icon='mdi:close' width={22} height={22} />
						</motion.button>
						<div className='relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#2a2a2b]'>
							<Image src={photoSrc} alt='' fill className='object-cover' sizes='64px' />
						</div>
						<div className='min-w-0 flex flex-col justify-center gap-1.5 pr-9'>
							<p className='truncate text-lg font-semibold text-white'>{fullName}</p>
							<span className='w-fit rounded-full bg-[#2a2a2b] px-2.5 py-0.5 text-xs text-slate-300'>
								{t('roleBadge')}
							</span>
						</div>
					</header>

					<div className='flex flex-col px-4 py-2'>
						{contactRows.map((row: FloatingContactRow, index: number) => (
							<ContactRow
								key={row.kind}
								row={row}
								index={index}
								label={t(`rows.${row.kind}`)}
								accent={ACCENT}
								border={BORDER}
							/>
						))}
					</div>

					<div className='border-t px-4 py-3' style={{ borderColor: BORDER }}>
						<div className='flex flex-wrap gap-3'>
							{socialLinks.map((link: SocialLinkItem) => (
								<motion.a
									key={link.href}
									href={link.href}
									target='_blank'
									rel='noopener noreferrer'
									className='text-slate-500'
									aria-label={t(`social.${link.kind}`)}
									whileHover={reduced ? undefined : { scale: 1.08, color: 'rgb(203 213 225)' }}
								>
									<Icon icon={link.icon} width={22} height={22} />
								</motion.a>
							))}
						</div>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}
