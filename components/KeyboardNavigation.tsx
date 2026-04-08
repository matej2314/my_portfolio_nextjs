'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

export default function KeyboardNavigation() {
	useKeyboardNavigation();
	const pathname = usePathname();
	const t = useTranslations('homePage.keyboardNavigation');

	if (pathname !== '/home') {
		return null;
	}

	return (
		<p id="home-keyboard-sections-hint" className="sr-only">
			{t('hint')}
		</p>
	);
}