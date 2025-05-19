

type DetailsPageProps = {
    params: {
        pname: string;
    };
}

export default function ProjectDetailsPage({ params }: DetailsPageProps) {

    const projectName = params.pname;

    return (
        <main>
            <p>Projects details</p>
        </main>
    )
}