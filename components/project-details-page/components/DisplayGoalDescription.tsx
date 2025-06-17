import { getTranslations } from "next-intl/server"
import { type Project } from "@/types/actionsTypes/actionsTypes"

export default async function DisplayGoalDescription({ selectedProject, locale }: { selectedProject: Project, locale: string }) {

    const t = await getTranslations("projectDetailsPage");

    return (
        <div className="w-full flex flex-col items-center gap-4">
            <h2 className="font-kanit tracking-wide text-3xl text-yellow-300">{t("goalLabel")}</h2>
            <p
                className="font-kanit tracking-wide text-justify font-semibold"
            >
                {locale === 'en' ? selectedProject.goal : selectedProject.goal_pl}
            </p>
            <h2 className="font-kanit tracking-wide text-3xl text-yellow-300">{t("descriptionLabel")}</h2>
            <p
                className="font-kanit tracking-wide text-justify font-semibold leading-[1.7rem]"
            >
                {locale === 'en' ? selectedProject.long_text : selectedProject.long_text_pl}
            </p>
        </div>
    )
}