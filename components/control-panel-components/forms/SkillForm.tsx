'use client'
import { useState, useActionState } from "react"

import { saveSkill, updateSkill } from "@/actions/skills"
import { getSubmitFunction } from "@/lib/utils/getSubmitFunction"

import { useSkillsCategories } from "@/hooks/useSkillsCategories"

import LabelElement from "@/components/ui/elements/LabelElement"
import InputElement from "@/components/ui/elements/InputElement"
import SwitchElement from "@/components/ui/elements/SwitchElement"
import SkillCatInput from "./components/SkillCatInput"
import SubmitBtn from "@/components/ui/elements/SubmitButton"
import FormTitle from "./components/FormTitle"

import { type SkillFormProps } from '@/types/forms/skill-form';

export default function SkillForm({ skillData, mode = 'create' }: SkillFormProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>(skillData?.skill_cat || '');
    const [customCategory, setCustomCategory] = useState<{ active: boolean, name: string }>({ active: false, name: '' });

    const { categories } = useSkillsCategories();

    const submitFunction = getSubmitFunction({
        create: saveSkill,
        edit: updateSkill
    }, mode);

    const [state, formAction] = useActionState(submitFunction, { success: false, error: '' })

    return (
        <>
            {state?.success && <p className="text-green-400">{state.message}</p>}
            {state?.success === false && <p className="text-red-400">{state.error}</p>}
            <FormTitle editTitle="Edit skill" createTitle="Create new skill" mode={mode} />
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
                    placeholder="min 5 characters, max 20 characters"
                    defaultValue={skillData?.skill_name}
                />
                <LabelElement htmlFor="skill_cat" className="font-bold pb-1 ml-2 text-lg tracking-wide">
                    Select skill category:
                </LabelElement>
                <SwitchElement
                    id="is_custom_category"
                    name="custom category"
                    checked={customCategory.active}
                    onChange={() => setCustomCategory({ active: !customCategory.active, name: customCategory.name })}
                    label="Custom category"
                    labelPosition="right"
                    size="sm"
                />
                <SkillCatInput
                    isCustomCategory={customCategory.active}
                    selectedCategory={selectedCategory}
                    onSelectedCategory={setSelectedCategory}
                    categories={categories}
                />
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
                    placeholder="min 5 characters, max 30 characters"
                    required={false}
                    className="text-md pl-2 tracking-wide w-[16rem]"
                    defaultValue={skillData?.icon_name as string}
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
                    placeholder="min 5 characters, max 10 characters"
                    required={false}
                    className="text-md pl-2 tracking-wide w-[16rem]"
                    defaultValue={skillData?.icon_color as string}
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