'use client';

import { motion, easeIn } from 'motion/react';

import { ReactNode } from 'react';

interface ExternalLinkType {
	href: string;
	className?: string;
	children: ReactNode;
	initialColor?: string;
	hoverColor?: string;
	targetColor?: string;
	download?: boolean;
	title?: string;
	'aria-label'?: string;
	onClick?: () => void;
}

export default function ExternalLink({ href, className, initialColor, hoverColor, onClick, targetColor, title, download, children, 'aria-label': ariaLabel }: ExternalLinkType) {
	return (
		<motion.a initial={{ color: initialColor }} whileHover={{ color: hoverColor }} exit={{ color: targetColor }} transition={{ duration: 0.4, ease: easeIn }} href={href} className={className} title={title} aria-label={ariaLabel} download={download} target='_blank' onClick={onClick}>
			{children}
		</motion.a>
	);
}
