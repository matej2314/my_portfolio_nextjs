'use client';

import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useClickOutside } from '@/hooks/useClickOutside';

import IconButton from '../ui/elements/IconButton';
import ExternalLink from '../links/ExternalLink';

export default function CvSelector({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {

    const cvRef = useRef<HTMLDivElement>(null);

    useClickOutside(cvRef, () => onClose());

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
                    ref={cvRef}
                    variants={selectorVariant}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.7, ease: 'easeInOut', type: 'spring' }}
                    className="relative right-[2rem] top-1 w-[10rem] h-fit flex flex-col items-center gap-3"
                >
                    <ExternalLink
                        href="/cv/CV - Mateusz Śliwowski_en.pdf"
                        download
                    >
                        <IconButton
                            className="w-[5rem] bg-yellow-400 hover:bg-yellow-500 hover:text-slate-950 text-slate-600 font-semibold font-mono text-[0.9rem] flex justify-center items-center">
                            English
                        </IconButton>
                    </ExternalLink>
                    <ExternalLink
                        href="/cv/CV - Mateusz Śliwowski.pdf"
                        download
                    >
                        <IconButton
                            className="w-[5rem] bg-yellow-400 hover:bg-yellow-500 hover:text-slate-950 text-slate-600 font-semibold font-mono text-[0.9rem] flex justify-center items-center">
                            Polish
                        </IconButton>
                    </ExternalLink>
                </motion.div>
            )}
        </AnimatePresence>
    );
}