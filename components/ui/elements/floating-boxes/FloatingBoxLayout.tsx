'use client';

import { motion, type Transition } from 'motion/react';
import { type ReactNode } from 'react';

import OpenFloatingBoxBtn from '@/components/ui/elements/floating-boxes/OpenFloatingBoxBtn';
import { cn } from '@/lib/utils/utils';

export interface FloatingBoxLauncherStyle {
	CARD_BG: string;
	BORDER: string;
	ACCENT: string;
	tuckAfterOpen: number;
	tuckDuration: number;
	revealAfterClose: number;
	revealDuration: number;
}

export interface FloatingBoxLauncherAriaAttributes {
	expanded?: boolean;
	controls?: string;
	label?: string;
	hidden?: boolean;
	tabIndex?: number;
}

export interface FloatingBoxLayoutProps {
	open: boolean;
	reduced: boolean | null;
	regionId: string;
	rootOverlayClassName: string;
	enterDelay: number;
	enterDuration: number;
	panelTransition: Transition;
	onOpenLauncher: () => void;
	launcherTranslationKey: string;
	launcherIconName: string;
	launcherStyle: FloatingBoxLauncherStyle;
	onLauncherAnimationComplete?: () => void;
	launcherAriaAttributes?: FloatingBoxLauncherAriaAttributes;
	panelClassName?: string;
	cardClassName: string;
	regionAriaLabel: string;
	cardBackgroundColor: string;
	cardBorderColor: string;
	children: ReactNode;
}

const OUTER_ENTER_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function FloatingBoxLayout({
	open,
	reduced,
	regionId,
	rootOverlayClassName,
	enterDelay,
	enterDuration,
	panelTransition,
	onOpenLauncher,
	launcherTranslationKey,
	launcherIconName,
	launcherStyle,
	onLauncherAnimationComplete,
	launcherAriaAttributes,
	panelClassName,
	cardClassName,
	regionAriaLabel,
	cardBackgroundColor,
	cardBorderColor,
	children,
}: FloatingBoxLayoutProps) {
	return (
		<motion.div
			className={cn('pointer-events-none fixed right-1 flex -translate-y-1/2 flex-row items-start overflow-visible', rootOverlayClassName)}
			style={{ gap: open ? 0 : 8 }}
			initial={reduced ? false : { opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={reduced ? { duration: 0 } : { delay: enterDelay, duration: enterDuration, ease: OUTER_ENTER_EASE }}
		>
			<motion.div aria-hidden className='shrink-0' initial={false} animate={{ width: open ? 0 : 56 }} transition={panelTransition} />
			<OpenFloatingBoxBtn
				open={open}
				regionId={regionId}
				openFloatingBox={onOpenLauncher}
				reduced={reduced}
				translationKey={launcherTranslationKey}
				style={launcherStyle}
				iconName={launcherIconName}
				onLauncherAnimationComplete={onLauncherAnimationComplete}
				ariaAttributes={launcherAriaAttributes}
			/>
			<motion.div
				className={cn('relative z-10 overflow-hidden', open ? 'pointer-events-auto' : 'pointer-events-none', panelClassName)}
				initial={false}
				animate={{ width: open ? 'auto' : 0 }}
				transition={panelTransition}
			>
				<div
					id={regionId}
					role='region'
					aria-label={regionAriaLabel}
					aria-hidden={!open}
					className={cn('flex flex-col rounded-2xl border shadow-xl', cardClassName)}
					style={{ backgroundColor: cardBackgroundColor, borderColor: cardBorderColor }}
				>
					{children}
				</div>
			</motion.div>
		</motion.div>
	);
}
