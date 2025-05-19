import BaseSection from "@/components/home-page-components/BaseSection";
import AboutSection from "@/components/home-page-components/AboutSection";
import SkillsSection from "@/components/home-page-components/SkillsSection";
import ProjectsSection from "@/components/home-page-components/ProjectsSection";
import ContactSection from "@/components/home-page-components/ContactSection";

export default function HomePage() {

    return (
        <main className="w-full h-full overflow-y-auto no-scrollbar">
            <BaseSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
        </main>

    )
}