import { getCourses } from "@/actions/courses"
import CertsList from "./components/CertsLits";


export default async function CertsCoursesSection() {

    const courses = await getCourses();

    if ('error' in courses) {
        console.error(courses.error)
        return <div>Failed to fetch courses data.</div>
    }

    return (
        <section id="certsSection" className="w-full h-[100dvh] flex flex-col mb-5">
            <span className="text-4xl text-green-400 ml-2">Certs & Courses &#123;</span>
            <section className=" h-full flex justify-center items-center">
                <CertsList courses={courses.courses} />
            </section>
            <span className="text-green-400 text-4xl ml-2 mt-5">&#125;</span>
        </section>
    )
}