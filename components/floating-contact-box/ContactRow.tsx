'use client';

import { Icon } from '@iconify/react';
import { motion, useReducedMotion } from 'motion/react';

import { cn } from '@/lib/utils/utils';
import { type FloatingContactRow } from '@/types/floatingContactTypes';

type ContactRowProps = {
	row: FloatingContactRow;
	label: string;
	accent: string;
	index: number;
};

const rowInnerClass = 'flex w-full gap-3';

const rowLinkClass = cn(rowInnerClass, 'outline-none ring-0');

export default function ContactRow({ row, label, accent, index }: ContactRowProps) {
	const reduced = useReducedMotion();

	const iconBox = (
		<span
			className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-[#1e293b]'
			style={{ borderColor: accent }}
		>
			<Icon icon={row.icon} width={18} height={18} style={{ color: accent }} aria-hidden />
		</span>
	);

	const body = (
		<>
			{iconBox}
			<div className='min-w-0 flex flex-col gap-0.5'>
				<span className='text-[10px] font-semibold uppercase tracking-wide text-slate-500'>{label}</span>
				<span className='break-words text-sm text-slate-100'>{row.value}</span>
			</div>
		</>
	);

	const bodyStatic = (
		<>
			<span aria-hidden className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-[#1e293b]' style={{ borderColor: accent }}>
				<Icon icon={row.icon} width={18} height={18} style={{ color: accent }} aria-hidden />
			</span>
			<dl className='m-0 flex min-w-0 flex-col gap-0.5'>
				<dt className='text-[10px] font-semibold uppercase tracking-wide text-slate-500'>{label}</dt>
				<dd className='m-0 break-words text-sm text-slate-100'>{row.value}</dd>
			</dl>
		</>
	);

	const motionProps = {
		initial: reduced ? false : ({ opacity: 0, y: 6 } as const),
		animate: { opacity: 1, y: 0 },
		transition: reduced ? { duration: 0 } : { duration: 0.35, delay: index * 0.06, ease: 'easeOut' as const },
	};

	if (row.href) {
		return (
			<motion.a
				href={row.href}
				className={rowLinkClass}
				{...(row.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
				{...motionProps}
			>
				{body}
			</motion.a>
		);
	}

	return (
		<motion.div className={rowInnerClass} {...motionProps}>
			{bodyStatic}
		</motion.div>
	);
}
