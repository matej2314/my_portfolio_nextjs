import BaseSection from "@/components/home-page-components/base-section/BaseSection";
import AboutSection from "@/components/home-page-components/about-section/AboutSection";
import SkillsSection from "@/components/home-page-components/skills-section/SkillsSection";
import ProjectsSection from "@/components/home-page-components/projects-section/ProjectsSection";
import CertsCoursesSection from "@/components/home-page-components/certs-courses-section/CertsCoursesSection";
import ContactSection from "@/components/home-page-components/contact-section/ContactSection";
import SiteHeader from "@/components/home-page-components/SiteHeader";
import ScrollToTop from "@/components/ui/elements/ScrollToTopBtn";

import { getHomePageData } from "@/actions/homePage";
import { generatePageMetadata } from "@/lib/generatePageMetadata";


export async function generateMetadata() {

    return generatePageMetadata('page', null);
};

export default async function HomePage() {

    const { data, error } = await getHomePageData();

    if (error) {
        console.error(error);
        return;
    };

    return (
        <div id="mainSection" className="w-full flex flex-col items-center px-4 sm:px-8 overflow-x-hidden z-0">
            <div className="w-full h-fit max-w-6xl flex flex-col justify-start items-center">
                <SiteHeader variant="home" />
                <div className="w-full flex flex-col gap-16 sm:gap-20 mt-6 sm:mt-10">
                    <BaseSection />
                    <AboutSection aboutText={data?.aboutMe} />
                    <SkillsSection skills={data?.skills} />
                    <CertsCoursesSection courses={data?.courses} />
                    <ProjectsSection projects={data?.projects} />
                    <ContactSection />
                </div>
            </div>
            <div className="fixed bottom-2 right-[2rem]">
                <ScrollToTop />
            </div>
        </div>
    )
}