'use client';

import IconButton from "./IconButton";

import { useActiveSection } from "@/hooks/useActiveSection";

import { sections } from "@/lib/arrays/homePageSectionsArr";


export default function ScrollToTop() {

    const section = useActiveSection(sections) as string;
    const scroll = section !== 'baseSection';

    return (
        <IconButton
            iconCode="mingcute:arrow-up-fill"
            iconClass="size-4"
            redirectPath="#baseSection"
            title="Scroll to top"
            aria-label="Scroll to top of page"
            className={`fixed bottom-[3.5rem] right-[5vw] w-[32px] h-[32px] rounded-full transition-opacity duration-300 ${scroll ? 'opacity-100' : 'opacity-0 pointer-events-none'
                } bg-yellow-300 text-slate-900 hover:bg-yellow-400`}
        />
    )
}