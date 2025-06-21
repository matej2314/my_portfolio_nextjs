'use client';

import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

import NavLink from "../links/NavLink";
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
    const t = useTranslations();

    return (
        <>
            <Button
                variant="ghost"
                onClick={() => setIsOpen(prev => ({ ...prev, menu: !prev.menu }))}
                className={`fixed top-4 right-0.5 z-50 w-fit h-fit flex flex-col transition-transform ${isOpen.menu ? 'scale-115' : 'scale-150'} hover:bg-transparent`}
            >
                <MLetter mode="button" />
            </Button>

            <AnimatePresence>
                {isOpen.menu && (
                    <motion.ul
                        key="mobile-menu"
                        initial={{ clipPath: 'inset(0% 0% 100% 0%)', opacity: 1 }}
                        animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
                        exit={{ clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut', type: 'tween' }}
                        className="fixed inset-0 z-40 bg-[#000905] pt-24 px-4 text-green-400 flex flex-col gap-4 overflow-y-auto"
                    >
                        <li className="w-full flex justify-end">
                            <LanguageSwitcher />
                        </li>

                        {array.map((item, index) => (
                            <li
                                key={index}
                                className="w-full h-[2rem] flex justify-center gap-4 items-center font-kanit font-semibold tracking-wide text-nowrap relative"
                            >
                                <NavLink
                                    pathName={item.path as string}
                                    variant={item.variant}
                                    title={t(`mainMenu.${item.label}`)}
                                    onClick={() => {
                                        if (item.label !== 'Resume') {
                                            setIsOpen(prev => ({ ...prev, menu: false }));
                                        } else {
                                            setIsOpen(prev => ({ ...prev, cv: !prev.cv }));
                                        }
                                    }}
                                >
                                    {`${index + 1}`}.&nbsp;{t(`mainMenu.${item.label}`)}
                                </NavLink>

                                {item.label === 'Resume' && isOpen.cv && (
                                    <CvSelectorWrapper onClose={() => setIsOpen(prev => ({ ...prev, cv: false }))} />
                                )}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </>
    );
}
