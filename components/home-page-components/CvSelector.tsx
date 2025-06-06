'use client';

import { motion, AnimatePresence } from 'framer-motion';

import IconButton from '../IconButton';

export default function CvSelector({ isOpen }: { isOpen: boolean }) {

    const selectorVariant = {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 1 },
        exit: {
            opacity: 0, y: -10, transition: {
                duration: 1,
                ease: 'easeInOut',
                type: 'spring'
            },
        },
    };

    return (
        <AnimatePresence initial={true}>
            {isOpen && (
                <motion.div
                    key="cv-selector"
                    variants={selectorVariant}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.7, ease: 'easeInOut', type: 'spring' }}
                    className="relative right-[2rem] top-1 w-[10rem] h-fit flex flex-col items-center gap-3"
                >
                    <a href="/cv/CV - Mateusz Śliwowski_en.pdf" download>
                        <IconButton className="w-[5rem] bg-yellow-400 hover:bg-yellow-500 hover:text-slate-950 text-slate-600 font-semibold text-[0.9rem] flex justify-center items-center">
                            English
                        </IconButton>
                    </a>
                    <a href="/cv/CV - Mateusz Śliwowski.pdf" download>
                        <IconButton className="w-[5rem] bg-yellow-400 hover:bg-yellow-500 hover:text-slate-950 text-slate-600 font-semibold text-[0.9rem] flex justify-center items-center">
                            Polish
                        </IconButton>
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    );
}