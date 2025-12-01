import {getSingleExperience } from "@/actions/experience";

import EditExperience from "@/components/control-panel-components/forms/EditExperience";
import DeleteData from "@/components/control-panel-components/delComponents/DeleteData";

import { type Params } from "@/types/controlPanel";
import { type Experience } from "@/types/actionsTypes/actionsTypes";

export default async function ExperienceAction({ params }: Params) {
    const { id, action } = await params;
    let experienceData = null;

    if (id) {
        const data = await getSingleExperience(id)
        if ('error' in data) {
            console.error(data.error);
            return <p>Failed to fetch data.</p>
        }
        experienceData = data.experience;
    };

    if (id && action === 'edit') {
        return <EditExperience experienceData={experienceData as Experience} />
    } else if (id && action === 'delete') {
        return <DeleteData id={id} name={experienceData?.position || ''} dataType="experience" />
    }
}