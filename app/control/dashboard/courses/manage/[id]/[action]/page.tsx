import { getCourse } from "@/actions/courses";

import EditCourse from "@/components/control-panel-components/forms/EditCourse";
import DeleteData from "@/components/control-panel-components/delComponents/DeleteData";
import { type Params } from "@/types/controlPanel"
import { type Course } from '@/types/actionsTypes/actionsTypes'

export default async function CourseAction({ params }: Params) {
    const { id, action } = await params;
    let courseData = null;

    if (id) {
        const data = await getCourse(id)
        if ('error' in data) {
            console.error(data.error);
            return <p>Failed to fetch data.</p>
        }
        courseData = data.course;
    }

    if (id && action === 'edit') {

        return <EditCourse courseData={courseData as Course} />
    } else if (id && action === 'delete') {

        return <DeleteData id={id} name={courseData?.course_name || ''} dataType="course" />
    } else {
        return <p>Invalid action</p>
    }
}