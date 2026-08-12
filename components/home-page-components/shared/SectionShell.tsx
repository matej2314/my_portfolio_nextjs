import { type ReactNode } from 'react';

import { cn } from '@/lib/utils/utils';

type SectionShellProps = {
	id: string;
	children: ReactNode;
	className?: string;
	/** Soft radial hairline above the section (default on). */
	divider?: boolean;
	/** Skip the 12-col editorial grid — children manage their own layout. */
	ungrid?: boolean;
};

export default function SectionShell({
	id,
	children,
	className,
	divider = true,
	ungrid = false,
}: SectionShellProps) {
	return (
		<section id={id} tabIndex={-1} className={cn('relative w-full', className)}>
			{divider ? <div className='section-rail' aria-hidden /> : null}

			<div
				className={cn(
					'relative mx-auto w-full max-w-[1440px] px-4 py-14 min-[481px]:py-28 xl:px-12 xl:py-40',
					!ungrid && 'xl:grid xl:grid-cols-12 xl:gap-x-12 xl:gap-y-0',
				)}
			>
				{children}
			</div>
		</section>
	);
}
