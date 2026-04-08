'use client';

import { motion, AnimatePresence, easeInOut, spring } from 'motion/react';

const cvLinkClass =
	'flex h-auto min-h-0 w-full min-w-[5rem] items-center justify-center rounded-md border border-transparent bg-yellow-300 px-3 py-0 font-jakarta text-[0.9rem] font-semibold text-slate-800 outline-none ring-0 ring-offset-0 transition-[border-color] hover:border-[#ffdb70] focus-visible:border-[#ffdb70] focus-visible:outline-none focus-visible:ring-0';

export default function CvSelector({ isOpen, cvLinksAsMenuItems }: { isOpen: boolean; cvLinksAsMenuItems?: boolean }) {
	const selectorVariant = {
		initial: { opacity: 0, y: -10 },
		animate: { opacity: 1, y: 1 },
		exit: {
			opacity: 0,
			y: -10,
			transition: {
				duration: 1,
				ease: easeInOut,
				type: spring,
			},
		},
	};

	return (
		<AnimatePresence initial={true}>
			{isOpen ? (
				<motion.div
					key="cv-selector"
					variants={selectorVariant}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{ duration: 0.7, ease: easeInOut, type: spring }}
					className="flex h-fit w-fit flex-col items-stretch gap-3 px-[1.2rem] py-[0.4rem]"
					role={cvLinksAsMenuItems ? 'none' : 'group'}
					aria-label={cvLinksAsMenuItems ? undefined : 'CV language'}
				>
					<a
						href="/cv/CV - Mateusz Śliwowski_en.pdf"
						download
						className={cvLinkClass}
						aria-label="Download English CV"
						role={cvLinksAsMenuItems ? 'menuitem' : undefined}
					>
						English
					</a>
					<a
						href="/cv/CV - Mateusz Śliwowski.pdf"
						download
						className={cvLinkClass}
						aria-label="Download Polish CV"
						role={cvLinksAsMenuItems ? 'menuitem' : undefined}
					>
						Polish
					</a>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
}
