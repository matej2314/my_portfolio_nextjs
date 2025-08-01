export interface MarkdownRendererProps {
	content: string;
	className?: string;
}

export interface MarkdownEditorProps {
	value?: string;
	onChange: (value: string) => void;
	wrapperClassName?: string;
	height?: number;
}
