'use client';

import { type MarkdownEditorProps } from '@/types/markdown-components';

import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function MarkdownEditor({
    value,
    onChange,
    wrapperClassName,
    height
}: MarkdownEditorProps) {

    return (
        <div className={wrapperClassName}>
            <MDEditor
                value={value}
                onChange={(val = '') => onChange(val)}
                height={height}
                className="markdown-editor-custom"
            />
        </div>
    )
}