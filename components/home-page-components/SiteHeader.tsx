import HomePageMenu from "./HomePageMenu";
import ProjectDetailsMenu from "../project-details-page/components/ProjectDetailsMenu";
import BlogPageMenu from "../blog-page-components/BlogPageMenu";
import { ReactNode } from "react";

type SiteHeaderProps = {
    variant: 'home' | 'project' | 'blog';
    github?: string;
    demo?: string
}

export default function SiteHeader({ variant, github, demo }: SiteHeaderProps) {

    let SelectedMenu: ReactNode;

    switch (variant) {
        case 'project':
            SelectedMenu = < ProjectDetailsMenu github={github as string} demo={demo as string} />
            break;
        case 'home':
            SelectedMenu = <HomePageMenu />
            break;
        case 'blog':
            SelectedMenu = <BlogPageMenu />
            break;
        default:
            SelectedMenu = null;
    }


    return (
        <header id="headerSection" className="w-full h-fit flex justify-end overflow-y-auto">
            {SelectedMenu}
        </header>
    );
}
