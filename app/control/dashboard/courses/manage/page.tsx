import { getCourses } from "@/actions/courses";

import TableWrapper from "@/components/control-panel-components/TableElementWrapper";
import { createColumns } from "@/lib/createColumnsDef";

import { type Course } from "@/types/actionsTypes/actionsTypes";

export default async function ManageCourses() {

    const coursesColumns = createColumns<Course>([
        { key: 'id', header: 'ID' },
        { key: 'course_name', header: 'Name' },
        { key: 'course_category', header: 'Category' },
        { key: 'course_organizer', header: 'Organizer' }
    ]);

    const coursesData = await getCourses();

    if ('error' in coursesData) {
        console.error(coursesData.error);
        return <p>Failed to fetch data.</p>
    }

    const courses = coursesData.courses;


    return (
        <main className="w-full h-full flex flex-col justify-start items-center text-slate-200 mt-4 px-6">
            <section className="relative w-full max-h-full overflow-y-auto no-scrollbar border-[1px] flex justify-center inset-ring-3 inset-ring-slate-500 border-slate-300 rounded-md">
                <div className="absolute h-full">
                    <TableWrapper
                        data={courses}
                        columns={coursesColumns}
                        enableColumnVisibility={false}
                    />
                </div>
            </section>
        </main>
    )
}