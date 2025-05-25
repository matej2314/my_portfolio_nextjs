import BadgeList from "./BadgeList";
import ExternalLink from "@/components/ExternalLink";
import DisplayDifficulty from "./DisplayProjectDifficulty";

import { type DetailsHeaderProps } from "@/types/detailsPageTypes";
import { type BadgeItem } from "./BadgeList";

export default async function DetailsHeader({ selectedProject }: DetailsHeaderProps) {

    const techArray: BadgeItem[] = (selectedProject.technologies ?? '').split(',').map((label, index) => ({
        label: label.trim(),
        variant: (index % 2 === 0 ? "secondary" : "outline") as "secondary" | "outline",
        badgeClass: index % 2 === 0 ?
            'bg-green-500 text-slate-900 border-[0.15rem] border-slate-400 hover:scale-110 transition-transform transform duration-300'
            : 'bg-yellow-400 text-slate-900 border-[0.15rem] border-slate-400 hover:scale-125 transition-transform transform duration-300'
    })).filter((item) => item.label.length > 0)


    return (
        <header className="w-full h-fit flex flex-col items-center  gap-8">
            <h2
                className="w-full h-fit flex justify-center text-yellow-300 text-5xl tracking-wide font-mono"
            >
                {selectedProject.project_name}
            </h2>
            <DisplayDifficulty selectedProject={selectedProject} />
            <div className="w-fit h-fit flex gap-3">
                <span className="text-slate-200 font-semibold">Stack:</span>
                <BadgeList items={techArray} />
            </div>
            <p className="w-fit h-fit flex flex-col justify-center items-center gap-3">
                <span className="text-md font-semibold text-slate-200">
                    Link to the project:
                </span>
                <ExternalLink
                    initialColor='#4ade80'
                    hoverColor='#facc15'
                    targetColor='#4ade80'
                    href={selectedProject.project_URL}
                    className="text-xl text-green-300 hover:text-green-400"
                >
                    {selectedProject.project_name}
                </ExternalLink>
                <span className="text-md font-semibold text-slate-200">
                    Github repo:
                </span>
                <ExternalLink
                    initialColor="#FFA500"
                    hoverColor='#FF4500'
                    targetColor="#FFFF00"
                    href={selectedProject.repo as string}
                    className="text-xl text-yellow-300"
                >
                    {`${selectedProject.project_name} on Github`}
                </ExternalLink>
            </p>
        </header>
    )
}