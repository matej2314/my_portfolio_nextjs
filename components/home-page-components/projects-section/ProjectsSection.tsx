import ProjectsGallery from "./components/ProjectsGallery";
import { GetProjectsType } from "@/types/actionsTypes/actionsTypes";
import { getProjectImages } from "@/actions/projects";

export default async function ProjectsSection({ projects }: { projects: GetProjectsType | undefined }) {

    if (!projects || 'error' in projects) {
        return <p>Failed to fetch projects</p>
    }

    const images = await getProjectImages(projects.projects);

    return (
        <section id="projectsSection" className="w-full h-fit flex flex-col text-slate-200 snap-center">
            <span className="text-4xl text-green-400 ml-2">Projects &#123;</span>
            <section className="w-full h-[100dvh] flex justify-center items-center">
                <ProjectsGallery projects={projects?.projects} images={images} />
            </section>
            <span className="text-green-400 text-4xl ml-2">&#125;</span>
        </section>
    )
}