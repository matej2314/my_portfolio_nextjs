'use client';

import { useTranslations } from "next-intl";

import ContactItems from "./components/ContactItems";
import ContactForm from "./components/ContactForm";

export default function ContactSection() {

    const t = useTranslations("homePage");

    return (
        <section id="contactSection" className="w-full min-h-screen flex flex-col justify-center pb-2">
            <span className="text-4xl text-green-400 ml-2">Contact &#123;</span>
            <section className="w-full h-full flex flex-col md:flex-row justify-center items-center mt-3 md:mb-10">
                <div className="w-full text-slate-200 flex flex-col items-center justify-start">
                    <h2
                        className="text-3xl bg-gradient-to-r from-green-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent ml-4 mb-3"
                    >
                        {t("contactSection.title")}
                    </h2>
                    <h3 className="ml-4 mb-10">{t("contactSection.subTitle")}</h3>
                    <ContactItems />
                </div>
                <div className="w-full text-slate-200 flex flex-col pt-[4rem]">
                    <ContactForm />
                </div>
            </section>
            <span className="text-green-400 text-4xl ml-2">&#125;</span>
        </section>
    )
}