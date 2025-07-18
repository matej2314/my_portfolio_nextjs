'use client'
import { useEffect, useState } from "react";
import { useActionState } from "react"
import { useTranslations } from "next-intl";
import { motion } from 'framer-motion';

import { contactMe } from "@/actions/contact"

import LabelElement from "@/components/ui/elements/LabelElement";
import InputElement from "@/components/ui/elements/InputElement";
import TextAreaElement from "@/components/ui/elements/TextareaElement";
import SubmitBtn from "@/components/ui/elements/SubmitButton";
import DisplayFormMessage from "./DisplayFormMessage";

import { initialState } from "./formInitState";

export default function ContactForm() {
    const [state, formAction] = useActionState(contactMe, initialState);
    const [shouldDisable, setShouldDisable] = useState(false);
    const t = useTranslations("homePage.contactSection");

    const hasErrors = state?.error && Object.values(state.error).some(error => error.length > 0);
    const isSuccess = state?.success !== undefined;

    useEffect(() => {
        if (isSuccess || hasErrors) {
            setShouldDisable(true);

            const timer = setTimeout(() => {
                setShouldDisable(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [isSuccess, hasErrors]);

    return (
        <motion.form
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.5 }}
            action={formAction}
            className="w-full h-fit flex flex-col sm:mx-[8rem]"
        >
            <DisplayFormMessage type="success" messages={state.success} />
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
                defaultValue={state.values.client}
                required={false}
            />
            <DisplayFormMessage type="error" messages={state.error?.client} />
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
                defaultValue={state.values.email}
                className="w-1/2 text-slate-200 text-lg p-1 border-2 border-white rounded-md focus:border-green-400 active:border-green-400"
                required={false}
            />
            <DisplayFormMessage type="error" messages={state.error?.email} />
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
                defaultValue={state.values.subject}
                className="w-1/2 text-slate-200 text-lg p-1 border-2 border-white rounded-md"
                required={false}
            />
            <DisplayFormMessage type="error" messages={state.error?.subject} />
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
                defaultValue={state.values.content}
                className="w-1/2 text-slate-200 text-lg p-1 border-2 border-white rounded-md"
                required={false}
            />
            <DisplayFormMessage type="error" messages={state.error?.content} />
            <SubmitBtn
                pendingTxt={t("contactForm.submitBtn.pendingTxt")}
                idleTxt={t("contactForm.submitBtn.idleTxt")}
                backgroundColor="bg-yellow-200"
                hoverClass="hover:bg-yellow-300"
                disabled={shouldDisable}
                submitted={shouldDisable}
            />
        </motion.form>
    )
}