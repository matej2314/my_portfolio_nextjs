'use client';

import { forwardRef } from "react";
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

const InputElement = forwardRef<HTMLInputElement, InputElementProps>(
    ({ type, placeholder, name, id, title, defaultValue, multiple, className, required }, ref) => {
        return (
            <Input
                ref={ref}
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
);

InputElement.displayName = "InputElement";

export default InputElement;