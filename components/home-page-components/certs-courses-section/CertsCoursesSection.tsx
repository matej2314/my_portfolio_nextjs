import { getTranslations } from "next-intl/server";

import CertsList from "./components/CertsLits";
import CoursesSectionContent from "./components/CoursesSectionContent";

import { type GetCoursesType } from "@/types/actionsTypes/actionsTypes";

export default async function CertsCoursesSection({ courses }: { courses: GetCoursesType | undefined }) {

    const t = await getTranslations("homePage");

    if (!courses || 'error' in courses) {
        return <p>Failed to fetch courses</p>
    }

    return (
        <section id="certsSection" className="w-full min-h-screen h-fit flex flex-col justify-center gap-3 font-kanit snap-center">
            <span className="text-4xl text-green-400">Certs & Courses &#123;</span>
            <CoursesSectionContent description={t("certsSection.description")} courses={courses.courses} />
            <span className="text-green-400 text-4xl mt-[2rem] sm:mt-0">&#125;</span>
        </section>
    )
}