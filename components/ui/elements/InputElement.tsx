'use client';

import { Input } from "../input";
import { cn } from "@/lib/utils";

type InputElementProps = {
    type: string;
    placeholder?: string;
    name: string;
    id: string;
    className: string;
    required: boolean;
    title?: string;
    defaultValue?: string;
    multiple?: boolean;
}

export default function InputElement({ type, placeholder, name, id, title, defaultValue, multiple, className, required }: InputElementProps) {


    return (
        <Input
            type={type}
            title={title}
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            id={id}
            className={cn(
                "focus-visible:ring-0 ring-offset-0 focus:outline-none",
                className
            )}
            required={required}
            multiple={multiple}
        />
    )
}