'use client';
import { Icon } from '@iconify/react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils/utils';
import { useTranslations } from 'next-intl';

interface OpenFloatingBoxBtnStyle {
	CARD_BG: string;
	BORDER: string;
	ACCENT: string;
	tuckAfterOpen: number;
	tuckDuration: number;
	revealAfterClose: number;
	revealDuration: number;
}

interface AriaAttributes {
	expanded?: boolean;
	controls?: string;
	label?: string;
	hidden?: boolean;
	tabIndex?: number;
}

interface OpenFloatingBocBtnProps {
	open: boolean;
	regionId: string;
	openFloatingBox: () => void;
	reduced: boolean | null;
	translationKey: string;
	style: OpenFloatingBoxBtnStyle;
	iconName: string;
	onLauncherAnimationComplete?: () => void;
	ariaAttributes?: AriaAttributes;
}

export default function OpenFloatingBoxBtn({ open, regionId, openFloatingBox, reduced, translationKey, style, iconName, onLauncherAnimationComplete, ariaAttributes }: OpenFloatingBocBtnProps) {
	const t = useTranslations();
	return (
		<motion.button
			type='button'
			aria-expanded={ariaAttributes?.expanded ?? open}
			aria-controls={regionId}
			aria-label={t(translationKey)}
			aria-hidden={open}
			tabIndex={open ? -1 : 0}
			onClick={openFloatingBox}
			title={t(translationKey)}
			className={cn('pointer-events-auto absolute left-0 top-1/2 z-[5] flex size-14 cursor-pointer items-center justify-center rounded-full border-2 border-solid shadow-lg', 'outline-none ring-0 ring-offset-0 transition-[border-color] duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]', 'hover:!border-[#ffdb70] focus:!border-[#ffdb70] focus-visible:!border-[#ffdb70]', 'focus:outline-none focus-visible:outline-none focus-visible:ring-0', open && 'pointer-events-none')}
			style={{
				backgroundColor: style.CARD_BG,
				borderColor: style.BORDER,
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
			transition={reduced ? { duration: 0 } : open ? { delay: style.tuckAfterOpen, duration: style.tuckDuration, ease: [0.4, 0, 0.2, 1] } : { delay: style.revealAfterClose, duration: style.revealDuration, ease: [0.22, 1, 0.36, 1] }}
			onAnimationComplete={onLauncherAnimationComplete}
			whileHover={reduced || open ? undefined : { opacity: 1 }}
			whileTap={reduced || open ? undefined : { scale: 0.96 }}
		>
			<Icon icon={iconName} width={26} height={26} style={{ color: style.ACCENT }} />
		</motion.button>
	);
}
