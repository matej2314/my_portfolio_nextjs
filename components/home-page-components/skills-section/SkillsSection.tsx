import { getTranslations } from "next-intl/server";

import { type GetSkillsType } from "@/types/actionsTypes/actionsTypes";

import SkillsList from "./components/SkillsList";

export default async function SkillsSection({ skills }: { skills: GetSkillsType | undefined }) {

    const t = await getTranslations("homePage");

    if (!skills || 'error' in skills) {
        return <p>Failed to fetch skills</p>
    }

    return (
        <section
            id="skillsSection"
            className="w-full min-h-screen snap-center flex flex-col justify-center items-center font-kanit text-slate-200"
        >
            <span className="text-4xl text-green-400 w-full ml-2">Skills &#123;</span>

            <div className="w-full h-full flex flex-col xl:flex-row items-center justify-center gap-8 xl:gap-12 mb-12">
                <div className="w-full h-fit xl:w-1/2 text-justify flex justify-center">
                    <p className="h-fit text-base md:text-lg leading-9 tracking-wide font-kanit">
                        {t("skillsSection.description")}
                    </p>
                </div>

                <div className="w-full xl:w-1/2 flex justify-start">
                    <SkillsList skills={skills.skills} />
                </div>
            </div>
            <span className="text-4xl text-green-400 w-full ml-2 mt-5">&#125;</span>
        </section>
    )
}