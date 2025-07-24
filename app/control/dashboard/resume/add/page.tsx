import SaveResumeForm from "@/components/control-panel-components/forms/SaveResumeForm"


export default function AddResume() {

    return (
        <main className="w-full h-full flex flex-col gap-4 justify-start items-center mt-10">
            <h2 className="text-2xl font-bold text-center text-green-400">Add new resume</h2>
            <SaveResumeForm />
        </main>
    )
}