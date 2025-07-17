'use client';

import { useActionState } from "react";

import { saveAboutMe } from "@/actions/aboutMe";

import LabelElement from "@/components/ui/elements/LabelElement";
import TextAreaElement from "@/components/ui/elements/TextareaElement";
import SubmitBtn from "@/components/ui/elements/SubmitButton";

import { type AboutTextType } from "@/types/actionsTypes/actionsTypes";

interface AboutTxtFormProps {
    aboutMeData?: AboutTextType;
    mode?: 'edit' | 'create';
}

export default function AboutTxtForm({ aboutMeData, mode = 'create' }: AboutTxtFormProps) {
    const [state, formAction] = useActionState(saveAboutMe, { success: false, error: '' })

    return (
        <>
            {state?.success && <p className="text-green-400">{state.message}</p>}
            {state?.success === false && <p className="text-red-500">{state.error}</p>}
            <form action={formAction} className="w-fit h-fit flex flex-col items-center justify-center gap-2 text-slate-200">
                <input type="hidden" name="id" value={mode} />
                <LabelElement
                    htmlFor="about_text"
                    className="font-bold pb-1 ml-2 text-lg tracking-wide"
                >
                    About me description:
                </LabelElement>
                <TextAreaElement
                    id="about_text"
                    name="about_text"
                    required={false}
                    className="text-md pl-2 tracking-wide w-[40rem] h-[20rem] resize-none"
                    defaultValue={aboutMeData?.about_text}
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