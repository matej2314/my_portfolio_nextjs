import BaseMenu from "@/components/BaseMenu";
import { getProjectMenuArray } from "@/lib/menuArrays";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function ProjectDetailsMenu({ github, demo }: { github: string, demo: string }) {

    const projectMenuArray = getProjectMenuArray(github, demo);

    return (
        <div className="w-screen h-[2rem] flex justify-center md:translate-x-1/8 md:-translate-y-2">
            <BaseMenu array={projectMenuArray} />
        </div>
    )
}