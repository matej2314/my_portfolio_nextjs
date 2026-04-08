/**
 * Scrolls to a page section and moves keyboard / screen reader focus to it (WCAG 2.4.3).
 * The target must accept focus — use tabIndex={-1} on the corresponding <section>.
 */
export const scrollToSection = (sectionId: string) => {
	const el = document.getElementById(sectionId);
	if (!el) return;

	const prefersReducedMotion =
		typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	el.scrollIntoView({ behavior: prefersReducedMotion ? 'instant' : 'smooth', block: 'start' });

	const focusTarget = () => {
		el.focus({ preventScroll: true });
	};

	if (prefersReducedMotion) {
		queueMicrotask(focusTarget);
		return;
	}

	// After smooth scroll, avoid a second scroll jump from .focus()
	window.setTimeout(focusTarget, 320);
};
