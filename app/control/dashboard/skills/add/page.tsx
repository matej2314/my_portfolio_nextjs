import SkillForm from "@/components/control-panel-components/forms/SkillForm"


export default function AddSkill() {

    return (
        <main className="w-full h-full flex justify-center items-center">
            <SkillForm mode="create" />
        </main>
    )
}