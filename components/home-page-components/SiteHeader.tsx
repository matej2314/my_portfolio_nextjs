import HomePageMenu from "./HomePageMenu";
import ProjectDetailsMenu from "../project-details-page/components/ProjectDetailsMenu";
import BlogPageMenu from "../blog-page-components/BlogPageMenu";

import { type ReactNode } from "react";
import { type SiteHeaderProps } from "@/types/siteHeaderTypes";

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
        <header id="headerSection" className="w-full h-fit flex justify-end z-10">
            {SelectedMenu}
        </header>
    );
}
