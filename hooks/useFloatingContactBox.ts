import { useState, useId, useEffect } from 'react'
import { useTranslations } from 'next-intl';
import { useReducedMotion } from 'motion/react';
import { defaultData } from '@/lib/defaultData';

export const useFloatingContactBox = () => {
    const t = useTranslations('homePage.floatingContact');
	const reduced = useReducedMotion();
	const [open, setOpen] = useState(false);
	const regionId = useId();
	const { photoSrc, fullName, contactRows, socialLinks, config } = defaultData.floatingBoxesData;

    const {accent: ACCENT, cardBg: CARD_BG, border: BORDER, contactBoxWidth: CONTACT_BOX_WIDTH, enterDurationBox: ENTER_DURATION_CONTACT_BOX, showDelayContactBox: SHOW_DELAY_CONTACT_BOX, calcPanelDuration, calcRevealDuration, calcTuckDuration} = config;

	const PANEL_DURATION = calcPanelDuration(reduced ?? false);
	const contactBoxPanelTransition = reduced ? { duration: 0 } : { duration: PANEL_DURATION, ease: 'easeInOut' as const };

	const tuckAfterOpen = reduced ? 0 : PANEL_DURATION * 0.55;
	const tuckDuration = calcTuckDuration(reduced ?? false);
	const revealAfterClose = reduced ? 0 : PANEL_DURATION * 0.42;
	const revealDuration = calcRevealDuration(reduced ?? false);

	useEffect(() => {
		if (!open) return;
		const panel = document.getElementById(regionId);
		if (!panel) return;
		const first = panel.querySelector<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
		requestAnimationFrame(() => first?.focus());
    }, [open, regionId]);
    
    return {
        open,
        setOpen,
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
    }
}