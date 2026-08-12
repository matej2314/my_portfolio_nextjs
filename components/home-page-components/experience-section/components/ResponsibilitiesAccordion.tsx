'use client';

import { Icon } from '@iconify/react';
import { motion, type Easing, type EasingFunction } from 'motion/react';
import { useState, useId } from 'react';
import { cn } from '@/lib/utils/utils';

export default function ResponsibilitiesAccordion({
	title,
	items,
	itemKeyPrefix,
	accordionEase,
}: {
	title: string;
	items: string[];
	itemKeyPrefix: string;
	accordionEase: EasingFunction[] | Easing;
}) {
	const [open, setOpen] = useState(false);
	const baseId = useId();
	const triggerId = `${baseId}-trigger`;
	const panelId = `${baseId}-panel`;

	return (
		<div className='mt-0.5'>
			<button
				type='button'
				id={triggerId}
				aria-expanded={open}
				aria-controls={panelId}
				onClick={() => setOpen(v => !v)}
				className={cn(
					'flex min-h-11 w-fit cursor-pointer items-center gap-2 rounded-sm py-2 text-left text-sm font-medium text-brand',
					'outline-none transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
					'hover:text-brand-bright focus-visible:text-brand-bright focus-visible:ring-2 focus-visible:ring-brand/60',
				)}
			>
				<span className='min-w-0'>{title}</span>
				<motion.span
					className='inline-flex shrink-0'
					aria-hidden
					initial={false}
					animate={{ rotate: open ? 180 : 0 }}
					transition={{ duration: 0.4, ease: accordionEase }}
				>
					<Icon icon='ph:caret-down-light' width={16} height={16} />
				</motion.span>
			</button>
			<div
				id={panelId}
				role='region'
				aria-labelledby={triggerId}
				data-state={open ? 'open' : 'closed'}
				className='grid grid-rows-[0fr] transition-[grid-template-rows] duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)] data-[state=open]:grid-rows-[1fr]'
			>
				<div className='min-h-0 overflow-hidden' aria-hidden={!open}>
					<ul className='mt-2 list-disc space-y-1 px-5 text-sm leading-relaxed text-ink-2'>
						{items.map((line, index) => (
							<li key={`${itemKeyPrefix}-r-${index}`} className='w-[90%]'>
								{line}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
