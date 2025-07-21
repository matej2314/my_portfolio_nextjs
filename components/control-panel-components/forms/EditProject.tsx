'use client'

import { type Project } from "@/types/actionsTypes/actionsTypes"
import ProjectForm from "./ProjectForm";


export default function EditProject({ projectData }: { projectData: Project }) {
    return (
        <main className="w-full h-full text-slate-200">
            <ProjectForm projectData={projectData} mode="edit" />
        </main>
    )
}