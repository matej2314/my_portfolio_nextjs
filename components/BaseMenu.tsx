'use client';

import { useState, useRef } from "react";

import { useClickOutside } from "@/hooks/useClickOutside";

import NavLink from "./NavLink"
import CvSelector from "./home-page-components/CvSelector"

import { type MenuItem } from "@/lib/menuArrays"

export default function BaseMenu({ array }: { array: MenuItem[] }) {
    const [isCvOpen, setIsCvOpen] = useState<boolean>(false);
    const selectorRef = useRef<HTMLDivElement>(null);

    const toggleCvSelector = () => {
        setIsCvOpen(prevState => !prevState);
    }

    useClickOutside(selectorRef, () => toggleCvSelector);

    return (
        <ul className="text-zinc-100 text-xl flex items-center gap-x-4 mr-3 mt-1">
            {array.map((item, index) => (
                <li
                    key={index}
                    className="w-full h-full flex mx-auto text-nowrap gap-4 font-mono items-center relative"
                >
                    {item.label === 'Resume' ? (
                        <button onClick={toggleCvSelector}>
                            <NavLink pathName={item.path as string} variant={item.variant}>
                                {`${index + 1}`}.{item.label}
                            </NavLink>
                        </button>
                    ) : (
                        <NavLink pathName={item.path as string} variant={item.variant}>
                            {`${index + 1}`}.{item.label}
                        </NavLink>
                    )}
                    {index < array.length - 1 && <span>|</span>}
                    {item.label === 'Resume' && isCvOpen && (
                        <div ref={selectorRef} className="absolute top-full left-0 z-10">
                            <CvSelector isOpen={isCvOpen} />
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
}