import BaseMenu from "@/components/BaseMenu";
import { getProjectMenuArray } from "@/lib/arrays/menuArrays";

export default function ProjectDetailsMenu({ github, demo }: { github: string, demo: string }) {

    const projectMenuArray = getProjectMenuArray(github, demo);

    return (
        <div className="w-full border-b border-green-900/20 bg-[#000805]">
            <BaseMenu array={projectMenuArray} />
        </div>
    )
}