import { getProject } from "@/actions/projects";

import EditProject from "@/components/control-panel-components/forms/EditProject";
import DeleteData from "@/components/control-panel-components/delComponents/DeleteData";
import { type Params } from "@/types/controlPanel"
import { type Project } from "@/types/actionsTypes/actionsTypes"

export default async function ProjectAction({ params }: Params) {
    const { id, action } = await params;
    let projectData = null;

    if (id) {
        const data = await getProject(id)
        if ('error' in data) {
            console.error(data.error);
            return <p>Failed to fetch data.</p>
        }
        projectData = data.project;
    };

    if (id && action === 'edit') {
        return <EditProject projectData={projectData as Project} />
    } else if (id && action === 'delete') {
        return <DeleteData id={id} name={projectData?.project_name || ''} dataType="project" />
    }
}