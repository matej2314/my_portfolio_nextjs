
import { type Project } from "@/types/actionsTypes/actionsTypes"

export default async function DisplayGoalDescription({ selectedProject }: { selectedProject: Project }) {

    return (
        <div className="w-full flex flex-col items-center gap-4">
            <h2 className="text-3xl text-yellow-300">Main goal:</h2>
            <p className="font-mono tracking-wide text-justify font-semibold">{selectedProject.goal}</p>
            <h2 className="text-3xl text-yellow-300">Project description:</h2>
            <p className="font-mono tracking-wide text-justify font-semibold">{selectedProject.long_text}</p>
        </div>
    )
}