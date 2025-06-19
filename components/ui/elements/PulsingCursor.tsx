'use client';

import { motion } from 'framer-motion'

export default function PulsingCursor() {

    return (
        <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
        >
            |
        </motion.span>
    )
}