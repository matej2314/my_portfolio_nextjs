'use client';

import { useState, useActionState } from "react";

import { saveProject, updateProject } from "@/actions/projects";

import LabelElement from "@/components/ui/elements/LabelElement"
import InputElement from "@/components/ui/elements/InputElement"
import InputFileElement from "@/components/ui/elements/InputFileElement"
import SelectElement from "@/components/ui/elements/SelectElement"
import TextAreaElement from "@/components/ui/elements/TextareaElement";
import SubmitBtn from "@/components/ui/elements/SubmitButton"
import CalendarInputIcon from "@/components/ui/elements/CalendarInputIcon"
import DisplayFormMessage from "@/components/home-page-components/contact-section/components/DisplayFormMessage"

import { useDatePicker } from "@/hooks/useDatePicker"

import { projectCatArray, difficultyArray } from "@/lib/dataCatArrays";

import { type Project } from "@/types/actionsTypes/actionsTypes"

interface ProjectFormProps {
    projectData?: Project;
    mode?: 'edit' | 'create';
}

export default function ProjectForm({ projectData, mode = 'create' }: ProjectFormProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>(projectData?.project_category || '');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>(projectData?.difficulty as string || '');

    const { dateInputRef, handleDateInputClick } = useDatePicker();

    const submitFunction = (() => {

        switch (mode) {
            case 'edit':
                return updateProject;
            case 'create':
                return saveProject;
            default:
                throw new Error(`Unknown mode: ${mode}`);
        }
    })();

    const [state, formAction] = useActionState(submitFunction, { success: false, error: '' })

    return (
        <main className="w-full h-full flex flex-col items-center gap-5 mt-4">
            {!state?.success && <DisplayFormMessage messages={state?.error} type="error" />}
            {state?.success && <DisplayFormMessage messages={state?.message} type="success" />}
            <form action={formAction} className="w-fit h-fit flex flex-col items-center justify-center gap-2 text-slate-200">
                {projectData && <input type="hidden" name="id" id="id" value={projectData?.id} />}
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
                    placeholder="min 10 characters, max 300 characters"
                    defaultValue={projectData?.project_name}
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
                <div className="w-full h-fit flex flex-col justify-center items-center gap-3">
                    <LabelElement htmlFor="project_main_screens" className="w-fit font-bold pb-1 ml-2 text-lg tracking-wide">
                        Main project files:
                    </LabelElement>
                    <InputFileElement
                        id="project_main_screens"
                        name="project_main_screens"
                        required={false}
                        className="text-md pl-2 tracking-wide w-fit"
                        multiple={true}
                    />
                    <LabelElement htmlFor="project_gallery_screens" className="font-bold pb-1 ml-2 text-lg tracking-wide">
                        Project screenshots:
                    </LabelElement>
                    <InputFileElement
                        id="project_gallery_screens"
                        name="project_gallery_screens"
                        required={false}
                        className="w-fit text-md pl-2 tracking-wide"
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
                    placeholder="min 5 characters, max 100 characters"
                    defaultValue={projectData?.project_URL}
                />
                <LabelElement htmlFor="goal" className="font-bold pb-1 ml-2 text-lg tracking-wide">
                    Project goal:
                </LabelElement>
                <TextAreaElement
                    id="goal"
                    name="goal"
                    required={false}
                    className="text-md pl-2 tracking-wide w-[16rem]"
                    placeholder="min 5 characters, max 200 characters"
                    defaultValue={projectData?.goal as string}
                />
                <LabelElement htmlFor="project_description" className="font-bold pb-1 ml-2 text-lg tracking-wide">
                    Project description:
                </LabelElement>
                <TextAreaElement
                    id="project_description"
                    name="project_description"
                    required={false}
                    className="text-md pl-2 tracking-wide w-[16rem]"
                    placeholder="min 20 characters, max 300 characters"
                    defaultValue={projectData?.project_description as string}
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
                    placeholder="min 5 characters, max 100 characters"
                    defaultValue={projectData?.repo as string}
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
                    placeholder="min 10 characters, max 250 characters"
                    defaultValue={projectData?.technologies as string}
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
                <div
                    className="relative w-[16rem] flex flex-col items-center cursor-pointer"
                    onClick={handleDateInputClick}
                >
                    <InputElement
                        ref={dateInputRef}
                        type="date"
                        name="end_date"
                        id="end_date"
                        className="w-full pr-10"
                        required={false}
                        defaultValue={projectData?.end_date ? new Date(projectData.end_date).toISOString().split('T')[0] : ''}
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
                    placeholder="min 20 characters, max 500 characters"
                    defaultValue={projectData?.long_text as string}
                />
                <SubmitBtn
                    pendingTxt='Saving...'
                    idleTxt='Save'
                    backgroundColor="bg-yellow-200"
                    hoverClass="hover:bg-yellow-300"
                />
            </form>
        </main>
    )
}
