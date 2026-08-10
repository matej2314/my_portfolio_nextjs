'use client';

import { motion, AnimatePresence } from 'motion/react';

import { trackClientEvent } from '@/lib/metrics/trackClientEvent';
import { getCvHref } from '@/lib/utils/getCvHref';
import { EASE_EXPO, EASE_SPRING } from '@/lib/motion/variants';

const cvLinkClass =
	'flex h-auto min-h-0 w-full min-w-[5rem] items-center justify-center rounded-full bg-brand px-4 py-2 font-sans text-[0.9rem] font-medium text-surface-0 transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-brand-bright active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0';

export default function CvSelector({ isOpen, cvLinksAsMenuItems }: { isOpen: boolean; cvLinksAsMenuItems?: boolean }) {
	const { cvHref: plCvHref } = getCvHref('pl');
	const { cvHref: enCvHref } = getCvHref('en');

	const selectorVariant = {
		initial: { opacity: 0, y: -10 },
		animate: { opacity: 1, y: 1 },
		exit: {
			opacity: 0,
			y: -10,
			transition: {
				duration: 0.45,
				ease: EASE_EXPO,
			},
		},
	};

	return (
		<AnimatePresence initial={true}>
			{isOpen ? (
				<motion.div
					key='cv-selector'
					variants={selectorVariant}
					initial='initial'
					animate='animate'
					exit='exit'
					transition={{ duration: 0.45, ease: EASE_SPRING }}
					className='flex h-fit w-fit flex-col items-stretch gap-3 px-[1.2rem] py-[0.4rem]'
					role={cvLinksAsMenuItems ? 'none' : 'group'}
					aria-label={cvLinksAsMenuItems ? undefined : 'CV language'}
				>
					<a
						href={enCvHref}
						download
						onClick={() => trackClientEvent({ type: 'cv_download', locale: 'en' })}
						className={cvLinkClass}
						aria-label='Download English CV'
						role={cvLinksAsMenuItems ? 'menuitem' : undefined}
					>
						English
					</a>
					<a
						href={plCvHref}
						download
						onClick={() => trackClientEvent({ type: 'cv_download', locale: 'pl' })}
						className={cvLinkClass}
						aria-label='Download Polish CV'
						role={cvLinksAsMenuItems ? 'menuitem' : undefined}
					>
						Polish
					</a>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
}
