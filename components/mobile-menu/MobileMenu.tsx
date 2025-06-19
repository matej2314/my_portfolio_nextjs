'use client';

import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

import NavLink from "../NavLink";
import LanguageSwitcher from "../LanguageSwitcher";
import CvSelectorWrapper from "../CvSelectorWrapper";
import MLetter from "../ui/elements/MLetterElement";

import { type MenuItem } from "@/lib/menuArrays";
import { type OpenState } from "@/types/mobileMenuTypes";

export default function MobileMenu({ array }: { array: MenuItem[] }) {
    const [isOpen, setIsOpen] = useState<OpenState>({
        menu: false,
        cv: false
    });
    const t = useTranslations()

    return (
        <div className="fixed top-0 left-0.5 w-full z-10 bg-black">
            <div className="w-full flex justify-end items-center">
                <Button
                    variant='ghost'
                    onClick={() => setIsOpen((prev) => ({ ...prev, menu: !prev.menu }))}
                    className={`w-fit h-fit flex flex-col ${isOpen.menu ? 'scale-115' : 'scale-150'} hover:bg-transparent mt-2`}
                >
                    <MLetter
                        mode="button"
                    />
                </Button>
            </div>
            <AnimatePresence>
                {isOpen.menu && (
                    <motion.ul
                        key='mobile-menu'
                        initial={{ height: 0, opacity: 1 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut', type: 'tween', }}
                        className="w-screen flex flex-col gap-3 px-2 py-2 text-green-400"
                    >
                        <li className="w-full flex justify-end items-center">
                            <LanguageSwitcher />
                        </li>
                        {array.map((item, index) => (
                            <li
                                key={index}
                                className="w-full h-[2rem] flex justify-center text-nowrap gap-4 font-kanit font-semibold tracking-wide items-center relative"
                            >
                                {item.label === 'Resume' ? (
                                    <NavLink
                                        pathName={item.path as string}
                                        variant={item.variant}
                                        title={t(`mainMenu.${item.label}`)}
                                    >
                                        {`${index + 1}`}.&nbsp;{t(`mainMenu.${item.label}`)}
                                    </NavLink>
                                ) : (
                                    <NavLink
                                        pathName={item.path as string}
                                        variant={item.variant}
                                        title={t(`mainMenu.${item.label}`)}
                                        onClick={() => {
                                            if (item.label !== 'Resume') {
                                                setIsOpen(prev => ({ ...prev, menu: false }))
                                            }
                                        }}
                                    >
                                        {`${index + 1}`}.&nbsp;{t(`mainMenu.${item.label}`)}
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
        </div >
    )
}