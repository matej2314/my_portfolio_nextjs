'use client'
import { useState } from "react"
import { useActionState } from "react"
import { saveCourse } from "@/actions/courses"

import LabelElement from "@/components/ui/elements/LabelElement"
import InputElement from "@/components/ui/elements/InputElement"
import SelectElement from "@/components/ui/elements/SelectElement"
import SubmitBtn from "@/components/ui/elements/SubmitButton"
import CalendarInputIcon from "@/components/ui/elements/CalendarInputIcon"

import { courseCatArray } from "@/lib/dataCatArrays"

export default function SaveCourseForm() {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [state, formAction] = useActionState(saveCourse, { success: false, error: '' })

    return (
        <>
            <form action={formAction} className="w-fit h-fit flex flex-col items-center justify-center gap-2 text-slate-200">
                {state?.success && <p className="text-green-400">{state.message}</p>}
                {state?.success === false && <p className="text-red-400">{state.error}</p>}
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
                />
                <LabelElement htmlFor="course_date" className="font-bold pb-1 ml-2 text-lg tracking-wide">
                    Course date:
                </LabelElement>
                <div className="relative w-[16rem] flex flex-col items-center">
                    <InputElement
                        type="date"
                        name="course_date"
                        id="course_date"
                        className="w-[16rem] appearance-none cursor-pointer"
                        required={false}
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
                    required={false}
                    className="text-md pl-2 tracking-wide w-[16rem]"
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