import Image from "next/image"
import { getTranslations } from "next-intl/server"

import HomeSubHeader from "./components/HomeSubHeader"

export default async function BaseSection() {

    const t = await getTranslations("homePage");
   
    return (
        <section
            id="baseSection"
            className="relative isolate flex min-h-0 w-full flex-1 flex-col items-center justify-center font-jakarta md:flex-row md:px-0 lg:pt-0 xl:gap-[21rem]"
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
            <div className="relative z-[1] mt-0 flex w-full flex-col items-center justify-center gap-5 px-3 sm:px-6 md:mt-[5rem]">
                <p className=" text-md sm:text-5xl md:text-5xl text-[#f8fafc] font-jakarta">
                   {`Implementacja, integracja, optymalizacja`}
                </p>
                <div className="w-fit">
                    <HomeSubHeader/>
                </div>
                <p className="max-w-[80vw]  md:max-w-[75%] text-sm sm:text-base md:text-lg text-white mb-5 tracking-wide text-justify leading-[2rem] mt-3">
                    {t("baseSection.baseDescription")}
                </p>
            </div>
        </section>

    )
}