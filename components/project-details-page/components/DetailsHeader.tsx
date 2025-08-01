import { getTranslations } from "next-intl/server";

import BadgeList from "./BadgeList";
import ExternalLink from "@/components/links/ExternalLink";
import DisplayDifficulty from "./DisplayProjectDifficulty";

import { type DetailsHeaderProps } from "@/types/detailsPageTypes";
import { type BadgeItem } from "./BadgeList";

export default async function DetailsHeader({ selectedProject }: DetailsHeaderProps) {

    const t = await getTranslations("projectDetailsPage");

    const techArray: BadgeItem[] = (selectedProject.technologies ?? '').split(',').map((label: string, index: number) => ({
        label: label.trim(),
        variant: (index % 2 === 0 ? "secondary" : "outline") as "secondary" | "outline",
        badgeClass: index % 2 === 0 ?
            'bg-green-500 text-slate-900 text-[0.75rem] font-kanit sm:text-base border-[0.15rem] border-slate-400 hover:scale-110 transition-transform transform duration-300'
            : 'bg-yellow-400 text-slate-900 text-[0.75rem] font-kanit sm:text-base border-[0.15rem] border-slate-400 hover:scale-125 transition-transform transform duration-300'
    })).filter((item: BadgeItem) => item.label.length > 0)


    return (
        <header className="w-full h-fit flex flex-col items-center gap-8">
            <h2
                className="w-full h-fit flex justify-center text-yellow-300 text-2xl sm:text-5xl tracking-wide font-kanit"
            >
                {selectedProject.project_name}
            </h2>
            <DisplayDifficulty selectedProject={selectedProject} />
            <div className="w-full h-fit flex justify-center items-center gap-2 sm:gap-3">
                <span
                    className="text-slate-200 text-[0.8rem] sm:text-base font-semibold font-kanit tracking-wide"
                >
                    {t("stackLabel")}
                </span>
                <BadgeList items={techArray} />
            </div>
            <p className="w-fit h-fit flex flex-col justify-center items-center gap-3">
                <span className="text-md font-semibold tracking-wide text-slate-200">
                    {t("demoLabel")}
                </span>
                <ExternalLink
                    initialColor='#4ade80'
                    hoverColor='#facc15'
                    targetColor='#4ade80'
                    href={selectedProject.project_URL}
                    className="font-kanit text-xl text-green-300 hover:text-green-400"
                >
                    {selectedProject.project_name}
                </ExternalLink>
                <span className="text-md font-semibold font-kanit tracking-wide text-slate-200">
                    Github repo:
                </span>
                <ExternalLink
                    initialColor="#FFA500"
                    hoverColor='#FF4500'
                    targetColor="#FFFF00"
                    href={selectedProject.repo as string}
                    className="text-xl text-yellow-300 font-kanit"
                >
                    {`${selectedProject.project_name} on Github`}
                </ExternalLink>
            </p>
        </header>
    )
}