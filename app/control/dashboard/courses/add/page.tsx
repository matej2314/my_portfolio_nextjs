import CourseForm from "@/components/control-panel-components/forms/CourseForm"



export default async function AddCourse() {


    return (
        <main className="w-full h-full flex justify-center items-center">
            <CourseForm mode="create" />
        </main>
    )
}