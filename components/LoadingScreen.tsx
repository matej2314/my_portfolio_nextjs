'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {

    return (
        <AnimatePresence>
            <motion.div
                key="loading-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 pointer-events-none"
            >
                <motion.svg
                    width="110"
                    height="130"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                    initial={{ fill: '#4ade80' }}
                    animate={{
                        fill: ['#38a169', '#facc15', '#38a169'],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <rect x="0" y="0" width="10" height="65" />
                    <rect
                        x="0"
                        y="0"
                        width="10"
                        height="65"
                        transform="translate(-20, -42) rotate(135 20 60)"
                    />
                    <rect
                        x="0"
                        y="0"
                        width="10"
                        height="65"
                        transform="translate(30, 25) rotate(45 60 60)"
                    />
                    <rect x="90" y="0" width="10" height="65" />
                </motion.svg>
            </motion.div>
        </AnimatePresence>
    );
}
