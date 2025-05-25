'use client';

import { motion } from 'framer-motion';

import { ReactNode } from 'react';

interface ExternalLinkType {
    href: string;
    className: string;
    children: ReactNode;
    initialColor: string;
    hoverColor: string;
    targetColor: string
}

export default function ExternalLink({ href, className, initialColor, hoverColor, targetColor, children }: ExternalLinkType) {

    return (
        <motion.a
            initial={{ color: initialColor }}
            whileHover={{ color: hoverColor }}
            exit={{ color: targetColor }}
            transition={{ duration: 0.4, ease: 'easeIn' }}
            href={href}
            className={className}
        >
            {children}
        </motion.a>
    )
}