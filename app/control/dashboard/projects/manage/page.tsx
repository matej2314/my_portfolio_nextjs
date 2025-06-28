import { getProjects } from "@/actions/projects";

import TableWrapper from "@/components/control-panel-components/TableElementWrapper";
import { createColumns } from "@/lib/createColumnsDef";

import { type Project } from "@/types/actionsTypes/actionsTypes";


export default async function ManageProjects() {

    const projectsColumns = createColumns<Project>([
        { key: 'id', header: 'ID' },
        { key: 'project_name', header: 'Name' },
        { key: 'project_category', header: 'Category' },
        { key: 'technologies', header: 'Technologies' },
        { key: 'project_URL', header: 'URL' },
        { key: 'repo', header: 'Repository' },
        { key: 'goal', header: 'Project goal' },
    ]);

    const projectsData = await getProjects();

    if ('error' in projectsData) {
        console.error(projectsData.error);
        return <p>Failed to fetch data.</p>
    };

    const projects = projectsData.projects;

    return (
        <main className="w-full h-full flex flex-col justify-start items-center text-slate-200 mt-4 px-6">
            <section className="w-full h-fit border-[1px] flex justify-center inset-ring-3 inset-ring-slate-500 border-slate-300 rounded-md">
                <TableWrapper
                    data={projects}
                    columns={projectsColumns}
                    enableColumnVisibility={true}
                />
            </section>
        </main>
    )
}