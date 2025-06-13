import ProjectsGallery from "./components/ProjectsGallery";
import { getFilesList } from "@/lib/getFilesList";
import { GetProjectsType } from "@/types/actionsTypes/actionsTypes";

export default async function ProjectsSection({ projects }: { projects: GetProjectsType | undefined }) {

    if (!projects || 'error' in projects) {
        return <p>Failed to fetch projects</p>
    }

    const images = await Promise.all(
        projects.projects.map(async (project) => ({
            id: project.id,
            images: await getFilesList(project.id, 'main'),
        }))
    )

    return (
        <section id="projectsSection" className="w-[90dvw] h-fit flex flex-col text-slate-200">
            <span className="text-4xl text-green-400 ml-2">Projects &#123;</span>
            <section className="w-full h-[100dvh] flex justify-center items-center">
                <ProjectsGallery projects={projects?.projects} images={images} />
            </section>
            <span className="text-green-400 text-4xl ml-2 mt-5">&#125;</span>
        </section>
    )
}