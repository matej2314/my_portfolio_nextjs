'use client';

import { Streamdown } from 'streamdown';
import 'streamdown/styles.css';

import { cn } from '@/lib/utils/utils';
import { type ResponseRendererProps } from '@/lib/assistant/types';

export default function ResponseRenderer({ content, isAnimating, className }: ResponseRendererProps) {
	return (
		<Streamdown
			mode="streaming"
			parseIncompleteMarkdown
			isAnimating={false}
			// animated={{ animation: 'fadeIn' }}
			className={cn(
				'break-words text-sm leading-relaxed text-slate-200',
				'[&_p]:m-0 [&_p+p]:mt-2',
				'[&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-4',
				'[&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-4',
				'[&_li]:my-0.5',
				'[&_strong]:font-semibold [&_strong]:text-slate-100',
				'[&_a]:underline [&_a]:text-slate-100',
				'[&_h1]:mt-2 [&_h1]:mb-1 [&_h1]:text-base [&_h1]:font-semibold',
				'[&_h2]:mt-2 [&_h2]:mb-1 [&_h2]:text-base [&_h2]:font-semibold',
				'[&_h3]:mt-2 [&_h3]:mb-1 [&_h3]:text-sm [&_h3]:font-semibold',
				className,
			)}
		>
			{content}
		</Streamdown>
	);
}
