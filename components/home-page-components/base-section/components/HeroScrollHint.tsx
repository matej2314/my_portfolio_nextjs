'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'motion/react';

import { scrollToSection } from '@/lib/utils/keyboard-navigation';

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

export default function HeroScrollHint() {
	const t = useTranslations('homePage.baseSection');
	const reduced = useReducedMotion();

	return (
		<motion.button
			type='button'
			onClick={() => scrollToSection('aboutSection')}
			aria-label={t('scrollHint')}
			className='absolute bottom-8 right-5 z-[2] hidden flex-col items-center gap-3 text-ink-3 xl:flex'
			initial={reduced ? false : { opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={reduced ? { duration: 0 } : { delay: 0.9, duration: 0.6, ease: EASE_EXPO }}
		>
			<span className='font-mono text-[0.625rem] uppercase tracking-[0.22em]'>{t('scrollHint')}</span>
			<span className='relative h-10 w-px overflow-hidden bg-line'>
				<span className='hero-scroll-line absolute inset-x-0 top-0 h-full bg-brand' />
			</span>
		</motion.button>
	);
}
