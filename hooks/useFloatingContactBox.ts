import { useState, useId, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from 'motion/react';
import { defaultData } from '@/lib/defaultData';

type Options = {
	controlledOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
};

export const useFloatingContactBox = (options?: Options) => {
	const t = useTranslations('homePage.floatingContact');
	const reduced = useReducedMotion();
	const [internalOpen, setInternalOpen] = useState(false);
	const isControlled = options?.controlledOpen !== undefined;
	const open = isControlled ? Boolean(options?.controlledOpen) : internalOpen;
	const openRef = useRef(open);
	openRef.current = open;

	const setOpen = useCallback(
		(next: boolean) => {
			if (!isControlled) setInternalOpen(next);
			options?.onOpenChange?.(next);
		},
		[isControlled, options],
	);

	const [elevateStackUntilCloseDone, setElevateStackUntilCloseDone] = useState(false);
	const stackAboveChat = open || elevateStackUntilCloseDone;

	const openContactBox = useCallback(() => {
		setElevateStackUntilCloseDone(false);
		setOpen(true);
	}, [setOpen]);

	const closeContactBox = useCallback(() => {
		setElevateStackUntilCloseDone(true);
		setOpen(false);
	}, [setOpen]);

	const onContactLauncherAnimationComplete = useCallback(() => {
		if (openRef.current) return;
		setElevateStackUntilCloseDone(false);
	}, []);

	const regionId = useId();
	const { photoSrc, fullName, contactRows, socialLinks, config } = defaultData.floatingBoxesData;

	const {
		accent: ACCENT,
		cardBg: CARD_BG,
		border: BORDER,
		contactBoxWidth: CONTACT_BOX_WIDTH,
		enterDurationBox: ENTER_DURATION_CONTACT_BOX,
		showDelayContactBox: SHOW_DELAY_CONTACT_BOX,
		calcPanelDuration,
		calcRevealDuration,
		calcTuckDuration,
	} = config;

	const PANEL_DURATION = calcPanelDuration(reduced ?? false);
	const contactBoxPanelTransition = reduced ? { duration: 0 } : { duration: PANEL_DURATION, ease: [0.16, 1, 0.3, 1] as const };

	const tuckAfterOpen = reduced ? 0 : PANEL_DURATION * 0.55;
	const tuckDuration = calcTuckDuration(reduced ?? false);
	const revealAfterClose = reduced ? 0 : PANEL_DURATION * 0.42;
	const revealDuration = calcRevealDuration(reduced ?? false);

	useEffect(() => {
		if (!open) return;
		const panel = document.getElementById(regionId);
		if (!panel) return;
		const first = panel.querySelector<HTMLElement>(
			'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
		);
		requestAnimationFrame(() => first?.focus());
	}, [open, regionId]);

	return {
		open,
		setOpen,
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
	};
};
