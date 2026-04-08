'use client';

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useTranslations } from "next-intl";
import { useDeviceType } from "@/hooks/useDeviceType";
import { type MenuItem } from "@/lib/arrays/menuArrays";

import NavLink from "./links/NavLink";
import MobileMenu from "./mobile-menu/MobileMenu";
import CvSelectorWrapper from "./CvSelectorWrapper";
import LanguageSwitcher from "./LanguageSwitcher";
import MLetter from "./ui/elements/MLetterElement";


/** Tymczasowo wyłączone — ustaw na true, żeby przywrócić przełącznik języka. */
const showLanguageSwitcher = true;
/** SiteHeader (Pencil): nav links #e2e8f0, 14px, normal; gap 32px between links */
const headerNavLinkClass =
    "whitespace-nowrap text-sm font-normal text-slate-200 transition-colors hover:text-yellow-400/90 focus:text-yellow-400/90 focus-visible:text-yellow-400/90 focus:outline-none focus-visible:outline-none text-[1.3rem]";

export default function BaseMenu({ array }: { array: MenuItem[] }) {
    const [isCvOpen, setIsCvOpen] = useState(false);
    const cvClusterRef = useRef<HTMLDivElement>(null);
    const t = useTranslations();
    const device = useDeviceType();

    useClickOutside(cvClusterRef, () => setIsCvOpen(false));

    const { navItems, resumeItem } = useMemo(() => {
        const resume = array.find((item) => item.label === "CV");
        const nav = array.filter((item) => item.label !== "CV");
        return { navItems: nav, resumeItem: resume };
    }, [array]);

    if (device === "mobile") return <MobileMenu array={array} />;

    return (
        <nav
            aria-label="Main menu"
            className="flex h-[4.5rem] w-full max-w-[1440px] mx-auto items-center justify-between gap-6 px-6 font-jakarta md:px-12"
        >
            <Link
                href="/home"
                className="flex shrink-0 items-center self-stretch rounded-sm text-[1.8rem] font-bold leading-none text-yellow-400 transition-colors hover:text-yellow-500 focus:text-yellow-500 focus-visible:text-yellow-500 focus:outline-none focus-visible:outline-none"
                aria-label={t("mainMenu.Home")}
            >
                <MLetter
                    mode="button"
                    size={35}
                    aria-hidden
                    className="block translate-y-[20%]"
                />
            </Link>

            <ul className="flex min-w-0 max-w-[min(100%,52rem)] flex-wrap items-center justify-center gap-x-8 gap-y-2 self-stretch md:max-w-none md:flex-nowrap text-[1.5rem]">
                {navItems.map((item, index) => (
                    <li key={`${item.label}-${index}`} className="shrink-0">
                        <NavLink
                            pathName={item.path || ""}
                            variant={item.variant}
                            linkClass={headerNavLinkClass}
                            title={t(`mainMenu.${item.label}`)}
                            aria-label={t(`mainMenu.${item.label}`)}
                        >
                            {t(`mainMenu.${item.label}`)}
                        </NavLink>
                    </li>
                ))}
            </ul>

            <div className="flex shrink-0 items-center gap-6 self-stretch">
            {showLanguageSwitcher ? <LanguageSwitcher /> : null}
                {resumeItem ? (
                    <div ref={cvClusterRef} className="relative w-fit">
                        <button
                            type="button"
                            onClick={() => setIsCvOpen((open) => !open)}
                            className="rounded-md bg-yellow-300 px-4 py-2 text-sm font-normal text-[#0c0c0c] transition-colors hover:bg-yellow-400 focus:bg-yellow-400 focus-visible:bg-yellow-400 focus:outline-none focus-visible:outline-none"
                            aria-expanded={isCvOpen}
                            aria-haspopup="true"
                            aria-label={t(`mainMenu.${resumeItem.label}`)}
                        >
                            {t(`mainMenu.${resumeItem.label}`)}
                        </button>
                        {isCvOpen ? <CvSelectorWrapper /> : null}
                    </div>
                ) : null}
                
            </div>
        </nav>
    );
}