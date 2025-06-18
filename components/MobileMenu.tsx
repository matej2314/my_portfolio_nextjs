'use client';

import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

import NavLink from "./NavLink";
// import LanguageSwitcher from "./LanguageSwitcher";
import CvSelectorWrapper from "./CvSelectorWrapper";

import { type MenuItem } from "@/lib/menuArrays";

interface OpenState {
    menu: boolean;
    cv: boolean;
}

export default function MobileMenu({ array }: { array: MenuItem[] }) {
    const [isOpen, setIsOpen] = useState<OpenState>({
        menu: false,
        cv: false
    });
    const t = useTranslations()

    return (
        <div className="w-full">
            <div className="flex justify-end items-center">

                <Button
                    variant='ghost'
                    onClick={() => setIsOpen((prev) => ({ ...prev, menu: !prev.menu }))}
                    className={`w-fit h-fit flex flex-col ${isOpen.menu ? 'rotate-90' : 'rotate-0'} ${isOpen.menu ? 'gap-2' : 'gap-1'} p-1 hover:bg-transparent`}
                >
                    <span className="w-5 h-1 bg-green-400" />
                    <span className="w-5 h-1 bg-green-400" />
                </Button>
            </div>
            <AnimatePresence>
                {isOpen.menu && (
                    <motion.ul
                        key='mobile-menu'
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut', type: 'tween', }}
                        className="w-screen flex flex-col gap-3 px-2 py-2 text-green-400"
                    >
                        {array.map((item, index) => (
                            <li
                                key={index}
                                className="w-full h-[2rem] flex justify-center text-nowrap gap-4 font-kanit font-semibold tracking-wide items-center relative"
                            >
                                {item.label === 'Resume' ? (
                                    <button onClick={(e) => {
                                        setIsOpen((prev) => ({ ...prev, cv: !prev.cv }))
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
                                {item.label === 'Resume' && isOpen.cv && (
                                    <CvSelectorWrapper onClose={() => setIsOpen((prev) => ({ ...prev, cv: false }))} />
                                )}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}