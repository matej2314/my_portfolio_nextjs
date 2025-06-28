'use client'
import { useState } from "react"
import { useActionState } from "react"
import { saveSkill } from "@/actions/skills"

import { skillsCatArray } from "@/lib/dataCatArrays"

import LabelElement from "@/components/ui/elements/LabelElement"
import InputElement from "@/components/ui/elements/InputElement"
import SelectElement from "@/components/ui/elements/SelectElement"
import SubmitBtn from "@/components/ui/elements/SubmitButton"


export default function SaveSkillForm() {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [state, formAction] = useActionState(saveSkill, { success: false, error: '' })

    return (
        <>
            {state?.success && <p className="text-green-400">{state.message}</p>}
            {state?.success === false && <p className="text-red-400">{state.error}</p>}
            <form action={formAction} className="w-fit h-fit flex flex-col items-center justify-center gap-2 text-slate-200">
                <LabelElement
                    htmlFor="skill_name"
                    className="font-bold pb-1 ml-2 text-lg tracking-wide"
                >
                    Skill name:
                </LabelElement>
                <InputElement
                    type="text"
                    title="Input skill name"
                    name="skill_name"
                    id="skill_name"
                    required={false}
                    className="text-md pl-2 tracking-wide w-[16rem]"
                />
                <LabelElement htmlFor="skill_cat" className="font-bold pb-1 ml-2 text-lg tracking-wide">
                    Select skill category:
                </LabelElement>
                <SelectElement
                    value={selectedCategory}
                    onChange={(val) => setSelectedCategory(val)}
                    options={skillsCatArray}
                    placeholder="skill category"
                    className="w-[15rem]"
                />
                <input type="hidden" id="skill_cat" name="skill_cat" value={selectedCategory} />
                <LabelElement
                    htmlFor="icon_name"
                    className="font-bold pb-1 ml-2 text-lg tracking-wide"
                >
                    Skill icon name:
                </LabelElement>
                <InputElement
                    type="text"
                    title="skill icon name"
                    name="icon_name"
                    id="icon_name"
                    required={false}
                    className="text-md pl-2 tracking-wide w-[16rem]"
                />
                <LabelElement
                    htmlFor="icon_color"
                    className="font-bold pb-1 ml-2 text-lg tracking-wide"
                >
                    Skill icon color:
                </LabelElement>
                <InputElement
                    type="text"
                    title="skill icon color"
                    name="icon_color"
                    id="icon_color"
                    required={false}
                    className="text-md pl-2 tracking-wide w-[16rem]"
                />
                <SubmitBtn
                    pendingTxt='Saving...'
                    idleTxt='Save'
                    backgroundColor="bg-yellow-200"
                    hoverClass="hover:bg-yellow-300"
                />
            </form>
        </>
    )
}