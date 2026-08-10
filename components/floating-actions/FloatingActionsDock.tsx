'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';

import { useFloatingPanels } from '@/context/FloatingPanelsContext';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useDeviceType } from '@/hooks/useDeviceType';
import { sections } from '@/lib/arrays/homePageSectionsArr';
import { scrollToSection } from '@/lib/utils/keyboard-navigation';
import { cn } from '@/lib/utils/utils';

const EASE_SPRING = [0.32, 0.72, 0, 1] as const;

type FanAction = {
	id: 'contact' | 'chat' | 'top';
	icon: string;
	labelKey: string;
	onClick: () => void;
};

const actionBtnClass = cn(
	'pointer-events-auto flex size-11 items-center justify-center rounded-full',
	'border border-line bg-surface-2 text-brand shadow-ambient',
	'transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
	'hover:border-brand-line hover:bg-brand-tint focus-visible:outline-none',
	'focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0',
);

export default function FloatingActionsDock({ showChat = true }: { showChat?: boolean }) {
	const t = useTranslations('common.a11y');
	const tContact = useTranslations('homePage.floatingContact');
	const tChat = useTranslations('homePage.floatingChat');
	const panels = useFloatingPanels();
	const reduced = useReducedMotion();
	const device = useDeviceType();
	const isDesktop = device === 'desktop';
	const [fanOpen, setFanOpen] = useState(false);
	const activeSection = useActiveSection(sections);
	const showTop = activeSection !== null && activeSection !== 'baseSection';

	useEffect(() => {
		if (!panels) return;
		if (panels.active !== 'none') setFanOpen(false);
	}, [panels, panels?.active]);

	if (!panels) return null;

	const goTop = () => {
		scrollToSection('baseSection');
		setFanOpen(false);
	};

	const actions: FanAction[] = [
		{
			id: 'contact',
			icon: 'ph:user-light',
			labelKey: tContact('toggleOpen'),
			onClick: () => {
				panels.openContact();
				setFanOpen(false);
			},
		},
		...(showChat
			? [
					{
						id: 'chat' as const,
						icon: 'ph:robot-light',
						labelKey: tChat('toggleOpen'),
						onClick: () => {
							panels.openChat();
							setFanOpen(false);
						},
					},
				]
			: []),
		// Mobile / tablet: keep back-to-top inside the fan
		...(!isDesktop && showTop
			? [
					{
						id: 'top' as const,
						icon: 'ph:arrow-up-light',
						labelKey: t('backToTop'),
						onClick: goTop,
					},
				]
			: []),
	];

	const visibleActions = fanOpen ? actions : [];

	return (
		<div
			className={cn(
				'pointer-events-none fixed z-40 flex flex-col-reverse items-end gap-3',
				'bottom-[max(1.5rem,calc(env(safe-area-inset-bottom)+1rem))] right-[max(1.5rem,calc(env(safe-area-inset-right)+1rem))]',
				'max-md:bottom-[max(1rem,calc(env(safe-area-inset-bottom)+0.75rem))] max-md:right-[max(1rem,calc(env(safe-area-inset-right)+0.75rem))]',
			)}
		>
			{/* Bottom row: desktop back-to-top sits beside the fan launcher */}
			<div className='pointer-events-none flex items-center gap-3'>
				<AnimatePresence>
					{isDesktop && showTop ? (
						<motion.button
							key='back-to-top'
							type='button'
							aria-label={t('backToTop')}
							title={t('backToTop')}
							onClick={goTop}
							className={cn(actionBtnClass, 'size-12 bg-surface-1/90 backdrop-blur-xl')}
							initial={reduced ? false : { opacity: 0, x: 10, scale: 0.9 }}
							animate={{ opacity: 1, x: 0, scale: 1 }}
							exit={reduced ? undefined : { opacity: 0, x: 8, scale: 0.92 }}
							transition={reduced ? { duration: 0 } : { duration: 0.35, ease: EASE_SPRING }}
							whileTap={reduced ? undefined : { scale: 0.96 }}
						>
							<Icon icon='ph:arrow-up-light' width={20} height={20} aria-hidden />
						</motion.button>
					) : null}
				</AnimatePresence>

				<motion.button
					type='button'
					aria-expanded={fanOpen}
					aria-label={fanOpen ? t('closeActions') : t('openActions')}
					onClick={() => setFanOpen(open => !open)}
					className={cn(
						'pointer-events-auto relative flex size-12 items-center justify-center rounded-full',
						'border border-line bg-surface-1/90 text-brand shadow-ambient backdrop-blur-xl',
						'transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
						'hover:border-brand-line hover:bg-brand-tint focus-visible:outline-none',
						'focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0',
						'active:scale-[0.98]',
					)}
					whileTap={reduced ? undefined : { scale: 0.96 }}
				>
					<span className='relative block size-5' aria-hidden>
						<span
							className={cn(
								'absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
								fanOpen ? 'rotate-45' : '-translate-y-[5px]',
							)}
						/>
						<span
							className={cn(
								'absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-opacity duration-300',
								fanOpen ? 'opacity-0' : 'opacity-100',
							)}
						/>
						<span
							className={cn(
								'absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
								fanOpen ? '-rotate-45' : 'translate-y-[5px]',
							)}
						/>
					</span>
				</motion.button>
			</div>

			<AnimatePresence>
				{visibleActions.map((action, index) => (
					<motion.button
						key={action.id}
						type='button'
						aria-label={action.labelKey}
						title={action.labelKey}
						onClick={action.onClick}
						className={actionBtnClass}
						initial={reduced ? false : { opacity: 0, y: 12, scale: 0.85 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={reduced ? undefined : { opacity: 0, y: 8, scale: 0.9 }}
						transition={
							reduced
								? { duration: 0 }
								: { delay: index * 0.045, duration: 0.35, ease: EASE_SPRING }
						}
					>
						<Icon icon={action.icon} width={20} height={20} aria-hidden />
					</motion.button>
				))}
			</AnimatePresence>
		</div>
	);
}
