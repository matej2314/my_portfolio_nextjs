import { getAboutMe } from "@/actions/aboutMe";
import { type MetricItem } from "@/types/metricTypes";
import MetricsSection from "./MetricsSection";

export const metrics: MetricItem[] = [
    { label: 'Learning focus', value: 'Web Dev / Web security' },
    { label: 'Currently learning', value: 'Next.js, Python' },
    { label: 'Used OS', value: 'Windows / Linux' },
    { label: 'Work style', value: 'Self-organized' },
    { label: 'Code editor', value: 'VS Code' },
    { label: 'Languages', value: 'English, Russian' },
    { label: 'Hobbies', value: 'new technologies, TV series' }

]

export default async function AboutSection() {

    const { aboutMe, error } = await getAboutMe() as {
        aboutMe?: { about_text: string }[];
        error?: string;
    };

    const description = aboutMe?.[0]?.about_text || error || 'No description found';

    return (
        <section id="aboutSection" className="w-full h-[100dvh] flex flex-col mb-5">
            <span className="text-4xl text-green-400 ml-2">About &#123;</span>
            <div className="w-full h-full flex justify-around mt-10">
                <MetricsSection metrics={metrics} />
                <section className="w-1/2 h-full">
                    <div className="w-full h-fit flex flex-col items-center text-slate-200 ">
                        <p className="text-xl text-justify leading-9 pr-[5rem]">{description}</p>
                    </div>
                </section>
            </div>
            <span className="text-green-400 text-4xl ml-2 mt-5">&#125;</span>
        </section >
    )
}