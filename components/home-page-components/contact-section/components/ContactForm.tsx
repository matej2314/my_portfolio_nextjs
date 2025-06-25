'use client'

import { useActionState } from "react"
import { useTranslations } from "next-intl";
import { motion } from 'framer-motion';

import { contactMe } from "@/actions/contact"

import LabelElement from "@/components/ui/elements/LabelElement";
import InputElement from "@/components/ui/elements/InputElement";
import TextAreaElement from "@/components/ui/elements/TextareaElement";
import SubmitBtn from "@/components/ui/elements/SubmitButton";

import { type ContactFormState } from "@/types/contactFormTypes";


export default function ContactForm() {
    const initialState: ContactFormState = { error: [] };

    const [state, formAction] = useActionState(contactMe, initialState);
    const t = useTranslations("homePage.contactSection");

    return (
        <motion.form
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.5 }}
            action={formAction}
            className="w-full h-fit flex flex-col sm:mx-[8rem]"
        >
            {state.success && <p className="text-green-400 mb-2 text-lg">{state.success}</p>}
            {Array.isArray(state.error) ? (
                state.error.map((msg, idx) => (
                    <p key={idx} className="text-red-400 mb-2 text-lg">{msg}</p>
                ))
            ) : (
                state.error && <p className="text-red-400 mb-2 text-lg">{state.error}</p>
            )}
            <LabelElement
                htmlFor="client-name"
                className="font-bold pb-1 ml-2 text-lg tracking-wide"
            >
                {t("contactForm.nameLabel")}
            </LabelElement>
            <InputElement
                type="text"
                title={t("contactForm.nameLabel")}
                name="client-name"
                id="client-name"
                className="w-1/2 text-slate-200 text-lg p-1 border-2 border-white rounded-md"
                required={false}
            />
            <LabelElement
                htmlFor="client-mail"
                className="font-bold pb-1 ml-2 text-lg mt-2 tracking-wide"
            >
                E-mail:
            </LabelElement>
            <InputElement
                type="email"
                name="client-mail"
                title='E-mail:'
                id="client-mail"
                className="w-1/2 text-slate-200 text-lg p-1 border-2 border-white rounded-md focus:border-green-400 active:border-green-400"
                required={false}
            />
            <LabelElement
                htmlFor="msg-subject"
                className="font-bold pb-1 ml-2 text-lg mt-2 tracking-wide"
            >
                {t("contactForm.subjectLabel")}
            </LabelElement>
            <InputElement
                type="text"
                name="msg-subject"
                title={t("contactForm.subjectLabel")}
                id="msg-subject"
                className="w-1/2 text-slate-200 text-lg p-1 border-2 border-white rounded-md"
                required={false}
            />
            <LabelElement
                htmlFor="msg-content"
                className="font-bold pb-1 ml-2 text-lg mt-2 tracking-wide"
            >
                {t("contactForm.messageLabel")}
            </LabelElement>
            <TextAreaElement
                id="msg-content"
                name="msg-content"
                title={t("contactForm.messageLabel")}
                className="w-1/2 text-slate-200 text-lg p-1 border-2 border-white rounded-md"
                required={false}
            />
            <SubmitBtn
                pendingTxt={t("contactForm.submitBtn.pendingTxt")}
                idleTxt={t("contactForm.submitBtn.idleTxt")}
                backgroundColor="bg-yellow-200"
                hoverClass="hover:bg-yellow-300"
            />
        </motion.form>
    )
}