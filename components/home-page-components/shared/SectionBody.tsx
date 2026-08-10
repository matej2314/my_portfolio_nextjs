import { type ReactNode } from 'react';

import { cn } from '@/lib/utils/utils';

type SectionBodyProps = {
	children: ReactNode;
	className?: string;
};

export default function SectionBody({ children, className }: SectionBodyProps) {
	return (
		<div className={cn('flex min-w-0 flex-col gap-8 xl:col-span-8 xl:gap-10', className)}>
			{children}
		</div>
	);
}
