import CourseForm from "@/components/control-panel-components/forms/CourseForm"



export default async function AddCourse() {


    return (
        <main className="w-full h-full flex flex-col gap-4 justify-start items-center">
            <CourseForm mode="create" />
        </main>
    )
}