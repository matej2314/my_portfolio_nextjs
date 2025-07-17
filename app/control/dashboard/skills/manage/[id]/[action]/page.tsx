import { getSkill } from "@/actions/skills";

import EditSkill from "@/components/control-panel-components/forms/EditSkill";
import DeleteData from "@/components/control-panel-components/delComponents/DeleteData";

import { type Params } from "@/types/controlPanel";
import { type Skill } from "@/types/actionsTypes/actionsTypes";

export default async function SkillAction({ params }: Params) {
    const { id, action } = await params;
    let skillData = null;

    if (id) {
        const data = await getSkill(id)
        if ('error' in data) {
            console.error(data.error);
            return <p>Failed to fetch data.</p>
        }
        skillData = data.skill;
    }

    if (id && action === 'edit') {
        return <EditSkill skillData={skillData as Skill} />
    } else if (id && action === 'delete') {
        return <DeleteData id={id} name={skillData?.skill_name || ''} dataType="skill" />
    }

}