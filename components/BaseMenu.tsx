'use client';

import { useState } from "react";
import { useTranslations } from "next-intl";

import NavLink from "./NavLink"

import { type MenuItem } from "@/lib/menuArrays"
import CvSelectorWrapper from "./CvSelectorWrapper";


export default function BaseMenu({ array }: { array: MenuItem[] }) {
    const [isCvOpen, setIsCvOpen] = useState<boolean>(false);
    const t = useTranslations();

    const toggleCvSelector = () => {
        setIsCvOpen(prevState => !prevState);
    }

    return (
        <ul className="text-zinc-100 text-xl flex items-center gap-x-4 mr-3 mt-1">
            {array.map((item, index) => (
                <li
                    key={index}
                    className="w-full h-full flex mx-auto text-nowrap gap-4 font-mono items-center relative"
                >
                    {item.label === 'Resume' ? (
                        <button onClick={(e) => {
                            toggleCvSelector();
                            e.stopPropagation();
                        }}>
                            <NavLink
                                pathName={item.path as string}
                                variant={item.variant}
                                title={t(`mainMenu.${item.label}`)}
                            >
                                {`${index + 1}`}.{t(`mainMenu.${item.label}`)}
                            </NavLink>
                        </button>
                    ) : (
                        <NavLink
                            pathName={item.path as string}
                            variant={item.variant}
                            title={t(`mainMenu.${item.label}`)}
                        >
                            {`${index + 1}`}.{t(`mainMenu.${item.label}`)}
                        </NavLink>
                    )}
                    {index < array.length - 1 && <span>|</span>}
                    {item.label === 'Resume' && isCvOpen && (
                        <CvSelectorWrapper onClose={() => setIsCvOpen(false)} />
                    )}
                </li>
            ))}
        </ul>
    );
}