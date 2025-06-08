import BaseMenu from "@/components/BaseMenu";
import { getProjectMenuArray } from "@/lib/menuArrays";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function ProjectDetailsMenu({ github, demo }: { github: string, demo: string }) {

    const projectMenuArray = getProjectMenuArray(github, demo);

    return (
        <>
            <BaseMenu array={projectMenuArray} />
            <LanguageSwitcher />
        </>
    )
}