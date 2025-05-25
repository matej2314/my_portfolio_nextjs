import { getProject } from "@/actions/projects";

import DetailsHeader from "@/components/project-details-page/components/DetailsHeader";
import DisplayGoalDescription from "@/components/project-details-page/components/DisplayGoalDescription";
import GallerySection from "@/components/project-details-page/components/GallerySection";

import { type DetailsPageProps } from "@/types/detailsPageTypes";

export default async function ProjectDetailsPage({ params }: DetailsPageProps) {

    const { id } = await params;

    const selectedProject = await getProject(id);

    if ('error' in selectedProject) {
        console.error(selectedProject.error);
        return <div>Failed to display details.</div>
    }

    return (
        <main className="w-full h-full flex items-start mb-4">
            <section className="w-full h-full flex flex-col justify-center items-center pt-8 gap-8">
                <DetailsHeader selectedProject={selectedProject.project} />
                <section
                    className="w-[98%] h-full flex flex-col items-center justify-center text-slate-200 px-[12rem] gap-7"
                >
                    <DisplayGoalDescription selectedProject={selectedProject.project} />
                    <GallerySection projectId={selectedProject.project.id} />
                    <div className="w-full h-fit flex flex-col items-center justify-center gap-4">
                        <h2 className="text-3xl text-yellow-300">Conclusion</h2>
                        <p className="font-mono tracking-wide text-justify font-semibold">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nostrum nihil consectetur hic culpa! Numquam quaerat voluptatem omnis? Praesentium mollitia corporis dolor ad doloremque obcaecati fuga distinctio ratione eligendi sit.
                        </p>
                    </div>
                </section>
            </section>
        </main>
    )
}