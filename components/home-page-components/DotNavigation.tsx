'use client';

import { motion } from 'framer-motion';

import NavLink from '../NavLink';
import { useActiveSection } from "@/hooks/useActiveSection";
import { sections } from "@/lib/homePageSectionsArr";

const DotNavigation = () => {

    const activeSection = useActiveSection(sections);

    return (
        <motion.ul
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeIn' }}
            className="w-fit h-full flex pt-[9rem] flex-col gap-3">
            {sections.map((section) => (
                <li
                    key={section}
                    className="w-fit h-fit flex"
                >
                    <NavLink
                        pathName={`#${section}`}
                        isActive={activeSection === section}
                        linkClass="w-4 h-4 bg-white border-1 border-black rounded-full hover:bg-yellow-200"
                        activeClass="bg-yellow-200"
                    />
                </li>
            ))}
        </motion.ul>
    )
}

export default DotNavigation;