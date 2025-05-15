import BaseSection from "@/components/home-page-sections/BaseSection";
import ContactSection from "@/components/home-page-sections/ContactSection";
import SkillsSection from "@/components/home-page-sections/SkillsSection";

export default function HomePage() {

    return (
        <main className="w-full h-full overflow-y-auto no-scrollbar">
            <BaseSection />
            <SkillsSection />
            <ContactSection />
        </main>

    )
}