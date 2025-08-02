'use client';

import { useState, useActionState } from "react";

import { saveProject, updateProject } from "@/actions/projects";
import { getSubmitFunctionWithParams } from "@/lib/utils/getSubmitFunction"

import LabelElement from "@/components/ui/elements/LabelElement"
import InputElement from "@/components/ui/elements/InputElement"
import InputFileElement from "@/components/ui/elements/InputFileElement"
import SwitchElement from "@/components/ui/elements/SwitchElement"
import SelectElement from "@/components/ui/elements/SelectElement"
import TextAreaElement from "@/components/ui/elements/TextareaElement";
import TabsListElement from "@/components/ui/elements/TabsListElement";
import SubmitBtn from "@/components/ui/elements/SubmitButton"
import CalendarInputIcon from "@/components/ui/elements/CalendarInputIcon"
import DisplayFormMessage from "@/components/home-page-components/contact-section/components/DisplayFormMessage"
import { Tabs } from "@/components/ui/tabs";
import CustomTabsContent from "@/components/ui/elements/CustomTabsContent";
import FormTitle from "./components/FormTitle";

import { useDatePicker } from "@/hooks/useDatePicker"

import { defaultData } from "@/lib/defaultData";
import { projectCatArray, difficultyArray } from "@/lib/dataCatArrays";
import { projectFormTriggers } from "@/lib/control-panel/ProjectFormTriggers";

import { type ProjectFormProps, type SelectedDetailsState } from '@/types/forms/project-form';
import { type ReturnedType } from "@/types/actionsTypes/actionsTypes"

export default function ProjectForm({ projectData, mode = 'create' }: ProjectFormProps) {
    const [selectedDetails, setSelectedDetails] = useState<SelectedDetailsState>({
        selectedCategory: projectData?.project_category || '',
        selectedDifficulty: projectData?.difficulty as string || '',
        selectedTab: 'basic'
    });
    const [clearExisting, setClearExisting] = useState<boolean>(false);
    const { dateInputRef, handleDateInputClick } = useDatePicker();
    const defaultState = defaultData.returnedTypeDefault as ReturnedType;

    const submitFunction = getSubmitFunctionWithParams({
        create: (prevState: ReturnedType, formData: FormData) => saveProject(prevState, formData),
        edit: (prevState: ReturnedType, formData: FormData) => updateProject(prevState, formData, clearExisting)
    }, mode, clearExisting);

    const [state, formAction] = useActionState(submitFunction, defaultState)

    return (
        <main className="w-full h-full flex flex-col items-center gap-5">
            {!state?.success && <DisplayFormMessage messages={state?.error} type="error" />}
            {state?.success && <DisplayFormMessage messages={state?.message} type="success" />}
            <FormTitle editTitle="Edit project" createTitle="Create new project" mode={mode} />
            <form action={formAction} className="w-fit h-fit flex flex-col items-center justify-center gap-2 text-slate-200">
                {projectData && <input type="hidden" name="id" id="id" value={projectData?.id} />}
                {mode === 'edit' && <input type="hidden" name="project_screenName" id="project_screenName" value={projectData?.project_screenName || ''} />}
                <Tabs
                    defaultValue="basic"
                    value={selectedDetails.selectedTab}
                    onValueChange={(val) => setSelectedDetails({ ...selectedDetails, selectedTab: val })} className="w-full max-w-xl">
                    <TabsListElement triggers={projectFormTriggers} />

                    <CustomTabsContent value="basic" selectedValue={selectedDetails.selectedTab} className="flex flex-col gap-4">
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
                                value={selectedDetails.selectedCategory}
                                onChange={(val) => setSelectedDetails({ ...selectedDetails, selectedCategory: val })}
                                options={projectCatArray}
                                placeholder="project category"
                                className="w-full"
                            />
                            <input type="hidden" name="project_category" value={selectedDetails.selectedCategory} />
                        </div>

                        <div>
                            <LabelElement htmlFor="goal" className="font-bold pb-1 ml-2 text-lg tracking-wide">Project goal:</LabelElement>
                            <TextAreaElement
                                required={false}
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
                                required={false}
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
                                required={false}
                                id="conclusion"
                                name="conclusion"
                                defaultValue={projectData?.conclusion as string}
                                placeholder="min 20 characters, max 65535 characters"
                                className="text-md px-2 tracking-wide w-full"
                            />
                        </div>
                    </CustomTabsContent>

                    <CustomTabsContent value="files" selectedValue={selectedDetails.selectedTab} className="flex flex-col gap-4">
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
                    </CustomTabsContent>

                    <CustomTabsContent value="translations" selectedValue={selectedDetails.selectedTab} className="flex flex-col gap-4">
                        <div>
                            <LabelElement htmlFor="goal_pl" className="font-bold pb-1 ml-2 text-lg tracking-wide">Goal (PL):</LabelElement>
                            <TextAreaElement
                                required={false}
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
                                required={false}
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
                                required={false}
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
                                required={false}
                                id="conclusion_pl"
                                name="conclusion_pl"
                                defaultValue={projectData?.conclusion_pl as string}
                                placeholder="min 20 characters, max 300 characters"
                                className="text-md px-2 tracking-wide w-full"
                            />
                        </div>
                    </CustomTabsContent>

                    <CustomTabsContent value="metadata" selectedValue={selectedDetails.selectedTab} className="flex flex-col gap-4">
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
                                required={false}
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
                                required={false}
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
                                value={selectedDetails.selectedDifficulty}
                                onChange={(val) => setSelectedDetails({ ...selectedDetails, selectedDifficulty: val })}
                                options={difficultyArray}
                                placeholder="Select difficulty"
                                className="w-full"
                            />
                            <input type="hidden" name="difficulty" value={selectedDetails.selectedDifficulty} />
                        </div>

                        <div>
                            <LabelElement htmlFor="end_date" className="font-bold pb-1 ml-2 text-lg tracking-wide">End date:</LabelElement>
                            <div
                                className="relative w-full flex flex-col items-center cursor-pointer"
                                onClick={handleDateInputClick}
                            >
                                <InputElement
                                    ref={dateInputRef}
                                    type="date"
                                    required={false}
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
                                required={false}
                                id="long_text"
                                name="long_text"
                                defaultValue={projectData?.long_text as string}
                                placeholder="min 20 characters, max 65535 characters"
                                className="text-md pl-2 tracking-wide w-full"
                            />
                        </div>
                    </CustomTabsContent>
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
