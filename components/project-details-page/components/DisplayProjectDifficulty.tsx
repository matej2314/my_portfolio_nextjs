import { getTranslations } from "next-intl/server"
import { type Project } from "@/types/actionsTypes/actionsTypes"

export default async function DisplayDifficulty({ selectedProject }: { selectedProject: Project }) {
    const t = await getTranslations("projectDetailsPage");

    return (
        <p className="flex justify-center items-center gap-3 text-slate-200">
            <span
                className="text-md font-semibold"
            >
                {t("difficultyLabel")}
            </span>
            <span
                className="w-fit h-fit bg-green-400 text-slate-900 font-semibold text-sm px-2 py-0.5 border-[0.15rem] border-slate-400 rounded-md">
                {selectedProject.difficulty}
            </span>
        </p>
    )
}