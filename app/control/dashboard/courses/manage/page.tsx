import { getCourses } from "@/actions/courses";

import TableWrapper from "@/components/control-panel-components/TableElementWrapper";
import IconButton from "@/components/ui/elements/IconButton";
import { createColumns } from "@/lib/createColumnsDef";

import { type Course } from "@/types/actionsTypes/actionsTypes";
import { type VisibilityState } from "@tanstack/react-table";

type FormattedCourse = Omit<Course, 'course_date'> & {
    course_date: string;
}

export default async function ManageCourses() {

    const coursesColumns = createColumns<FormattedCourse>([
        { key: 'id', header: 'ID' },
        { key: 'course_name', header: 'Name' },
        { key: 'course_date', header: 'Date' },
        { key: 'course_category', header: 'Category' },
        { key: 'course_organizer', header: 'Organizer' }
    ]);

    const defaultVisibleColumns: VisibilityState = {
        id: false,
    }

    const coursesData = await getCourses();

    if ('error' in coursesData) {
        console.error(coursesData.error);
        return <p>Failed to fetch data.</p>
    }

    const courses = coursesData.courses.map(course => ({
        ...course,
        course_date: new Date(course.course_date).toLocaleDateString('pl-PL')
    }))


    return (
        <main className="w-full h-full flex flex-col justify-start items-center text-slate-200 mt-4 px-6">
            <IconButton
                iconCode="mdi:plus"
                redirectPath="/control/dashboard/courses/add"
                title="Add Course"
                className="w-[7rem] h-[2rem] bg-yellow-400 hover:bg-yellow-500 text-slate-800 border-[1px] border-slate-200 flex items-center"
            >
                Add Course
            </IconButton>
            <section className="w-full h-fit flex justify-center rounded-md">
                <TableWrapper
                    data={courses}
                    columns={coursesColumns}
                    enableColumnVisibility={true}
                    defaultColumnVisibility={defaultVisibleColumns}
                    basePath={`/control/dashboard/courses/manage/`}
                />
            </section>
        </main>
    )
}