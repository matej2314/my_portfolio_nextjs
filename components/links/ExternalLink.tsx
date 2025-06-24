'use client';

import { motion } from 'framer-motion';

import { MouseEventHandler, ReactNode } from 'react';

interface ExternalLinkType {
    href: string;
    className?: string;
    children: ReactNode;
    initialColor?: string;
    hoverColor?: string;
    targetColor?: string;
    download?: boolean;
    title?: string;
    onClick?: (e: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>) => void;
}

export default function ExternalLink({ href, className, initialColor, hoverColor, onClick, targetColor, title, download, children }: ExternalLinkType) {

    return (
        <motion.a
            initial={{ color: initialColor }}
            whileHover={{ color: hoverColor }}
            exit={{ color: targetColor }}
            transition={{ duration: 0.4, ease: 'easeIn' }}
            href={href}
            className={className}
            title={title}
            download={download}
            target='_blank'
        >
            {children}
        </motion.a>
    )
}