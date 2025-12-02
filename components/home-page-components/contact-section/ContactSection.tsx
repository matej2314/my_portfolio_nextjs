'use client';

import { useTranslations } from "next-intl";

import ContactItems from "./components/ContactItems";
import ContactForm from "./components/ContactForm";

export default function ContactSection() {

    const t = useTranslations("homePage");

    return (
        <section id="contactSection" className="w-full min-h-screen flex flex-col justify-start items-start pb-2 font-kanit snap-center">
            <span className="text-4xl text-green-400">Contact &#123;</span>
            <section className="w-full h-screen flex flex-col md:flex-row md:items-center my-5 md:mb-10">
                <div className="w-full h-full text-slate-200 flex flex-col items-start justify-end md:pb-[20rem] xl:justify-center">
                    <h2
                        className="text-2xl sm:text-3xl font-kanit bg-gradient-to-r from-green-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent sm:ml-4 mb-3"
                    >
                        {t("contactSection.title")}
                    </h2>
                    <h3 className=" text-[0.8rem] sm:text-lg sm:ml-4 mb-10">{t("contactSection.subTitle")}</h3>
                    <ContactItems />
                </div>
                <div className="w-full h-full md:mt-[5.5rem] xl:mt-0 text-slate-200 flex flex-col items-start justify-center mt-[2rem] sm:mt-0">
                    <ContactForm />
                </div>
            </section>
            <span className="text-green-400 text-4xl mt-[4rem] xl:mt-0">&#125;</span>
        </section>
    )
}