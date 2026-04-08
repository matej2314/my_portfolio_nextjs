import Image from "next/image"
import { getTranslations } from "next-intl/server"

import HomeSubHeader from "./components/HomeSubHeader"

export default async function BaseSection() {

    const t = await getTranslations("homePage");
   
    return (
        <section
            id="baseSection"
            className="relative isolate flex min-h-0 w-full flex-1 flex-col items-center justify-center font-jakarta max-xl:flex-col xl:flex-row xl:px-0 xl:pt-0 xl:gap-[21rem]"
        >
            <Image
                src="/base-section-background.webp"
                alt=""
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-black/50" aria-hidden />
            <div className="relative z-[1] mt-0 flex w-full flex-col items-center justify-center gap-5 max-xl:px-3 max-xl:mt-0 xl:mt-[5rem] xl:px-6">
                <h1 className="text-center font-jakarta text-[#f8fafc] max-xl:text-2xl max-xl:leading-tight xl:text-5xl">
                   {t("baseSection.title")}
                </h1>
                <div className="w-fit">
                    <HomeSubHeader/>
                </div>
                <p className="mb-5 mt-3 max-w-[80vw] text-justify tracking-wide text-white max-xl:max-w-[80vw] max-xl:text-sm max-xl:leading-[1.75rem] xl:max-w-[75%] xl:text-lg xl:leading-[2rem]">
                    {t("baseSection.baseDescription")}
                </p>
            </div>
        </section>

    )
}