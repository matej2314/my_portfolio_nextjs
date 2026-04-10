'use client';

import { ChevronDown } from 'lucide-react';
import { motion, type Easing, type EasingFunction } from 'motion/react';
import { useState } from 'react';
import { useId } from 'react';
import { cn } from '@/lib/utils/utils';

export default function ResponsibilitiesAccordion({ title, items, itemKeyPrefix, accordionEase }: { title: string; items: string[]; itemKeyPrefix: string, accordionEase: EasingFunction[] | Easing }) {
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
				className='flex w-fit cursor-pointer items-center justify-between gap-2 rounded-sm text-left text-sm font-medium text-yellow-300 outline-none transition-colors focus-visible:ring-0 focus-visible:text-yellow-400 hover:text-yellow-400'
			>
				<span className={cn('min-w-0', open && 'decoration-[#facc15]')}>{title}</span>
				<motion.span
					className='inline-flex shrink-0 text-yellow-300'
					aria-hidden
					initial={false}
					animate={{ rotate: open ? 180 : 0 }}
					transition={{ duration: 0.4, ease: accordionEase }}
				>
					<ChevronDown className='size-4' />
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
					<ul className='mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-400'>
						{items.map((line, index) => (
							<li key={`${itemKeyPrefix}-r-${index}`}>{line}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}