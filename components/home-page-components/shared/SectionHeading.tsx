import { type ReactNode } from 'react';

import { cn } from '@/lib/utils/utils';

type SectionHeadingProps = {
	index: string;
	title: string;
	lead?: ReactNode;
	className?: string;
};

export default function SectionHeading({ index, title, lead, className }: SectionHeadingProps) {
	return (
		<header
			className={cn(
				'flex flex-col gap-3 max-xl:mb-10 xl:col-span-4 xl:mb-0 xl:self-start xl:sticky xl:top-32',
				className,
			)}
		>
			<p className='font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-ink-3 xl:text-xs'>
				{index}
			</p>
			<h2 className='font-display text-[1.625rem] font-medium leading-[1.15] tracking-tight text-ink-0 xl:text-[2.375rem]'>
				{title}
			</h2>
			<div className='h-px w-10 bg-brand xl:w-12' aria-hidden />
			{lead ? (
				<div className='max-w-[38ch] text-[15px] leading-relaxed text-ink-2 xl:text-base xl:leading-relaxed'>
					{lead}
				</div>
			) : null}
		</header>
	);
}
