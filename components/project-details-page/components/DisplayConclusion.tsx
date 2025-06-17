import { getTranslations } from "next-intl/server";

import { type Project } from "@/types/actionsTypes/actionsTypes";

export default async function DisplayConclusion({ selectedProject, locale }: { selectedProject: Project, locale: string }) {

    const t = await getTranslations("projectDetailsPage");

    return (
        <div className="w-full h-fit flex flex-col items-center justify-center gap-4">
            <h2 className="text-3xl text-yellow-300">{t("conclusion")}</h2>
            <p className="font-kanit tracking-wide text-justify font-semibold">
                {locale === 'en' ? selectedProject.conclusion : selectedProject.conclusion_pl}
            </p>
        </div>
    )
}