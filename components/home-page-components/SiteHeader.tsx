import HomePageMenu from "./HomePageMenu";
import ProjectDetailsMenu from "../project-details-page/components/ProjectDetailsMenu";

type SiteHeaderProps = {
    variant: 'home' | 'project';
    github?: string;
    demo?: string
}

export default function SiteHeader({ variant, github, demo }: SiteHeaderProps) {
    return (
        <header id="headerSection" className="w-full h-fit flex justify-end">
            {variant === 'project' ? < ProjectDetailsMenu github={github as string} demo={demo as string} />
                : <HomePageMenu />
            }
        </header>
    );
}
