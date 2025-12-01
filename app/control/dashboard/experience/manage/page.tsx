import { getExperience } from "@/actions/experience";
import { createColumns } from "@/lib/utils/createColumnsDef";
import TableWrapper from "@/components/control-panel-components/TableElementWrapper";
import AddItemBtn from "@/components/control-panel-components/AddItemBtn";
import { type Experience } from "@/types/actionsTypes/actionsTypes";
import { type ColumnDef, type VisibilityState } from "@tanstack/react-table";

type FormattedExperience = Omit<Experience, 'employedSince' | 'employedTo'> & {
    employedSince: string;
    employedTo: string;
}

export default async function ManageExperience() {

    const experienceColumns = createColumns<FormattedExperience>([
        { key: 'id', header: 'ID' },
        { key: 'employer', header: 'Employer' },
        {key: 'employer_url', header: 'Employer URL'},
        { key: 'is_current', header: 'Is current' },
        { key: 'position', header: 'Position' },
        { key: 'hourly_rate', header: 'Hourly rate' },
        { key: 'employed_since', header: 'Employed since' },
        { key: 'employed_to', header: 'Employed to' },
    ]);

    const defaultVisibleColumns: VisibilityState = {
        uuid: false,
    }


    const experienceData = await getExperience();

    if ('error' in experienceData) {
        console.error(experienceData.error);
        return <p>Failed to fetch data.</p>
    };
  

   const experiences = experienceData.experiences.map(experience => ({
    ...experience,
    employedSince: experience.employed_since ? new Date(experience.employed_since).toLocaleDateString('pl-PL') : null,
    employedTo: experience.employed_to ? new Date(experience.employed_to).toLocaleDateString('pl-PL') : null,
   }));

   return (
    <main className="w-full h-full flex flex-col justify-start items-center text-slate-200 mt-4 px-6">
        <AddItemBtn redirectPath="/control/dashboard/experience/add" title="add experience button" label="Add experience" />
        <section className="w-full h-fit flex justify-center rounded-md">
            <TableWrapper
                data={experiences}
                columns={experienceColumns as unknown as ColumnDef<Experience>[]}
                enableColumnVisibility={true}
                defaultColumnVisibility={defaultVisibleColumns}
                basePath={`/control/dashboard/experience/manage/`}
            />
        </section>
    </main>
    )
}