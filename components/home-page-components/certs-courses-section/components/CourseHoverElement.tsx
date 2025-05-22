import { type Course } from "@/types/actionsTypes/actionsTypes"

type CourseHoverType = {
    course: Course;
    isVisible: boolean;
};

export default function CourseHoverElement({ course, isVisible }: CourseHoverType) {


    return (
        <div className="w-fit h-fit flex flex-col items-center justify-center px-2 py-3">
            <h2>{course.course_name}</h2>
            <p>{new Date(course.course_date).toLocaleDateString()}</p>
            <span>{course.course_category}</span>
        </div>
    )
}