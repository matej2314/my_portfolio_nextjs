'use client'

import { type Project } from "@/types/actionsTypes/actionsTypes"
import ProjectForm from "./ProjectForm";


export default function EditProject({ projectData }: { projectData: Project }) {
    return (
        <main className="w-full flex justify-center text-slate-200 pt-[1.5rem]">
            <ProjectForm projectData={projectData} mode="edit" />
        </main>
    )
}