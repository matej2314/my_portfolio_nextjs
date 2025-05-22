import { getProject } from "@/actions/projects";

type DetailsPageProps = {
    params: {
        pname: string;
    };
}

export default async function ProjectDetailsPage({ params }: DetailsPageProps) {

    const projectName = params.pname;

    const selectedProject = await getProject(projectName);

    return (
        <main>
            <p>Project details</p>
        </main>
    )
}