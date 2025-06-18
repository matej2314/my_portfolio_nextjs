import { getTranslations } from "next-intl/server";


import { type GetAboutMeType } from "@/types/actionsTypes/actionsTypes";
import { type MetricItem } from "@/types/metricTypes";
import MetricsSection from "./components/MetricsSection";

export const metrics: MetricItem[] = [
    { label: 'Learning focus', value: 'Web Dev / Web security' },
    { label: 'Currently learning', value: 'Next.js, Python' },
    { label: 'Used OS', value: 'Windows / Linux' },
    { label: 'Work style', value: 'Self-organized' },
    { label: 'Code editor', value: 'VS Code' },
    { label: 'Languages', value: 'English, Russian' },
    { label: 'Hobbies', value: 'new technologies, TV series' }

]

export default async function AboutSection({ aboutText }: { aboutText: GetAboutMeType | undefined }) {

    const t = await getTranslations("homePage");

    return (
        <div id="aboutSection" className="max-w-screen sm:w-full sm:h-fit flex flex-col justify-between items-start font-kanit">
            <span className="text-4xl text-green-400 ml-2">About &#123;</span>
            <section className="w-full h-full sm:h-screen flex flex-col items-center">
                <div className="w-full sm:w-full h-full flex flex-col sm:flex-row sm:justify-center items-center md:items-center gap-4 sm:gap-[5rem] mt-10">
                    <MetricsSection metrics={metrics} />
                    <section className="sm:w-1/2 h-full flex items-center">
                        <div className="w-full h-fit flex flex-col items-center text-slate-200 ">
                            <p
                                className="text-md xl:text-xl text-justify leading-9 md:pr-[5rem]"
                            >
                                {aboutText ? t("aboutSection.description") : 'Failed to load text.'}
                            </p>
                        </div>
                    </section>
                </div>
            </section>
            <span className="text-green-400 text-4xl ml-2 mt-5">&#125;</span>
        </div>

    )
}