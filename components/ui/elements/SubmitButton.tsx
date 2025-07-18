'use client';

import { useFormStatus } from "react-dom";

import { Button } from "../button";

import { type SubmitBtnProps } from "@/types/SubmitButtonTypes";

export default function SubmitBtn({ pendingTxt, idleTxt, backgroundColor, hoverClass, submitted }: SubmitBtnProps) {
    const { pending } = useFormStatus();


    const extraClass = `${backgroundColor} ${hoverClass}`.trim();


    return (
        <Button
            className={`w-1/2 h-fit flex items-center tracking-wide justify-center rounded-md mt-6 text-slate-950 text-md md:text-3xl hover-shadow ${extraClass}`}
            disabled={submitted}
        >
            {submitted ? 'Submitted' : (pending ? pendingTxt : idleTxt)}
        </Button>
    )
}