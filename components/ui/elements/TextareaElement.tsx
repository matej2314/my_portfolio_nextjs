'use client';

import { Textarea } from "../textarea";

type TextAreaElementProps = {
    id: string;
    className: string;
    required: boolean;
    title?: string;
    name: string
}

export default function TextAreaElement({ id, className, title, name, required }: TextAreaElementProps) {


    return (
        <Textarea
            id={id}
            className={className}
            name={name}
            required={required}
            title={title}
        />
    )
}