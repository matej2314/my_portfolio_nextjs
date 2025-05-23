import BaseSection from "@/components/home-page-components/base-section/BaseSection";
import AboutSection from "@/components/home-page-components/about-section/AboutSection";
import SkillsSection from "@/components/home-page-components/skills-section/SkillsSection";
import ProjectsSection from "@/components/home-page-components/projects-section/ProjectsSection";
import CertsCoursesSection from "@/components/home-page-components/certs-courses-section/CertsCoursesSection";
import ContactSection from "@/components/home-page-components/contact-section/ContactSection";

export default function HomePage() {

    return (
        <main className="w-full h-screen">
            <BaseSection />
            <AboutSection />
            <SkillsSection />
            <CertsCoursesSection />
            <ProjectsSection />
            <ContactSection />
        </main>

    )
}