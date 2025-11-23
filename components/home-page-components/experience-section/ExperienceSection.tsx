import { type GetExperiencesType } from "@/types/actionsTypes/actionsTypes";



export default async function ExperienceSection({experiences}: {experiences: GetExperiencesType | undefined}) {
    if (!experiences || 'error' in experiences) {
        return <p>Failed to fetch experiences</p>
    }

    return (
        <section id="experienceSection" className="w-full h-fit flex flex-col text-slate-200 snap-center">
            <span className="text-4xl text-green-400 ml-2">Experience &#123;</span>
        </section>
    )
}