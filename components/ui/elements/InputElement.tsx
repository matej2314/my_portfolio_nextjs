'use client';

import { forwardRef, type ChangeEvent } from "react";
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
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    multiple?: boolean;
    checked?: boolean;
}

const InputElement = forwardRef<HTMLInputElement, InputElementProps>(
    ({ type, placeholder, name, id, title, defaultValue, multiple, className, required, onChange, checked }, ref) => {
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
                onChange={onChange}
                checked={checked}
            />
        )
    }
);

InputElement.displayName = "InputElement";

export default InputElement;