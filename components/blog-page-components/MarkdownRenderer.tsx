import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { type MarkdownRendererProps } from '@/types/markdown-components';

export default function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
    return (
        <div className={className}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
            >
                {content}
            </ReactMarkdown>
        </div>
    )
}