'use client'

import { useActionState } from "react"
import { useTranslations } from "next-intl";
import { motion } from 'framer-motion';

import { contactMe } from "@/actions/contact"

import LabelElement from "@/components/ui/elements/LabelElement";
import InputElement from "@/components/ui/elements/InputElement";
import TextAreaElement from "@/components/ui/elements/TextareaElement";
import SubmitBtn from "@/components/ui/elements/SubmitButton";

export default function ContactForm() {
    const initialState: { success?: string, error?: string } = {};

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
                required
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
                required
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
                required
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
                required
            />
            {state.error && <p>{state.error}</p>}
            {state.success && <p>{state.success}</p>}
            <SubmitBtn
                pendingTxt={t("contactForm.submitBtn.pendingTxt")}
                idleTxt={t("contactForm.submitBtn.idleTxt")}
                backgroundColor="bg-yellow-200"
                hoverClass="hover:bg-yellow-300"
            />
        </motion.form>
    )
}