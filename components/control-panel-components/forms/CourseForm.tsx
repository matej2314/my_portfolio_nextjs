'use client'
import { useState, useActionState } from "react"

import { saveCourse, updateCourse } from "@/actions/courses"

import LabelElement from "@/components/ui/elements/LabelElement"
import InputElement from "@/components/ui/elements/InputElement"
import SelectElement from "@/components/ui/elements/SelectElement"
import SubmitBtn from "@/components/ui/elements/SubmitButton"
import CalendarInputIcon from "@/components/ui/elements/CalendarInputIcon"
import DisplayFormMessage from "@/components/home-page-components/contact-section/components/DisplayFormMessage"
import FormTitle from "./components/FormTitle"

import { useDatePicker } from "@/hooks/useDatePicker"

import { courseCatArray } from "@/lib/dataCatArrays"

import { type CourseFormProps } from '@/types/forms/course-form';


export default function CourseForm({ courseData, mode = 'create' }: CourseFormProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>(courseData?.course_category || '');
    const { dateInputRef, handleDateInputClick } = useDatePicker();

    const submitFunction = (() => {

        switch (mode) {
            case 'edit':
                return updateCourse;
            case 'create':
                return saveCourse;
            default:
                throw new Error(`Unknown mode: ${mode}`);
        }
    })();

    const [state, formAction] = useActionState(submitFunction, { success: false, error: '' })



    return (
        <>
            {state?.success && <DisplayFormMessage messages={state?.message} type="success" />}
            {state?.success === false && <DisplayFormMessage messages={state?.error} type="error" />}
            <FormTitle editTitle="Edit course" createTitle="Create new course" mode={mode} />
            <form action={formAction} className="w-fit h-fit flex flex-col items-center justify-center gap-2 text-slate-200">
                <LabelElement htmlFor="course_name" className="font-bold pb-1 ml-2 text-lg tracking-wide">
                    Course name:
                </LabelElement>
                <InputElement
                    type="text"
                    title="Input course name"
                    name="course_name"
                    id="course_name"
                    required={false}
                    className="text-md pl-2 tracking-wide w-[16rem]"
                    placeholder="min 10 characters"
                    defaultValue={courseData?.course_name}
                />
                <LabelElement htmlFor="course_date" className="font-bold pb-1 ml-2 text-lg tracking-wide">
                    Course date:
                </LabelElement>
                <div
                    className="relative w-[16rem] flex flex-col items-center cursor-pointer"
                    onClick={handleDateInputClick}
                >
                    <InputElement
                        ref={dateInputRef}
                        type="date"
                        name="course_date"
                        id="course_date"
                        className="w-[16rem] cursor-pointer"
                        required={false}
                        defaultValue={courseData?.course_date ? new Date(courseData.course_date).toISOString().split('T')[0] : ''}
                    />
                    <CalendarInputIcon />
                </div>
                <LabelElement htmlFor="course_organizer" className="font-bold pb-1 ml-2 text-lg tracking-wide">
                    Course organizer:
                </LabelElement>
                <InputElement
                    type="text"
                    title="Input course organizer"
                    name="course_organizer"
                    id="course_organizer"
                    placeholder="min 10 characters"
                    required={false}
                    className="text-md pl-2 tracking-wide w-[16rem]"
                    defaultValue={courseData?.course_organizer}
                />
                <LabelElement htmlFor="course_category" className="font-bold pb-1 ml-2 text-lg tracking-wide">
                    Select course category:
                </LabelElement>
                <SelectElement
                    value={selectedCategory}
                    onChange={(val) => setSelectedCategory(val)}
                    options={courseCatArray}
                    placeholder="course category"
                    className="w-[15rem]"
                />
                <input type="hidden" name="course_category" value={selectedCategory} />
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