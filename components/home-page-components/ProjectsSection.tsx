import { getProjects } from "@/actions/projects"
import ProjectsGallery from "./ProjectsGallery";
import { Project } from "@/types/actionsTypes/projectsTypes";
import { getFilesList } from "@/lib/getFilesList";

export default async function ProjectsSection() {

    const response = await getProjects();

    if ("error" in response) {
        console.log(response.error);
        return (
            <section className="w-full h-[100dvh] flex justify-center items-center text-red-500">
                <p>Nie udało się pobrać projektów.</p>
            </section>
        );
    }

    const { projects } = response;

    const images = await Promise.all(
        projects.map(async (project) => ({
            id: project.id,
            images: await getFilesList(project.id, 'main'),
        }))
    )

    return (
        <section id="projectsSection" className="w-full h-[100dvh] flex flex-col mb-5 text-slate-200">
            <span className="text-4xl text-green-400 ml-2">Projects &#123;</span>
            <section className="w-full h-full flex justify-center items-center">
                <ProjectsGallery projects={projects} images={images} />
            </section>
            <span className="text-green-400 text-4xl ml-2 mt-5">&#125;</span>
        </section>
    )
}