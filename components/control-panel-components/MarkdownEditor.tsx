'use client';

import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

interface MarkdownEditorProps {
    value?: string;
    onChange: (value: string) => void;
    wrapperClassName?: string;
    height?: number;
}

export default function MarkdownEditor({ value, onChange, wrapperClassName, height }: MarkdownEditorProps) {

    return (
        <div>
            <MDEditor
                value={value}
                onChange={(val = '') => onChange(val)}
                height={height}
                className={wrapperClassName}
            />
        </div>
    )
}