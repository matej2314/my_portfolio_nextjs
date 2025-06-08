'use client'

import { useActionState } from "react"
import { useTranslations } from "next-intl";

import { contactMe } from "@/actions/contact"

import LabelElement from "@/components/ui/elements/LabelElement";
import InputElement from "@/components/ui/elements/InputElement";
import TextAreaElement from "@/components/ui/elements/TextareaElement";
import SubmitBtn from "@/components/SubmitButton";

export default function ContactForm() {
    const initialState: { success?: string, error?: string } = {};

    const [state, formAction] = useActionState(contactMe, initialState);
    const t = useTranslations();

    return (
        <form
            action={formAction}
            className="w-full h-fit flex flex-col mx-[8rem]"
        >
            <LabelElement
                htmlFor="client-name"
                className="font-bold pb-1 ml-2 text-lg"
            >
                Name:
            </LabelElement>
            <InputElement
                type="text"
                name="client-name"
                id="client-name"
                className="w-1/2 text-slate-200 text-lg p-1 border-2 border-white rounded-md"
                required
            />
            <LabelElement
                htmlFor="client-mail"
                className="font-bold pb-1 ml-2 text-lg mt-2"
            >
                E-mail:
            </LabelElement>
            <InputElement
                type="email"
                name="client-mail"
                id="client-mail"
                className="w-1/2 text-slate-200 text-lg p-1 border-2 border-white rounded-md"
                required
            />
            <LabelElement
                htmlFor="msg-subject"
                className="font-bold pb-1 ml-2 text-lg mt-2"
            >
                Subject:
            </LabelElement>
            <InputElement
                type="text"
                name="msg-subject"
                id="msg-subject"
                className="w-1/2 text-slate-200 text-lg p-1 border-2 border-white rounded-md"
                required
            />
            <LabelElement
                htmlFor="msg-content"
                className="font-bold pb-1 ml-2 text-lg mt-2"
            >
                Message:
            </LabelElement>
            <TextAreaElement
                id="msg-content"
                className="w-1/2 text-slate-200 text-lg p-1 border-2 border-white rounded-md"
                required
            />
            {state.error && <p>{state.error}</p>}
            {state.success && <p>{state.success}</p>}
            <SubmitBtn
                pendingTxt="Sending..."
                idleTxt="Send Message"
                backgroundColor="bg-yellow-200"
                hoverClass="hover:bg-yellow-300"
            />
        </form>
    )
}