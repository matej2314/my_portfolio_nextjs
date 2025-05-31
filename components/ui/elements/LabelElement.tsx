'use client';

import { Label } from "../label";

type LabelElementProps = {
    htmlFor: string;
    className: string;
    children: string;
}

export default function LabelElement({ htmlFor, className, children }: LabelElementProps) {

    return (
        <Label
            htmlFor={htmlFor}
            className={className}
        >
            {children}
        </Label>
    )
}