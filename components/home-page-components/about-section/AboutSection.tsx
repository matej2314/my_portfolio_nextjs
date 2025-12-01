import { getTranslations } from "next-intl/server";

import MetricsSection from "./components/MetricsSection";
import { metricsArray } from "@/lib/arrays/metricsArray";

import { type GetAboutMeType } from "@/types/actionsTypes/actionsTypes";


export default async function AboutSection({ aboutText }: { aboutText: GetAboutMeType | undefined }) {

    const t = await getTranslations("homePage");

    return (
        <section id="aboutSection" className="w-full min-h-screen h-fit flex flex-col justify-center gap-3 items-start font-kanit snap-center">
            <span className="text-4xl text-green-400">About &#123;</span>
            <div className="w-full h-screen flex flex-col sm:flex-row justify-center sm:justify-center items-center gap-4 sm:gap-[5rem] pt-7 sm:pt-0">
                <MetricsSection metrics={metricsArray} />
                <div className="sm:w-1/2 h-full flex items-center">
                    <div className="w-full flex flex-col items-center text-slate-200 ">
                        <p className="text-md xl:text-xl text-justify leading-9 md:pr-0">
                            {aboutText ? t("aboutSection.description") : 'Failed to load text.'}
                        </p>
                    </div>
                </div>
            </div>
            <span className="text-green-400 text-4xl mt-8 sm:mt-0">&#125;</span>
        </section>

    )
}