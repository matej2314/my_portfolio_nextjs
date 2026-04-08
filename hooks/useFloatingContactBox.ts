import { useState, useId, useEffect } from 'react'
import { useTranslations } from 'next-intl';
import { useReducedMotion } from 'motion/react';
import { defaultData } from '@/lib/defaultData';

export const useFloatingContactBox = () => {
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
        panelTransition,
        reduced,
        regionId,
        photoSrc,
        fullName,
        contactRows,
        socialLinks,
        ACCENT,
        CARD_BG,
        BORDER,
        CARD_W,
        tuckAfterOpen,
        tuckDuration,
        revealAfterClose,
        revealDuration,
        t,
    }
}