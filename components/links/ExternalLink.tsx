'use client';

import { motion, easeIn } from 'motion/react';

import { type AriaRole, type ReactNode } from 'react';

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
	role?: AriaRole;
	'aria-expanded'?: boolean;
	'aria-haspopup'?: boolean | 'menu' | 'dialog' | 'true' | 'false';
	tabIndex?: number;
	onClick?: () => void;
}

export default function ExternalLink({ href, className, initialColor, hoverColor, onClick, targetColor, title, download, children, 'aria-label': ariaLabel, role, 'aria-expanded': ariaExpanded, 'aria-haspopup': ariaHaspopup, tabIndex }: ExternalLinkType) {
	return (
		<motion.a
			initial={{ color: initialColor }}
			whileHover={{ color: hoverColor }}
			exit={{ color: targetColor }}
			transition={{ duration: 0.4, ease: easeIn }}
			href={href}
			className={className}
			title={title}
			aria-label={ariaLabel}
			role={role}
			aria-expanded={ariaExpanded}
			aria-haspopup={ariaHaspopup}
			tabIndex={tabIndex}
			download={download}
			target='_blank'
			onClick={onClick}
		>
			{children}
		</motion.a>
	);
}
