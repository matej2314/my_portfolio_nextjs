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
    const [state, formAction, isPending] = useActionState(saveAboutMe, { success: false, error: '' })

    const submitted = state?.success === true || state?.error !== '';

    return (
        <main className="w-full h-full flex flex-col items-center gap-5 mt-4">
            <h2 className="text-2xl font-bold flex justify-center text-yellow-400">Edit `about me` description:</h2>
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
                    placeholder="min 20 characters, max 500 characters"
                    defaultValue={aboutMeData?.about_text}
                />
                <SubmitBtn
                    pendingTxt='Saving...'
                    idleTxt='Save'
                    backgroundColor="bg-yellow-200"
                    hoverClass="hover:bg-yellow-300"
                    disabled={isPending}
                    submitted={submitted}
                />
            </form>
        </main>

    )
}