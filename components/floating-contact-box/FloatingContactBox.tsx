'use client';

import { Icon } from '@iconify/react';
import Image from 'next/image';
import { motion } from 'motion/react';

import ContactRow from './ContactRow';
import FloatingContactSocialLinks from './FloatingContactSocialLinks';
import FloatingBoxHeader from '@/components/ui/elements/floating-boxes/FloatingBoxHeader';
import FloatingBoxLayout from '@/components/ui/elements/floating-boxes/FloatingBoxLayout';

import { useFloatingContactBox } from '@/hooks/useFloatingContactBox';
import { useFloatingPanels } from '@/context/FloatingPanelsContext';

import { contactRowLiClass } from '@/lib/utils/contactRowLiClass';

import { type FloatingContactRow } from '@/types/floatingContactTypes';

export default function FloatingContactBox() {
	const panels = useFloatingPanels();
	const hideLauncher = Boolean(panels);
	const {
		open: internalOpen,
		stackAboveChat,
		openContactBox,
		closeContactBox,
		onContactLauncherAnimationComplete,
		contactBoxPanelTransition,
		reduced,
		regionId,
		photoSrc,
		fullName,
		contactRows,
		socialLinks,
		ACCENT,
		CARD_BG,
		BORDER,
		CONTACT_BOX_WIDTH,
		tuckAfterOpen,
		tuckDuration,
		revealAfterClose,
		revealDuration,
		ENTER_DURATION_CONTACT_BOX,
		SHOW_DELAY_CONTACT_BOX,
		t,
	} = useFloatingContactBox({
		controlledOpen: panels?.isContactOpen,
		onOpenChange: open => {
			if (!panels) return;
			if (open) panels.openContact();
			else panels.close();
		},
	});

	const open = panels ? panels.isContactOpen : internalOpen;
	const openBox = panels ? panels.openContact : openContactBox;
	const closeBox = panels ? panels.close : closeContactBox;

	return (
		<FloatingBoxLayout
			open={open}
			reduced={reduced}
			regionId={regionId}
			hideLauncher={hideLauncher}
			rootOverlayClassName={
				hideLauncher
					? ''
					: `max-md:bottom-[max(5.5rem,calc(env(safe-area-inset-bottom)+5rem))] max-md:top-auto md:top-1/2 ${stackAboveChat ? 'z-30' : 'z-10'}`
			}
			enterDelay={SHOW_DELAY_CONTACT_BOX}
			enterDuration={ENTER_DURATION_CONTACT_BOX}
			panelTransition={contactBoxPanelTransition}
			onOpenLauncher={openBox}
			launcherTranslationKey={`${open ? 'homePage.floatingContact.toggleClose' : 'homePage.floatingContact.toggleOpen'}`}
			launcherIconName='ph:user-light'
			launcherStyle={{ CARD_BG, BORDER, ACCENT, tuckAfterOpen, tuckDuration, revealAfterClose, revealDuration }}
			onLauncherAnimationComplete={onContactLauncherAnimationComplete}
			cardClassName={CONTACT_BOX_WIDTH}
			regionAriaLabel={t('regionLabel')}
			cardBackgroundColor={CARD_BG}
			cardBorderColor={BORDER}
		>
			<FloatingBoxHeader className='group relative flex gap-3 border-b p-4' style={{ borderColor: BORDER }}>
				<motion.button
					type='button'
					aria-label={t('toggleClose')}
					onClick={closeBox}
					className='absolute right-2 top-2 rounded-lg border border-transparent p-1.5 outline-none ring-0 ring-offset-0 focus-visible:border-brand focus-visible:outline-none focus-visible:ring-0'
					style={{ color: ACCENT }}
					whileHover={reduced ? undefined : { opacity: 0.9 }}
					whileTap={reduced ? undefined : { scale: 0.95 }}
				>
					<Icon icon='ph:x-light' width={22} height={22} aria-hidden />
				</motion.button>
				<div className='relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#2a2a2b]'>
					<Image src={photoSrc} alt='Zdjęcie profilowe - Mateusz Śliwowski' fill className='object-cover' sizes='64px' />
				</div>
				<h2 className='flex min-w-0 flex-col justify-center gap-1.5 pr-9'>
					<span className='truncate text-lg font-semibold text-white transition-colors group-focus-within:text-slate-200'>{fullName}</span>
					<span className='w-fit rounded-full bg-[#2a2a2b] px-2.5 py-0.5 text-xs text-slate-300 transition-colors group-focus-within:text-slate-400'>
						{t('roleBadge')}
					</span>
				</h2>
			</FloatingBoxHeader>
			<ul className='m-0 flex list-none flex-col px-4 py-2' aria-label={t('contactRowsListLabel')}>
				{contactRows.map((row: FloatingContactRow, index: number) => (
					<li key={row.kind} className={contactRowLiClass(Boolean(row.href))} style={{ borderBottomColor: BORDER }}>
						<ContactRow row={row} index={index} label={t(`rows.${row.kind}`)} accent={ACCENT} />
					</li>
				))}
			</ul>

			<FloatingContactSocialLinks links={socialLinks} borderColor={BORDER} ariaLabel={kind => t(`social.${kind}`)} reducedMotion={reduced} />
		</FloatingBoxLayout>
	);
}
