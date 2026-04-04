'use client';

import { useFormStatus } from "react-dom";

import { Button } from "../button";
import { cn } from "@/lib/utils/utils";

import { type SubmitBtnProps } from "@/types/SubmitButtonTypes";

export default function SubmitBtn({ pendingTxt, idleTxt, backgroundColor, hoverClass, submitted, className }: SubmitBtnProps) {
    const { pending } = useFormStatus();


    const extraClass = `${backgroundColor} ${hoverClass}`.trim();


    return (
        <div aria-live="polite" aria-atomic="true">
            <Button
                className={cn(
                    "h-fit flex items-center tracking-wide justify-center rounded-md mt-6 text-slate-950 text-md md:text-xl cursor-pointer",
                    extraClass,
                    className
                )}
                disabled={submitted}
            >
                {submitted ? 'Submitted' : (pending ? pendingTxt : idleTxt)}
            </Button>
        </div>
    )
}