import NavLink from "../NavLink";

export default function HomePageMenu() {

    return (
        <ul className="text-zinc-100 text-xl flex items-center gap-x-4 mr-3 mt-1">
            <li className="w-full h-full flex mx-auto text-nowrap gap-4">
                <NavLink pathName="">About me</NavLink>
                <span>|</span>
            </li>
            <li className="w-full h-full flex mx-auto text-nowrap gap-4">
                <NavLink pathName="">Skills</NavLink>
                <span>|</span>
            </li>
            <li className="w-full h-full flex mx-auto text-nowrap gap-4">
                <NavLink pathName="">Projects</NavLink>
                <span>|</span>
            </li>
            <li className="w-full h-full flex mx-auto text-nowrap gap-4">
                <NavLink pathName="">Blog</NavLink>
                <span>|</span>
            </li>
            <li className="w-full h-full flex mx-auto text-nowrap gap-4">
                <NavLink pathName="">Contact</NavLink>
                <span>|</span>
            </li>
            <li className="w-full h-full flex mx-auto text-nowrap gap-4">
                <NavLink pathName="">Resume</NavLink>
            </li>
        </ul>
    )
}