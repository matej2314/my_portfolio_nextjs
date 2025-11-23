import { type GetExperiencesType } from "@/types/actionsTypes/actionsTypes";



export default async function ExperienceSection({experiences}: {experiences: GetExperiencesType | undefined}) {
    if (!experiences || 'error' in experiences) {
        return <p>Failed to fetch experiences</p>
    }

    const experienceData = experiences.experiences;

    return (
        <section id="experienceSection" className="w-full h-fit flex flex-col text-slate-200 snap-center">
            <span className="text-4xl text-green-400 ml-2">Experience &#123;</span>
            <div>
                {experienceData.map(experience => (
                    <div key={experience.uuid}>
                        <h3 className="text-2xl text-green-400">{experience.employer}</h3>
                        <p className="text-lg text-white">{experience.position}</p>
                        <p className="text-lg text-white">{experience.hourly_rate}</p>
                        <p className="text-lg text-white">{new Date(experience.employed_since).toLocaleDateString()}</p>
                        <p className="text-lg text-white">{new Date(experience.employed_to).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
            <span className='text-4xl text-green-400 w-full ml-2 mt-[13rem] lg:mt-[4rem]'>&#125;</span>
        </section>
    )
}