import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';

import { type MarkdownRendererProps } from '@/types/markdown-components';

const schema = {
	...defaultSchema,
	attributes: {
		...defaultSchema.attributes,
		a: [...(defaultSchema.attributes?.a || []), 'target', 'rel'],
	},
};

export default function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
	return (
		<div className={className}>
			<ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[[rehypeSanitize, schema]]}>
				{content}
			</ReactMarkdown>
		</div>
	);
}
