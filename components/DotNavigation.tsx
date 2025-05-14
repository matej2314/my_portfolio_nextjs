'use client';

import NavLink from "./NavLink";

const sections = ['section1', 'section2', 'section3', 'section4', 'section5'];

const DotNavigation = () => {

    return (
        <ul className="w-fit h-full flex pt-[9rem] flex-col gap-3">
            {sections.map((section) => (
                <li
                    key={section}
                    className="w-fit h-fit flex">
                    <NavLink
                        pathName={`#${section}`}
                        linkClass="w-4 h-4 bg-white border-1 border-black rounded-full hover:bg-yellow-200"
                    />
                </li>
            ))}
        </ul>
    )
}

export default DotNavigation;