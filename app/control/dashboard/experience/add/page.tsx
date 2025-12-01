import ExperienceForm from "@/components/control-panel-components/forms/ExperienceForm";


export default function AddExperience() {
    return (
        <main className="w-full max-h-full h-full flex justify-center items-start overflow-y-scroll no-scrollbar">
            <div className="w-full h-fit flex justify-center items-center">
                <ExperienceForm mode="create" />
            </div>
        </main>
    )
}