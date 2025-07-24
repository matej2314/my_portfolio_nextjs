import SkillForm from "@/components/control-panel-components/forms/SkillForm"


export default function AddSkill() {

    return (
        <main className="w-full h-full flex flex-col gap-4 justify-start items-center">
            <SkillForm mode="create" />
        </main>
    )
}