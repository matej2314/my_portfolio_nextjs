import { getSkills } from "@/actions/skills";

import SkillsList from "../SkillsList";

export default async function SkillsSection() {
    const skills = await getSkills();

    if ('error' in skills) {
        console.log(skills.error);
        return <div>Failed to fetch skills data</div>
    }

    return (
        <section id="skillsSection" className="w-full h-[100dvh] flex flex-col mb-5">
            <span className="text-4xl text-green-400 ml-2">Skills &#123;</span>
            <section className="w-full h-full flex justify-around mt-10">
                <div className="w-1/3 text-slate-200 h-full flex items-center">
                    <p className="w-full h-fit text-lg">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia quo repellendus animi cum odio aperiam delectus sequi, dolorum, aut voluptates eum corporis reiciendis in optio velit, ad suscipit? Error labore natus ea, dolor nam rem quod vitae doloremque officiis facilis rerum repellat distinctio beatae esse sed aliquam? Cupiditate laudantium nemo numquam ullam, fugiat culpa deleniti aliquid alias quae hic quaerat labore corrupti officiis corporis distinctio aut tempore fuga totam odio officia reiciendis facere laborum. Omnis, beatae. Incidunt totam qui voluptas, in saepe aliquid unde quae minus ullam ipsa amet aperiam ducimus, vero ea nesciunt laboriosam asperiores id sequi illo? Ea?
                    </p>
                </div>
                <div className="w-1/3 flex flex-col gap-3">
                    <SkillsList skills={skills.skills} />

                </div>
            </section>
            <span className="text-green-400 text-4xl ml-2 mt-5">&#125;</span>
        </section>
    )

}