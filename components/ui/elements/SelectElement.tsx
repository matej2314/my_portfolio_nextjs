'use client';
import { useRef } from 'react';

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';

import { type SelectElementProps } from '@/types/selectElementTypes';

export default function SelectElement({
    value,
    onChange,
    options,
    placeholder,
    className,
}: SelectElementProps) {
    const triggerRef = useRef<HTMLButtonElement>(null);

    const handleValueChange = (val: string) => {
        onChange(val);
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setTimeout(() => {
                triggerRef.current?.blur();
            }, 0);
        }
    }

    return (
        <Select
            value={value}
            onValueChange={handleValueChange}
            onOpenChange={handleOpenChange}
        >
            <SelectTrigger
                ref={triggerRef}
                className={`focus-visible:outline-none focus-visible:ring-0 ${className}`}
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent className="bg-black text-slate-200 w-[var(--radix-select-trigger-width)]">
                {options.map(({ label, value }) => (
                    <SelectItem
                        key={value}
                        value={value}
                        className="hover:bg-blue-600 hover:text-white"
                    >
                        {label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
