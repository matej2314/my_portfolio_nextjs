import { getProject } from "@/actions/projects";

import BadgeList from "@/components/BadgeList";

import { type BadgeItem } from "@/components/BadgeList";


type DetailsPageProps = {
    params: Promise<{ id: string }>
}

export default async function ProjectDetailsPage({ params }: DetailsPageProps) {

    const { id } = await params;

    const selectedProject = await getProject(id);

    if ('error' in selectedProject) {
        console.error(selectedProject.error);
        return <div>Failed to display details.</div>
    }

    const techArray: BadgeItem[] = (selectedProject.project.technologies ?? '').split(',').map((label) => ({
        label: label.trim(),
    })).filter((item) => item.label.length > 0)


    return (
        <main className="w-full h-full flex items-start">
            <section className="w-full h-full flex flex-col justify-center items-center pt-8 gap-5">
                <h2
                    className="w-full h-fit flex justify-center text-yellow-300 text-2xl tracking-wide"
                >
                    {selectedProject.project.project_name}
                </h2>
                <BadgeList items={techArray} />
            </section>
        </main>
    )
}