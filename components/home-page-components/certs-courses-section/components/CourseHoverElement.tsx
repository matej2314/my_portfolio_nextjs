import { type CourseHoverType } from "@/types/HoverElementTypes";


export default function CourseHoverElement({ course, isVisible }: CourseHoverType) {

    if (!isVisible) {
        return;
    }

    return (
        <div
            className="relative xl:top-[3rem] max-w-screen xl:w-fit xl:h-[11rem] flex flex-col items-center justify-start text-slate-200 rounded-md gap-6">
            <h2
                className="text-[0.8rem] xl:text-[0.9rem] xl:w-[22rem] flex xl:flex-row justify-center xl:flex-nowrap font-semibold text-yellow-300"
            >
                {course.course_name}
            </h2>
            <p className="text-sm flex gap-2">
                <span>
                    Category:
                </span>
                <span>
                    {course.course_category}
                </span>
            </p>
            <section
                className="w-full h-full flex flex-col items-center gap-4">
                <p
                    className="text-sm flex gap-2"
                >
                    <span>
                        Date:
                    </span>
                    <span>
                        {new Date(course.course_date).toLocaleDateString()}
                    </span>
                </p>
                <p
                    className="text-sm flex gap-2"
                >
                    <span>
                        Organizer:
                    </span>
                    <span>
                        {course.course_organizer}
                    </span>
                </p>
            </section>
        </div>
    )
}