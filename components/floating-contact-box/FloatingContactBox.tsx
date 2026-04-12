'use client';

import { Icon } from '@iconify/react';
import Image from 'next/image';
import { motion } from 'motion/react';

import ContactRow from './ContactRow';
import FloatingContactSocialLinks from './FloatingContactSocialLinks';

import { useFloatingContactBox } from '@/hooks/useFloatingContactBox';

import { cn } from '@/lib/utils/utils';
import { contactRowLiClass } from '@/lib/utils/contactRowLiClass';

import { type FloatingContactRow } from '@/types/floatingContactTypes';


export default function FloatingContactBox() {

	const { open, stackAboveChat, openContactBox, closeContactBox, onContactLauncherAnimationComplete, contactBoxPanelTransition, reduced, regionId, photoSrc, fullName, contactRows, socialLinks, ACCENT, CARD_BG, BORDER, CONTACT_BOX_WIDTH, tuckAfterOpen, tuckDuration, revealAfterClose, revealDuration, ENTER_DURATION_CONTACT_BOX, SHOW_DELAY_CONTACT_BOX, t } = useFloatingContactBox();

	return (
		<motion.div className={`pointer-events-none fixed right-1 top-1/2 ${stackAboveChat ? 'z-30' : 'z-10'} flex -translate-y-1/2 flex-row items-start overflow-visible`} style={{ gap: open ? 0 : 8 }} initial={reduced ? false : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={reduced ? { duration: 0 } : { delay: SHOW_DELAY_CONTACT_BOX, duration: ENTER_DURATION_CONTACT_BOX, ease: [0.22, 1, 0.36, 1] }}>
			<motion.div aria-hidden className='shrink-0' initial={false} animate={{ width: open ? 0 : 56 }} transition={contactBoxPanelTransition} />
			<motion.button
				type='button'
				aria-expanded={open}
				aria-controls={regionId}
				aria-label={t('toggleOpen')}
				aria-hidden={open}
				tabIndex={open ? -1 : 0}
				onClick={openContactBox}
				className={cn(
					'pointer-events-auto absolute left-0 top-1/2 z-[5] flex size-14 cursor-pointer items-center justify-center rounded-full border-2 border-solid shadow-lg',
					'outline-none ring-0 ring-offset-0 transition-[border-color] duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]',
					'hover:!border-[#ffdb70] focus:!border-[#ffdb70] focus-visible:!border-[#ffdb70]',
					'focus:outline-none focus-visible:outline-none focus-visible:ring-0',
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
				transition={reduced ? { duration: 0 } : open ? { delay: tuckAfterOpen, duration: tuckDuration, ease: [0.4, 0, 0.2, 1] } : { delay: revealAfterClose, duration: revealDuration, ease: [0.22, 1, 0.36, 1] }}
				onAnimationComplete={onContactLauncherAnimationComplete}
				whileHover={reduced || open ? undefined : { opacity: 1 }}
				whileTap={reduced || open ? undefined : { scale: 0.96 }}
			>
				<Icon icon='mdi:contact' width={26} height={26} style={{ color: ACCENT }} />
			</motion.button>

			<motion.div className={cn('relative z-10 overflow-hidden', open ? 'pointer-events-auto' : 'pointer-events-none')} initial={false} animate={{ width: open ? 'auto' : 0 }} transition={contactBoxPanelTransition}>
				<div id={regionId} role='region' aria-label={t('regionLabel')} aria-hidden={!open} className={cn('flex flex-col rounded-2xl border shadow-xl', CONTACT_BOX_WIDTH)} style={{ backgroundColor: CARD_BG, borderColor: BORDER }}>
					<header className='group relative flex gap-3 border-b p-4' style={{ borderColor: BORDER }}>
						<motion.button
							type='button'
							aria-label={t('toggleClose')}
							onClick={closeContactBox}
							className='absolute right-2 top-2 rounded-lg border border-transparent p-1.5 outline-none ring-0 ring-offset-0 focus-visible:border-[#ffdb70] focus-visible:outline-none focus-visible:ring-0'
							style={{ color: ACCENT }}
							whileHover={reduced ? undefined : { opacity: 0.9 }}
							whileTap={reduced ? undefined : { scale: 0.95 }}
						>
							<Icon icon='mdi:close' width={22} height={22} aria-hidden />
						</motion.button>
						<div className='relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#2a2a2b]'>
							<Image src={photoSrc} alt='Zdjęcie profilowe - Mateusz Śliwowski' fill className='object-cover' sizes='64px' />
						</div>
						<h2 className='min-w-0 flex flex-col justify-center gap-1.5 pr-9'>
							<span className='truncate text-lg font-semibold text-white transition-colors group-focus-within:text-slate-200'>{fullName}</span>
							<span className='w-fit rounded-full bg-[#2a2a2b] px-2.5 py-0.5 text-xs text-slate-300 transition-colors group-focus-within:text-slate-400'>
								{t('roleBadge')}
							</span>
						</h2>
					</header>

					<ul className='m-0 flex list-none flex-col px-4 py-2' aria-label={t('contactRowsListLabel')}>
						{contactRows.map((row: FloatingContactRow, index: number) => (
							<li key={row.kind} className={contactRowLiClass(Boolean(row.href))} style={{ borderBottomColor: BORDER }}>
								<ContactRow row={row} index={index} label={t(`rows.${row.kind}`)} accent={ACCENT} />
							</li>
						))}
					</ul>

					<FloatingContactSocialLinks links={socialLinks} borderColor={BORDER} ariaLabel={kind => t(`social.${kind}`)} reducedMotion={reduced} />
				</div>
			</motion.div>
		</motion.div>
	);
}
