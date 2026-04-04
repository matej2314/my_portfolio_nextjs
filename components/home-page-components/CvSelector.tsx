'use client';

import { motion, AnimatePresence, easeInOut, spring } from 'motion/react';

import IconButton from '../ui/elements/IconButton';
import ExternalLink from '../links/ExternalLink';

export default function CvSelector({ isOpen }: { isOpen: boolean }) {
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
			{isOpen && (
				<motion.div
					key='cv-selector'
					variants={selectorVariant}
					initial='initial'
					animate='animate'
					exit='exit'
					transition={{ duration: 0.7, ease: easeInOut, type: spring }}
					className='flex h-fit w-fit flex-col items-stretch gap-3 py-[0.4rem] px-[1.2rem]'
				>
					<ExternalLink href='/cv/CV - Mateusz Śliwowski_en.pdf' aria-label='Download English CV' download className='block w-full min-w-[5rem]'>
						<IconButton className='h-auto min-h-0 w-full justify-center bg-yellow-300 px-3 py-0 font-jakarta text-[0.9rem] font-semibold text-slate-800 hover:bg-yellow-400 hover:text-slate-950 rounded-md'>
							English
						</IconButton>
					</ExternalLink>
					<ExternalLink href='/cv/CV - Mateusz Śliwowski.pdf' aria-label='Download Polish CV' download className='block w-full min-w-[5rem]'>
						<IconButton className='h-auto min-h-0 w-full justify-center bg-yellow-300 px-3 py-0 font-jakarta text-[0.9rem] font-semibold text-slate-800 hover:bg-yellow-400 hover:text-slate-950 rounded-md'>
							Polish
						</IconButton>
					</ExternalLink>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
