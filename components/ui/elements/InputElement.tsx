'use client';

import { Input } from "../input";

type InputElementProps = {
    type: string;
    placeholder?: string;
    name: string;
    id: string;
    className: string;
    required: boolean;
}

export default function InputElement({ type, placeholder, name, id, className, required }: InputElementProps) {


    return (
        <Input
            type={type}
            name={name}
            placeholder={placeholder}
            id={id}
            className={className}
            required={required}
        />
    )
}