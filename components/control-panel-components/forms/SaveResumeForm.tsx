'use client';

import { useActionState } from "react";

import { saveResume } from "@/actions/resume";

import LabelElement from "@/components/ui/elements/LabelElement";
import InputFileElement from "@/components/ui/elements/InputFileElement";
import SubmitBtn from "@/components/ui/elements/SubmitButton";

export default function SaveResumeForm() {

    const [state, formAction] = useActionState(saveResume, { success: false, error: '' })

    return (
        <>
            {state?.success && <p className="text-green-400">{state.message}</p>}
            {state?.success === false && <p className="text-red-500">{state.error}</p>}
            <form action={formAction} className="w-fit h-fit flex flex-col items-center justify-center gap-2 text-slate-200">
                <LabelElement
                    htmlFor="cv_file"
                    className="font-bold pb-1 ml-2 text-lg tracking-wide"
                >
                    Select CV file:
                </LabelElement>
                <InputFileElement
                    name="cv_file"
                    id="cv_file"
                    placeholder="Choose a file"
                    className="text-md tracking-wide w-[25rem]"
                />
                <SubmitBtn
                    pendingTxt='Saving...'
                    idleTxt='Save'
                    backgroundColor="bg-yellow-200"
                    hoverClass="hover:bg-yellow-300"
                />
            </form>
        </>

    )
}