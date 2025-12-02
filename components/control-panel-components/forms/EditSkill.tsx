
import { type Skill } from "@/types/actionsTypes/actionsTypes"

import SkillForm from "./SkillForm"
//edit skill form

export default function EditSkill({ skillData }: { skillData: Skill }) {
    return (
        <main className="w-full flex flex-col items-center justify-center text-slate-200 pt-[1.5rem]">
            <SkillForm mode="edit" skillData={skillData} />
        </main>
    )
}