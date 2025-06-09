'use client';

import { Input } from "../input";

type InputElementProps = {
    type: string;
    placeholder?: string;
    name: string;
    id: string;
    className: string;
    required: boolean;
    title?: string;
}

export default function InputElement({ type, placeholder, name, id, title, className, required }: InputElementProps) {


    return (
        <Input
            type={type}
            title={title}
            name={name}
            placeholder={placeholder}
            id={id}
            className={className}
            required={required}
        />
    )
}