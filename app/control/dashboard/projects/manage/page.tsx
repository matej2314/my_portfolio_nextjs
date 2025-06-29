import { getProjects } from "@/actions/projects";

import TableWrapper from "@/components/control-panel-components/TableElementWrapper";
import { createColumns } from "@/lib/createColumnsDef";

import { type Project } from "@/types/actionsTypes/actionsTypes";
import { type VisibilityState } from "@tanstack/react-table";

type FormattedProject = Omit<Project, 'end_date'> & {
    end_date: string
}


export default async function ManageProjects() {

    const projectsColumns = createColumns<FormattedProject>([
        { key: 'id', header: 'ID' },
        { key: 'project_name', header: 'Name' },
        { key: 'project_category', header: 'Category' },
        { key: 'project_URL', header: 'URL' },
        { key: 'project_screenName', header: 'Screen name' },
        { key: 'goal', header: 'Project goal' },
        { key: 'goal_pl', header: 'Project goal PL' },
        { key: 'project_description', header: 'Description' },
        { key: 'description_pl', header: 'Description PL' },
        { key: 'repo', header: 'Repository' },
        { key: 'technologies', header: 'Technologies' },
        { key: 'difficulty', header: 'Difficulty' },
        { key: 'end_date', header: 'End date' },
        { key: 'long_text', header: 'Long description' },
        { key: 'long_text_pl', header: 'Long description PL' },
        { key: 'conclusion', header: 'Conclusion' },
        { key: 'conclusion_pl', header: 'Conclusion PL' }
    ]);

    const defaultVisibleColumns: VisibilityState = {
        id: false,
        project_screenName: false,
        goal_pl: false,
        project_description: false,
        description_pl: false,
        technologies: false,
        difficulty: false,
        end_date: false,
        long_text: false,
        long_text_pl: false,
        conclusion: false,
        conclusion_pl: false,
    };


    const projectsData = await getProjects();

    if ('error' in projectsData) {
        console.error(projectsData.error);
        return <p>Failed to fetch data.</p>
    };

    const projects = projectsData.projects.map(project => ({
        ...project,
        end_date: new Date(project.end_date as Date).toLocaleDateString('pl-PL')
    }))

    return (
        <main className="w-full h-full flex flex-col justify-start items-center text-slate-200 mt-4 px-6">
            <section className="w-full h-fit flex justify-center rounded-md">
                <TableWrapper
                    data={projects}
                    columns={projectsColumns}
                    enableColumnVisibility={true}
                    defaultColumnVisibility={defaultVisibleColumns}
                />
            </section>
        </main>
    )
}