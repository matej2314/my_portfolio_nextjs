'use client';

import { Textarea } from "../textarea";

type TextAreaElementProps = {
    id: string;
    className: string;
    required: boolean;
    title?: string;
}

export default function TextAreaElement({ id, className, title, required }: TextAreaElementProps) {


    return (
        <Textarea
            id={id}
            className={className}
            required={required}
            title={title}
        />
    )
}