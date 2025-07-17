import { getSkills } from "@/actions/skills";

import TableWrapper from "@/components/control-panel-components/TableElementWrapper";
import { createColumns } from "@/lib/createColumnsDef";

import { type Skill } from "@/types/actionsTypes/actionsTypes";
import { type VisibilityState } from "@tanstack/react-table";

export default async function ManageSkills() {

    const skillsColumns = createColumns<Skill>([
        { key: 'id', header: 'ID' },
        { key: 'skill_name', header: 'Name' },
        { key: 'skill_cat', header: 'Category' },
        { key: 'icon_name', header: 'Icon' },
        { key: 'icon_color', header: 'Icon color' }
    ]);

    const defaultVisibleColumns: VisibilityState = {
        id: false,
    };

    const skillsData = await getSkills();

    if ('error' in skillsData) {
        console.error(skillsData.error);
        return <p>Failed to fetch data.</p>
    };

    const skills = skillsData.skills;

    return (
        <main className="w-full h-full flex flex-col justify-start items-center text-slate-200 mt-4">
            <section className="w-full h-fit flex justify-center rounded-md">
                <div>
                    <TableWrapper
                        data={skills}
                        columns={skillsColumns}
                        enableColumnVisibility={true}
                        defaultColumnVisibility={defaultVisibleColumns}
                        basePath={'/control/dashboard/skills/manage'}
                    />
                </div>
            </section>
        </main>
    )
}