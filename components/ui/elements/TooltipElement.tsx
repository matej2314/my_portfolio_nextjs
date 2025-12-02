'use client';

import { Tooltip, TooltipTrigger, TooltipContent } from '../tooltip';
import { type ReactNode } from 'react';

interface TooltipElementProps {
	content: string | null | undefined;
	children: ReactNode;
	side?: 'top' | 'right' | 'bottom' | 'left';
	sideOffset?: number;
	className?: string;
	arrowClassName?: string;
}

export default function TooltipElement({ content, children, side = 'top', sideOffset = 0, className = '', arrowClassName }: TooltipElementProps) {
	if (!content) return <>{children}</>;

	return (
		<Tooltip>
			<TooltipTrigger asChild>{children}</TooltipTrigger>
			<TooltipContent side={side} sideOffset={sideOffset} className={className} arrowClassName={arrowClassName}>
				{content}
			</TooltipContent>
		</Tooltip>
	);
}
