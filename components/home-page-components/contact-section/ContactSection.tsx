import { getTranslations } from "next-intl/server";

import ContactItems from "./components/ContactItems";
import ContactForm from "./components/ContactForm";

export default async function ContactSection() {

    const t = await getTranslations("homePage");

    return (
        <section id="contactSection" className="w-full h-[100dvh] flex flex-col pb-2">
            <span className="text-4xl text-green-400 ml-2">Contact &#123;</span>
            <section className="w-full h-full flex justify-between">
                <div className="w-1/2 text-slate-200 flex flex-col pt-[4rem]">
                    <h2
                        className="text-3xl bg-gradient-to-r from-green-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent ml-4 mb-3"
                    >
                        {t("contactSection.title")}
                    </h2>
                    <h3 className="ml-4 mb-10">{t("contactSection.subTitle")}</h3>
                    <ContactItems />
                </div>
                <div className="w-1/2 text-slate-200 flex flex-col pt-[4rem]">
                    <ContactForm />
                </div>
            </section>
            <span className="text-green-400 text-4xl ml-2">&#125;</span>
        </section>
    )
}