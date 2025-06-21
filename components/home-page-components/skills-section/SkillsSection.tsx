import { getTranslations } from "next-intl/server";

import { type GetSkillsType } from "@/types/actionsTypes/actionsTypes";

import SkillsList from "./components/SkillsList";

export default async function SkillsSection({ skills }: { skills: GetSkillsType | undefined }) {

    const t = await getTranslations("homePage");

    if (!skills || 'error' in skills) {
        return <p>Failed to fetch skills</p>
    }

    return (
        <section id="skillsSection" className="w-full h-fit md:h-fit flex flex-col justify-center gap-3 font-kanit">
            <span className="w-full h-fit text-4xl text-green-400 ml-2">Skills &#123;</span>
            <section className="md:h-full xl:h-screen flex flex-col xl:flex-row xl:justify-center gap-7 md:gap-[10rem] lg:gap-[2rem] xl:gap-[3rem] items-center mb-12">
                <div className="w-full text-justify xl:w-1/2 flex justify-center text-slate-200 items-center">
                    <p className="md:text-lg leading-[2rem]">
                        {t("skillsSection.description")}
                    </p>
                </div>
                <div className="w-full xl:max-w-1/2 h-fit flex flex-col justify-start">
                    <SkillsList skills={skills.skills} />

                </div>
            </section>
            <span className="text-green-400 text-4xl ml-2 mt-5">&#125;</span>
        </section>
    )
}