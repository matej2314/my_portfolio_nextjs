'use client';

import { useState } from "react";
import { useActionState } from "react";
import { saveProject } from "@/actions/projects";

import LabelElement from "@/components/ui/elements/LabelElement"
import InputElement from "@/components/ui/elements/InputElement"
import SelectElement from "@/components/ui/elements/SelectElement"
import TextAreaElement from "@/components/ui/elements/TextareaElement";
import SubmitBtn from "@/components/ui/elements/SubmitButton"
import CalendarInputIcon from "@/components/ui/elements/CalendarInputIcon"

import { projectCatArray, difficultyArray } from "@/lib/dataCatArrays";

export default function SaveProjectForm() {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
    const [state, formAction] = useActionState(saveProject, { success: false, error: '' })

    return (
        <>
            {state?.success && <p className="text-green-400">{state.message}</p>}
            {state?.success === false && <p className="text-red-400">{state.error}</p>}
            <form action={formAction} className="w-fit h-fit flex flex-col items-center justify-center gap-2 text-slate-200">
                <LabelElement htmlFor="project_name" className="font-bold pb-1 ml-2 text-lg tracking-wide">
                    Project name:
                </LabelElement>
                <InputElement
                    type="text"
                    title="input project name"
                    id="project_name"
                    name="project_name"
                    required={false}
                    className="text-md pl-2 tracking-wide w-[16rem]"
                />
                <LabelElement htmlFor="project_category" className="font-bold pb-1 ml-2 text-lg tracking-wide">
                    Select project category:
                </LabelElement>
                <SelectElement
                    value={selectedCategory}
                    onChange={(val) => setSelectedCategory(val)}
                    options={projectCatArray}
                    placeholder="project category"
                    className="w-[15rem]"
                />
                <input type="hidden" id="project_category" name="project_category" value={selectedCategory} />
                <div className="w-full h-fit flex justify-around">
                    <LabelElement htmlFor="project_main_screens" className="font-bold pb-1 ml-2 text-lg tracking-wide">
                        Main project files:
                    </LabelElement>
                    <InputElement
                        type="file"
                        title="project main screens"
                        id="project_main_screens"
                        name="project_main_screens"
                        required={false}
                        className="text-md pl-2 tracking-wide w-[16rem]"
                        multiple={true}
                    />
                    <LabelElement htmlFor="project_gallery_screens" className="font-bold pb-1 ml-2 text-lg tracking-wide">
                        Project screenshots:
                    </LabelElement>
                    <InputElement
                        type="file"
                        title="project gallery screens"
                        id="project_gallery_screens"
                        name="project_gallery_screens"
                        required={false}
                        className="text-md pl-2 tracking-wide w-[16rem]"
                        multiple={true}
                    />
                </div>
                <LabelElement htmlFor="project_URL" className="font-bold pb-1 ml-2 text-lg tracking-wide">
                    Project url:
                </LabelElement>
                <InputElement
                    type="url"
                    title="project url"
                    name="project_URL"
                    id="project_URL"
                    required={false}
                    className="text-md pl-2 tracking-wide w-[16rem]"
                />
                <LabelElement htmlFor="goal" className="font-bold pb-1 ml-2 text-lg tracking-wide">
                    Project goal:
                </LabelElement>
                <TextAreaElement
                    id="goal"
                    name="goal"
                    required={false}
                    className="text-md pl-2 tracking-wide w-[16rem]"
                />
                <LabelElement htmlFor="project_description" className="font-bold pb-1 ml-2 text-lg tracking-wide">
                    Project description:
                </LabelElement>
                <TextAreaElement
                    id="project_description"
                    name="project_description"
                    required={false}
                    className="text-md pl-2 tracking-wide w-[16rem]"
                />
                <LabelElement htmlFor="repo" className="font-bold pb-1 ml-2 text-lg tracking-wide">
                    Project repository:
                </LabelElement>
                <InputElement
                    type="url"
                    title="repo link"
                    name="repo"
                    id="repo"
                    required={false}
                    className="text-md pl-2 tracking-wide w-[16rem]"
                />
                <LabelElement htmlFor="technologies" className="font-bold pb-1 ml-2 text-lg tracking-wide">
                    Technologies
                </LabelElement>
                <InputElement
                    type="string"
                    title="used technologies"
                    name="technologies"
                    id="technologies"
                    required={false}
                    className="text-md pl-2 tracking-wide w-[16rem]"
                />
                <LabelElement htmlFor="difficulty" className="font-bold pb-1 ml-2 text-lg tracking-wide">
                    Project difficulty:
                </LabelElement>
                <SelectElement
                    value={selectedDifficulty}
                    onChange={(val) => setSelectedDifficulty(val)}
                    options={difficultyArray}
                    placeholder="project category"
                    className="w-[15rem]"
                />
                <input type="hidden" name="difficulty" id="difficulty" value={selectedDifficulty} />
                <LabelElement htmlFor="end_date" className="font-bold pb-1 ml-2 text-lg tracking-wide">
                    End date:
                </LabelElement>
                <div className="relative w-[16rem] flex flex-col items-center">
                    <InputElement
                        type="date"
                        name="end_date"
                        id="end_date"
                        className="w-full pr-10"
                        required={false}
                    />
                    <CalendarInputIcon />
                </div>
                <LabelElement htmlFor="long_text" className="font-bold pb-1 ml-2 text-lg tracking-wide">
                    Long description:
                </LabelElement>
                <TextAreaElement
                    id="long_text"
                    name="long_text"
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
