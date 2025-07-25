'use client';

import { useState, useActionState } from "react";

import { saveProject, updateProject } from "@/actions/projects";

import LabelElement from "@/components/ui/elements/LabelElement"
import InputElement from "@/components/ui/elements/InputElement"
import InputFileElement from "@/components/ui/elements/InputFileElement"
import SwitchElement from "@/components/ui/elements/SwitchElement"
import SelectElement from "@/components/ui/elements/SelectElement"
import TextAreaElement from "@/components/ui/elements/TextareaElement";
import SubmitBtn from "@/components/ui/elements/SubmitButton"
import CalendarInputIcon from "@/components/ui/elements/CalendarInputIcon"
import DisplayFormMessage from "@/components/home-page-components/contact-section/components/DisplayFormMessage"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { useDatePicker } from "@/hooks/useDatePicker"

import { projectCatArray, difficultyArray } from "@/lib/dataCatArrays";

import { ReturnedType, type Project } from "@/types/actionsTypes/actionsTypes"
import FormTitle from "./components/FormTitle";

interface ProjectFormProps {
    projectData?: Project;
    mode?: 'edit' | 'create';
}

export default function ProjectForm({ projectData, mode = 'create' }: ProjectFormProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>(projectData?.project_category || '');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>(projectData?.difficulty as string || '');
    const { dateInputRef, handleDateInputClick } = useDatePicker();

    const [clearExisting, setClearExisting] = useState<boolean>(false);

    const defaultState = { success: false, error: '' } as ReturnedType;

    const submitFunction = (() => {

        switch (mode) {
            case 'edit':
                return (prevState: ReturnedType, formData: FormData) => updateProject(prevState, formData, clearExisting);
            case 'create':
                return (prevState: ReturnedType, formData: FormData) => saveProject(prevState, formData);
            default:
                throw new Error(`Unknown mode: ${mode}`);
        }
    })();

    const [state, formAction] = useActionState(submitFunction, defaultState)

    return (
        <main className="w-full h-full flex flex-col items-center gap-5">
            {!state?.success && <DisplayFormMessage messages={state?.error} type="error" />}
            {state?.success && <DisplayFormMessage messages={state?.message} type="success" />}
            <FormTitle editTitle="Edit project" createTitle="Create new project" mode={mode} />
            <form action={formAction} className="w-fit h-fit flex flex-col items-center justify-center gap-2 text-slate-200">
                {projectData && <input type="hidden" name="id" id="id" value={projectData?.id} />}
                {projectData && <input type="hidden" name="project_screenName" id="project_screenName" value={projectData?.project_screenName} />}
                <Tabs defaultValue="basic" className="w-full max-w-xl">
                    <TabsList className="grid w-full grid-cols-4 gap-2 bg-transparent">
                        <TabsTrigger value="basic" className="w-full px-5 bg-[#001a0e] text-slate-300 data-[state=active]:bg-[#1d3228] data-[state=active]:text-slate-200">Basic info</TabsTrigger>
                        <TabsTrigger value="files" className="w-full px-5 bg-[#001a0e] text-slate-300 data-[state=active]:bg-[#1d3228] data-[state=active]:text-slate-200">Files</TabsTrigger>
                        <TabsTrigger value="translations" className="w-full px-5 bg-[#001a0e] text-slate-300 data-[state=active]:bg-[#1d3228] data-[state=active]:text-slate-200">Translations</TabsTrigger>
                        <TabsTrigger value="metadata" className="w-full px-5 bg-[#001a0e] text-slate-300 data-[state=active]:bg-[#1d3228] data-[state=active]:text-slate-200">Metadata</TabsTrigger>
                    </TabsList>

                    {/* === Basic Info === */}
                    <TabsContent value="basic" className="flex flex-col gap-4">
                        <div>
                            <LabelElement htmlFor="project_name" className="font-bold pb-1 ml-2 text-lg tracking-wide">
                                Project name:
                            </LabelElement>
                            <InputElement
                                required
                                type="text"
                                id="project_name"
                                name="project_name"
                                defaultValue={projectData?.project_name}
                                placeholder="min 10 characters, max 300 characters"
                                className="text-md pl-2 tracking-wide w-full"
                            />
                        </div>

                        <div>
                            <LabelElement htmlFor="project_category" className="font-bold pb-1 ml-2 text-lg tracking-wide">
                                Select project category:
                            </LabelElement>
                            <SelectElement
                                value={selectedCategory}
                                onChange={(val) => setSelectedCategory(val)}
                                options={projectCatArray}
                                placeholder="project category"
                                className="w-full"
                            />
                            <input type="hidden" name="project_category" value={selectedCategory} />
                        </div>

                        <div>
                            <LabelElement htmlFor="goal" className="font-bold pb-1 ml-2 text-lg tracking-wide">Project goal:</LabelElement>
                            <TextAreaElement
                                required
                                id="goal"
                                name="goal"
                                defaultValue={projectData?.goal as string}
                                placeholder="min 5 characters, max 300 characters"
                                className="text-md px-2 tracking-wide w-full"
                            />
                        </div>

                        <div>
                            <LabelElement htmlFor="project_description" className="font-bold pb-1 ml-2 text-lg tracking-wide">Project description:</LabelElement>
                            <TextAreaElement
                                required
                                id="project_description"
                                name="project_description"
                                defaultValue={projectData?.project_description as string}
                                placeholder="min 20 characters, max 300 characters"
                                className="text-md px-2 tracking-wide w-full"
                            />
                        </div>
                        <div>
                            <LabelElement htmlFor="conclusion" className="font-bold pb-1 ml-2 text-lg tracking-wide">Conclusion:</LabelElement>
                            <TextAreaElement
                                required
                                id="conclusion"
                                name="conclusion"
                                defaultValue={projectData?.conclusion as string}
                                placeholder="min 20 characters, max 65535 characters"
                                className="text-md px-2 tracking-wide w-full"
                            />
                        </div>
                    </TabsContent>

                    {/* === Files === */}
                    <TabsContent value="files" className="flex flex-col gap-4">
                        {mode === 'edit' && (
                            <SwitchElement
                                id="clear_existing"
                                name="clear_existing"
                                checked={clearExisting}
                                onChange={() => setClearExisting(!clearExisting)}
                                label="Clear existing project files"
                                labelPosition="right"
                                size="md"
                            />
                        )}

                        <div>
                            <LabelElement htmlFor="project_main_screens" className="font-bold pb-1 ml-2 text-lg tracking-wide">Main project files:</LabelElement>
                            <InputFileElement
                                id="project_main_screens"
                                name="project_main_screens"
                                multiple
                                className="text-md px-2 tracking-wide w-full"
                            />
                        </div>

                        <div>
                            <LabelElement htmlFor="project_gallery_screens" className="font-bold pb-1 ml-2 text-lg tracking-wide">Project screenshots:</LabelElement>
                            <InputFileElement
                                id="project_gallery_screens"
                                name="project_gallery_screens"
                                multiple
                                className="text-md px-2 tracking-wide w-full"
                            />
                        </div>
                    </TabsContent>

                    {/* === Translations === */}
                    <TabsContent value="translations" className="flex flex-col gap-4">
                        <div>
                            <LabelElement htmlFor="goal_pl" className="font-bold pb-1 ml-2 text-lg tracking-wide">Goal (PL):</LabelElement>
                            <TextAreaElement
                                required
                                id="goal_pl"
                                name="goal_pl"
                                defaultValue={projectData?.goal_pl as string}
                                placeholder="min 5 characters, max 300 characters"
                                className="text-md px-2 tracking-wide w-full"
                            />
                        </div>
                        <div>
                            <LabelElement htmlFor="description_pl" className="font-bold pb-1 ml-2 text-lg tracking-wide">Description (PL):</LabelElement>
                            <TextAreaElement
                                required
                                id="description_pl"
                                name="description_pl"
                                defaultValue={projectData?.description_pl as string}
                                placeholder="min 20 characters, max 400 characters"
                                className="text-md px-2 tracking-wide w-full"
                            />
                        </div>
                        <div>
                            <LabelElement htmlFor="long_text_pl" className="font-bold pb-1 ml-2 text-lg tracking-wide">Long description (PL):</LabelElement>
                            <TextAreaElement
                                required
                                id="long_text_pl"
                                name="long_text_pl"
                                defaultValue={projectData?.long_text_pl as string}
                                placeholder="min 20 characters, max 65535 characters"
                                className="text-md px-2 tracking-wide w-full"
                            />
                        </div>
                        <div>
                            <LabelElement htmlFor="conclusion_pl" className="font-bold pb-1 ml-2 text-lg tracking-wide">Conclusion (PL):</LabelElement>
                            <TextAreaElement
                                required
                                id="conclusion_pl"
                                name="conclusion_pl"
                                defaultValue={projectData?.conclusion_pl as string}
                                placeholder="min 20 characters, max 300 characters"
                                className="text-md px-2 tracking-wide w-full"
                            />
                        </div>
                    </TabsContent>

                    {/* === Metadata === */}
                    <TabsContent value="metadata" className="flex flex-col gap-4">
                        <div>
                            <LabelElement htmlFor="project_URL" className="font-bold pb-1 ml-2 text-lg tracking-wide">Project URL:</LabelElement>
                            <InputElement
                                required
                                type="url"
                                id="project_URL"
                                name="project_URL"
                                defaultValue={projectData?.project_URL}
                                placeholder="min 5 characters, max 300 characters"
                                className="text-md px-2 tracking-wide w-full"
                            />
                        </div>

                        <div>
                            <LabelElement htmlFor="repo" className="font-bold pb-1 ml-2 text-lg tracking-wide">Project repository:</LabelElement>
                            <InputElement
                                required
                                type="url"
                                id="repo"
                                name="repo"
                                defaultValue={projectData?.repo as string}
                                placeholder="min 5 characters, max 100 characters"
                                className="text-md px-2 tracking-wide w-full"
                            />
                        </div>

                        <div>
                            <LabelElement htmlFor="technologies" className="font-bold pb-1 ml-2 text-lg tracking-wide">Technologies:</LabelElement>
                            <InputElement
                                required
                                type="text"
                                id="technologies"
                                name="technologies"
                                defaultValue={projectData?.technologies as string}
                                placeholder="min 10 characters, max 250 characters"
                                className="text-md px-2 tracking-wide w-full"
                            />
                        </div>

                        <div>
                            <LabelElement htmlFor="difficulty" className="font-bold pb-1 ml-2 text-lg tracking-wide">Project difficulty:</LabelElement>
                            <SelectElement
                                value={selectedDifficulty}
                                onChange={(val) => setSelectedDifficulty(val)}
                                options={difficultyArray}
                                placeholder="Select difficulty"
                                className="w-full"
                            />
                            <input type="hidden" name="difficulty" value={selectedDifficulty} />
                        </div>

                        <div>
                            <LabelElement htmlFor="end_date" className="font-bold pb-1 ml-2 text-lg tracking-wide">End date:</LabelElement>
                            <div
                                className="relative w-full flex flex-col items-center cursor-pointer"
                                onClick={handleDateInputClick}
                            >
                                <InputElement
                                    required
                                    ref={dateInputRef}
                                    type="date"
                                    name="end_date"
                                    id="end_date"
                                    className="w-full pr-10"
                                    defaultValue={
                                        projectData?.end_date
                                            ? new Date(projectData.end_date).toISOString().split('T')[0]
                                            : ''
                                    }
                                />
                                <CalendarInputIcon />
                            </div>
                        </div>

                        <div>
                            <LabelElement htmlFor="long_text" className="font-bold pb-1 ml-2 text-lg tracking-wide">Long description:</LabelElement>
                            <TextAreaElement
                                required
                                id="long_text"
                                name="long_text"
                                defaultValue={projectData?.long_text as string}
                                placeholder="min 20 characters, max 65535 characters"
                                className="text-md pl-2 tracking-wide w-full"
                            />
                        </div>
                    </TabsContent>
                </Tabs>
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
