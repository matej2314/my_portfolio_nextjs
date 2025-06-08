import BaseSection from "@/components/home-page-components/base-section/BaseSection";
import AboutSection from "@/components/home-page-components/about-section/AboutSection";
import SkillsSection from "@/components/home-page-components/skills-section/SkillsSection";
import ProjectsSection from "@/components/home-page-components/projects-section/ProjectsSection";
import CertsCoursesSection from "@/components/home-page-components/certs-courses-section/CertsCoursesSection";
import ContactSection from "@/components/home-page-components/contact-section/ContactSection";
import SiteHeader from "@/components/home-page-components/SiteHeader";

import { getHomePageData } from "@/actions/homePage";

export default async function HomePage() {

    const { data, error } = await getHomePageData();

    if (error) {
        console.error(error);
        return;
    };

    return (
        <div id="mainSection" className="w-[90%] h-full flex flex-col justify-start gap-4">
            <div className=" h-screen flex flex-col">
                <SiteHeader variant="home" />
                <div className="w-full flex flex-col">
                    <BaseSection />
                    <AboutSection aboutText={data?.aboutMe} />
                    <SkillsSection skills={data?.skills} />
                    <CertsCoursesSection courses={data?.courses} />
                    <ProjectsSection projects={data?.projects} />
                    <ContactSection />
                </div>
            </div>
        </div >
    )
}