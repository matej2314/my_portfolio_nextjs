'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';


import { useActiveSection } from "@/hooks/useActiveSection";
import { useDeviceType } from '@/hooks/useDeviceType';

import NavLink from '../NavLink';

import { sections } from "@/lib/homePageSectionsArr";

const DotNavigation = () => {

    const pathName = usePathname();
    const device = useDeviceType();

    const activeSection = useActiveSection(sections);

    return (
        <AnimatePresence>
            {device !== 'mobile' && <motion.ul
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50, transition: { duration: 0.4, ease: 'easeOut' } }}
                transition={{ duration: 0.4, ease: 'easeIn' }}
                className={`w-fit h-full flex pt-[9rem] flex-col gap-3
                 ${pathName?.startsWith('/home/project') || pathName?.startsWith('/home/blog') ? 'hidden' : 'block'}`}
            >
                {sections.map((section) => (
                    <li
                        key={section}
                        className="w-fit h-fit flex"
                    >
                        <NavLink
                            pathName={`#${section}`}
                            isActive={activeSection === section}
                            linkClass="w-4 h-4 bg-white border-1 border-black rounded-full hover:bg-yellow-200 cursor-pointer"
                            activeClass="bg-yellow-200"
                            variant='home'
                            title={section}
                        />
                    </li>
                ))}
            </motion.ul>}
        </AnimatePresence>
    )
}

export default DotNavigation;