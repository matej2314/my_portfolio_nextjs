import { getProject } from "@/actions/projects";
import { getUserLocale } from "@/lib/locale";
import { generatePageMetadata } from "@/lib/generatePageMetadata";

import DetailsHeader from "@/components/project-details-page/components/DetailsHeader";
import DisplayGoalDescription from "@/components/project-details-page/components/DisplayGoalDescription";
import DisplayConclusion from "@/components/project-details-page/components/DisplayConclusion";
import GallerySection from "@/components/project-details-page/components/GallerySection";
import SiteHeader from "@/components/home-page-components/SiteHeader";
import ContactModal from "@/components/ContactModal";

import { type DetailsProjectProps } from "@/types/detailsPageTypes";

export async function generateMetadata({ params }: DetailsProjectProps) {
    const projectId = (await params).projectId;

    return generatePageMetadata('project', projectId);
};

export default async function ProjectDetailsPage({ params }: DetailsProjectProps) {

    const { projectId } = await params;
    const locale = await getUserLocale();

    const selectedProject = await getProject(projectId);

    if ('error' in selectedProject) {
        console.error(selectedProject.error);
        return <div>Failed to display details.</div>
    }

    return (
        <div className="w-full relative flex-1 flex flex-col">
            <SiteHeader
                variant="project"
                github={selectedProject.project.repo as string}
                demo={selectedProject.project.project_URL}
            />
            <div className="w-full flex flex-col">
                <main className="w-full h-full flex items-start mb-4 font-kanit">
                    <section className="w-full h-full flex flex-col justify-center items-center pt-8 gap-8">
                        <DetailsHeader selectedProject={selectedProject.project} />
                        <section
                            className="w-[98%] h-full flex flex-col items-center justify-center text-slate-200 px-1 sm:px-[12rem] gap-7"
                        >
                            <DisplayGoalDescription selectedProject={selectedProject.project} locale={locale} />
                            <GallerySection projectId={selectedProject.project.id} />
                            <DisplayConclusion selectedProject={selectedProject.project} locale={locale} />
                        </section>
                    </section>
                </main>
            </div>
            <ContactModal />
        </div>
    )
}