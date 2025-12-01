'use client'

import { type Experience } from "@/types/actionsTypes/actionsTypes"
import ExperienceForm from "./ExperienceForm"


export default function EditExperience({ experienceData }: { experienceData: Experience }) {
    return (
        <main className="w-full h-full text-slate-200">
            <ExperienceForm experienceData={experienceData} mode="edit" />
        </main>
    )
}