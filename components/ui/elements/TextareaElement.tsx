'use client';

import { Textarea } from "../textarea";

type TextAreaElementProps = {
    id: string;
    className: string;
    required: boolean;
}

export default function TextAreaElement({ id, className, required }: TextAreaElementProps) {


    return (
        <Textarea
            id={id}
            className={className}
            required={required}
        />
    )
}