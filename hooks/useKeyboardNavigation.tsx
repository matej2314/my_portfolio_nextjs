'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { sections } from '@/lib/arrays/homePageSectionsArr';
import { useActiveSection } from './useActiveSection';
import { scrollToSection } from '@/lib/utils/keyboard-navigation';

function isSpaceConsumingInteractiveTarget(el: Element | null): boolean {
	if (!el || el === document.body) return false;
	const tag = el.tagName;
	if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || tag === 'BUTTON') return true;
	if (tag === 'A') {
		const a = el as HTMLAnchorElement;
		if (a.href && a.getAttribute('href') !== undefined) return true;
	}
	if (el.getAttribute('contenteditable') === 'true') return true;
	const role = el.getAttribute('role');
	if (
		role === 'button' ||
		role === 'link' ||
		role === 'menuitem' ||
		role === 'menuitemcheckbox' ||
		role === 'menuitemradio' ||
		role === 'option' ||
		role === 'tab' ||
		role === 'switch' ||
		role === 'slider' ||
		role === 'combobox' ||
		role === 'textbox' ||
		role === 'searchbox'
	) {
		return true;
	}
	return false;
}

export function useKeyboardNavigation() {
	const pathname = usePathname();
	const activeSection = useActiveSection(sections);

	useEffect(() => {
		if (pathname !== '/home') return;

		const handleKeyDown = (event: KeyboardEvent) => {
			const activeElement = document.activeElement;
			const isInput = activeElement?.tagName === 'INPUT' || activeElement?.tagName === 'TEXTAREA';
			if (isInput) return;

			const currentIndex = activeSection ? sections.indexOf(activeSection) : 0;

			const key = event.key;

			switch (key) {
				case 'ArrowDown':
				case 'PageDown':
					event.preventDefault();
					scrollToSection(sections[Math.min(currentIndex + 1, sections.length - 1)]);
					break;

				case 'ArrowUp':
				case 'PageUp':
					event.preventDefault();
					scrollToSection(sections[Math.max(currentIndex - 1, 0)]);
					break;

				case '1':
				case '2':
				case '3':
				case '4':
				case '5':
				case '6':
					event.preventDefault();
					const numIndex = parseInt(key, 10) - 1;
					if (numIndex < sections.length) {
						scrollToSection(sections[numIndex]);
					}
					break;
				case ' ':
					if (isSpaceConsumingInteractiveTarget(activeElement)) return;
					event.preventDefault();
					scrollToSection(sections[0]);
					break;
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [pathname, activeSection]);
}
