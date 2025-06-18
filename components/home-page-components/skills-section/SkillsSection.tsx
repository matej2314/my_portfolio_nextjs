import { getTranslations } from "next-intl/server";

import { type GetSkillsType } from "@/types/actionsTypes/actionsTypes";

import SkillsList from "./components/SkillsList";

export default async function SkillsSection({ skills }: { skills: GetSkillsType | undefined }) {

    const t = await getTranslations("homePage");

    if (!skills || 'error' in skills) {
        return <p>Failed to fetch skills</p>
    }

    return (
        <section id="skillsSection" className="w-full min-h-screen flex flex-col justify-center gap-3 font-kanit">
            <span className="w-full h-fit text-4xl text-green-400 ml-2">Skills &#123;</span>
            <section className="w-full h-fit md:h-screen flex flex-col md:flex-row xl:justify-center gap-7 md:gap-[10rem] items-center sm:pr-[9rem] mb-12">
                <div className="w-11/12 text-justify sm:w-1/2 flex justify-center text-slate-200 items-center">
                    <p className="w-full h-fit md:text-lg leading-[2rem]">
                        {t("skillsSection.description")}
                    </p>
                </div>
                <div className="w-full sm:w-1/3 h-fit flex flex-col justify-start gap-3">
                    <SkillsList skills={skills.skills} />

                </div>
            </section>
            <span className="text-green-400 text-4xl ml-2 mt-5">&#125;</span>
        </section>
    )
}