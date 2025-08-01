'use client';

import IconButton from "./IconButton";

import { useActiveSection } from "@/hooks/useActiveSection";

import { sections } from "@/lib/arrays/homePageSectionsArr";


export default function ScrollToTop() {

    const section = useActiveSection(sections) as string;
    const scroll = section !== 'baseSection';

    return (
        <IconButton
            iconCode="bx:arrow-to-top"
            redirectPath="#baseSection"
            title="Scroll to top"
            aria-label="Scroll to top of page"
            className={`fixed bottom-6 right-6 transition-opacity duration-300 ${scroll ? 'opacity-100' : 'opacity-0 pointer-events-none'
                } bg-yellow-300 text-slate-900 hover:bg-yellow-400`}
        />
    )
}