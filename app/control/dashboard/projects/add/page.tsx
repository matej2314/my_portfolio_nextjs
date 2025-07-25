import ProjectForm from "@/components/control-panel-components/forms/ProjectForm"

export default function AddProject() {


    return (
        <main className="w-full max-h-full h-full flex justify-center items-start overflow-y-scroll no-scrollbar">
            <div className="w-full h-fit flex justify-center items-center">
                <ProjectForm mode="create" />
            </div>
        </main>
    )

}