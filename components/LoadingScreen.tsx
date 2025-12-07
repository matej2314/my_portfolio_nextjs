'use client';

import { motion, AnimatePresence } from 'motion/react';

import MLetter from './ui/elements/MLetterElement';

export default function LoadingScreen() {
	return (
		<AnimatePresence>
			<motion.div key='loading-screen' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 pointer-events-none'>
				<MLetter mode='animated' size={110} />
			</motion.div>
		</AnimatePresence>
	);
}
