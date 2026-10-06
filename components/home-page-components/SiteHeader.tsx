import HomePageMenu from "./HomePageMenu";
import BlogPageMenu from "../blog-page-components/BlogPageMenu";

import { type ReactNode } from "react";
import { type SiteHeaderProps } from "@/types/siteHeaderTypes";

export default function SiteHeader({ variant }: SiteHeaderProps) {
  let SelectedMenu: ReactNode;

  switch (variant) {
    case "home":
      SelectedMenu = <HomePageMenu />;
      break;
    case "blog":
      SelectedMenu = <BlogPageMenu />;
      break;
    default:
      SelectedMenu = null;
  }

  return (
    <header
      id="headerSection"
      className={
        variant === "home"
          ? "relative z-30 w-full xl:pointer-events-none xl:fixed xl:inset-x-0 xl:top-4"
          : "relative z-30 w-full"
      }
    >
      {SelectedMenu}
    </header>
  );
}
