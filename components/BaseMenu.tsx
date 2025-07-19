'use client';

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useDeviceType } from "@/hooks/useDeviceType";

import NavLink from "./links/NavLink"
import MobileMenu from "./mobile-menu/MobileMenu";

import { type MenuItem } from "@/lib/menuArrays"
import { type MouseEvent } from "react";
import CvSelectorWrapper from "./CvSelectorWrapper";
import LanguageSwitcher from "./LanguageSwitcher";


export default function BaseMenu({ array }: { array: MenuItem[] }) {
    const [isCvOpen, setIsCvOpen] = useState<boolean>(false);
    const t = useTranslations();
    const device = useDeviceType();

    if (device === 'mobile') return <MobileMenu array={array} />

    const toggleCvSelector = () => {
        setIsCvOpen(prevState => !prevState);
    }

    const handleResumeClick = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        e.preventDefault();
        toggleCvSelector();
    }

    return (
        <ul aria-label="Main menu" role="navigation" className={`w-fit h-[2rem] text-zinc-100 text-sm xl:text-xl flex items-center gap-x-4 mr-3`}>

            {array.map((item, index) => (
                <li
                    key={index}
                    className="w-full h-full flex mx-auto text-nowrap gap-4 font-kanit font-semibold tracking-wide items-center relative"
                >
                    {item.label === 'Resume' ? (
                        <NavLink
                            pathName={item.path as string}
                            variant={item.variant}
                            title={t(`mainMenu.${item.label}`)}
                            onClick={handleResumeClick}
                        >
                            {`${index + 1}`}.&nbsp;{t(`mainMenu.${item.label}`)}
                        </NavLink>
                    ) : (
                        <NavLink
                            pathName={item.path ? item.path : ''}
                            variant={item.variant}
                            title={t(`mainMenu.${item.label}`)}
                        >
                            {`${index + 1}`}.&nbsp;{t(`mainMenu.${item.label}`)}
                        </NavLink>
                    )}
                    {index < array.length - 1 && <span>|</span>}
                    {item.label === 'Resume' && isCvOpen && (
                        <CvSelectorWrapper onClose={() => setIsCvOpen(false)} />
                    )}
                </li>
            ))}
            <li>
                <LanguageSwitcher />
            </li>
        </ul>
    );
}