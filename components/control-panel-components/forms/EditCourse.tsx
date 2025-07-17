'use client'

import { type Course } from "@/types/actionsTypes/actionsTypes";
import CourseForm from "./CourseForm";

export default function EditCourse({ courseData }: { courseData: Course }) {
    return (
        <main className="w-full flex justify-center text-slate-200 pt-[1.5rem]">
            <CourseForm courseData={courseData} mode="edit" />
        </main>
    )
}