'use client';

import { useState, forwardRef } from "react";
import InputElement from "./InputElement";
import { cn } from "@/lib/utils/utils";
import { defaultData } from "@/lib/defaultData";

import { type SwitchElementProps } from "@/types/SwitchElementTypes";

const SwitchElement = forwardRef<HTMLInputElement, SwitchElementProps>(({
    id,
    name,
    checked = false,
    label,
    labelPosition = 'right',
    size = 'md',
    onChange,
    containerClassName = '',
}, ref) => {
    const [isChecked, setIsChecked] = useState(checked);

    const sizes = defaultData.switchElement.sizes;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
        if (onChange) onChange(e.target.checked);
    };

    const sizeClasses = sizes[size];

    return (
        <div className={`flex items-center gap-2 ${containerClassName}`}>
            {label && labelPosition === 'left' && (
                <label htmlFor={id} className="select-none cursor-pointer">
                    {label}
                </label>
            )}
            <div className={`relative ${sizeClasses.width} ${sizeClasses.height}`}>
                <InputElement
                    ref={ref}
                    type="checkbox"
                    id={id}
                    name={name || ''}
                    className={cn(
                        "peer absolute left-0 top-0 w-full h-full opacity-0 z-10 cursor-pointer"
                    )}
                    required={false}
                    defaultValue=""
                    onChange={handleChange}
                    checked={isChecked}
                />

                {/* Track */}
                <div
                    className={cn(
                        "absolute top-0 left-0 rounded-full bg-green-900 peer-checked:bg-green-600 transition-colors duration-300",
                        sizeClasses.width,
                        sizeClasses.height,
                        "z-0"
                    )}
                />

                {/* Thumb */}
                <div
                    className={cn(
                        "absolute top-0.5 left-0.5 bg-white rounded-full shadow-md transition-transform duration-300",
                        sizeClasses.thumb,
                        "pointer-events-none"
                    )}
                    style={{
                        transform: isChecked ? `translateX(1.5rem)` : 'translateX(0)',
                    }}
                    aria-hidden="true"
                />
            </div>
            {label && labelPosition === 'right' && (
                <label htmlFor={id} className="select-none cursor-pointer">
                    {label}
                </label>
            )}
        </div>
    );
});

SwitchElement.displayName = 'SwitchElement';

export default SwitchElement;