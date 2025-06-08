import { getTranslations } from "next-intl/server";

import { getSkills } from "@/actions/skills";

import SkillsList from "./components/SkillsList";

export default async function SkillsSection() {

    const t = await getTranslations("homePage");
    const skills = await getSkills();

    if ('error' in skills) {
        console.log(skills.error);
        return <div>Failed to fetch skills data</div>
    }

    return (
        <section id="skillsSection" className="w-full h-[100dvh] flex flex-col mb-5">
            <span className="text-4xl text-green-400 ml-2">Skills &#123;</span>
            <section className="w-full h-full flex justify-around mt-10">
                <div className="w-1/3 text-slate-200 h-full flex items-center">
                    <p className="w-full h-fit text-lg">
                        {t("skillsSection.description")}
                    </p>
                </div>
                <div className="w-1/3 flex flex-col gap-3">
                    <SkillsList skills={skills.skills} />

                </div>
            </section>
            <span className="text-green-400 text-4xl ml-2 mt-5">&#125;</span>
        </section>
    )

}