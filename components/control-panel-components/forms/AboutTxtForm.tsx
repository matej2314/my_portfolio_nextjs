'use client';

import { useActionState } from "react";
import { saveAboutMe } from "@/actions/aboutMe";

import LabelElement from "@/components/ui/elements/LabelElement";
import TextAreaElement from "@/components/ui/elements/TextareaElement";
import SubmitBtn from "@/components/ui/elements/SubmitButton";
import FormTitle from "./components/FormTitle";
import DisplayFormMessage from "@/components/home-page-components/contact-section/components/DisplayFormMessage";

import { type AboutTxtFormProps } from '@/types/forms/about-txt-form';

export default function AboutTxtForm({ aboutMeData, mode = 'create' }: AboutTxtFormProps) {
    const [state, formAction, isPending] = useActionState(saveAboutMe, { success: false, error: '' })

    const submitted = state?.success === true || state?.error !== '';

    return (
        <main className="w-full h-full flex flex-col items-center gap-5 mt-4">
            {state?.success && <DisplayFormMessage messages={state?.message} type="success" />}
            {state?.success === false && <DisplayFormMessage messages={state?.error} type="error" />}
            <FormTitle editTitle="Edit `about me` description" createTitle="Create new `about me` description" mode={mode} />
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