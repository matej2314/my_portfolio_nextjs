'use client';

import { useActionState } from "react";

import { saveResume } from "@/actions/resume";

import LabelElement from "@/components/ui/elements/LabelElement";
import InputElement from "@/components/ui/elements/InputElement";
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
                <InputElement
                    type="file"
                    id="cv_file"
                    name="cv_file"
                    required={false}
                    className="text-md pl-2 tracking-wide w-[16rem]"
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