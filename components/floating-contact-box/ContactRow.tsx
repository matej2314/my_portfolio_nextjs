'use client';

import { Icon } from '@iconify/react';
import { motion, useReducedMotion } from 'motion/react';

import { type FloatingContactRow } from '@/types/floatingContactTypes';

type Props = {
	row: FloatingContactRow;
	label: string;
	accent: string;
	border: string;
	index: number;
};

const rowClass = 'flex gap-3 border-b py-2.5 last:border-b-0';

export default function ContactRow({ row, label, accent, border, index }: Props) {
	const reduced = useReducedMotion();
	const rowStyle = { borderColor: border };

	const body = (
		<>
			<span
				className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-[#1e293b]'
				style={{ borderColor: accent }}
			>
				<Icon icon={row.icon} width={18} height={18} style={{ color: accent }} />
			</span>
			<div className='min-w-0 flex flex-col gap-0.5'>
				<span className='text-[10px] font-semibold uppercase tracking-wide text-slate-500'>{label}</span>
				<span className='break-words text-sm text-slate-100'>{row.value}</span>
			</div>
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
				className={rowClass}
				style={rowStyle}
				{...(row.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
				{...motionProps}
			>
				{body}
			</motion.a>
		);
	}

	return (
		<motion.div className={rowClass} style={rowStyle} {...motionProps}>
			{body}
		</motion.div>
	);
}
