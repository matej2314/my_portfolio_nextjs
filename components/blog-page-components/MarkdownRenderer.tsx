import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


export interface MarkdownRendererProps {
    content: string;
    className?: string;
};


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