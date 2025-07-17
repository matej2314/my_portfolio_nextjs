
import { type Skill } from "@/types/actionsTypes/actionsTypes"

import SkillForm from "./SkillForm"


export default function EditSkill({ skillData }: { skillData: Skill }) {
    return (
        <main className="w-full flex justify-center text-slate-200 pt-[1.5rem]">
            <SkillForm mode="edit" skillData={skillData} />
        </main>
    )
}