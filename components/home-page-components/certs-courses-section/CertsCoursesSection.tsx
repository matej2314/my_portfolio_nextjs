import { getTranslations } from "next-intl/server";

import CertsList from "./components/CertsLits";

import { type GetCoursesType } from "@/types/actionsTypes/actionsTypes";


export default async function CertsCoursesSection({ courses }: { courses: GetCoursesType | undefined }) {

    const t = await getTranslations("homePage");

    if (!courses || 'error' in courses) {
        return <p>Failed to fetch courses</p>
    }

    return (
        <section id="certsSection" className="w-full h-[100dvh] flex flex-col mb-5">
            <span className="text-4xl text-green-400 ml-2">Certs & Courses &#123;</span>
            <section className=" h-full flex flex-col justify-center items-center gap-2">
                <p
                    className="w-10/12 ml-[5rem] flex justify-center items-center text-slate-200 text-xl tracking-wide"
                >
                    {t("certsSection.description")}
                </p>
                <CertsList courses={courses.courses} />
            </section>
            <span className="text-green-400 text-4xl ml-2 mt-5">&#125;</span>
        </section>
    )
}