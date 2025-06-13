'use client';

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import { langOptions } from "@/lib/langArray";

import SelectElement from "./ui/elements/SelectElement";

export default function LanguageSwitcher() {
    const currentLocale = useLocale();
    const router = useRouter();

    async function handleChange(locale: string) {
        const res = await fetch('/api/locale', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ locale }),
        });

        if (res.ok) {
            router.refresh();
        }
    }

    return (
        <SelectElement
            value={currentLocale}
            onChange={handleChange}
            options={langOptions}
            className="min-w-[6rem] h-[2rem] bg-black hidden  border-green-300 border-[1px] text-slate-300 rounded-full px-3 py-1 text-sm font-semibold xl:flex justify-center appearance-none focus:border-[1px] focus:border-green-300"

        />
    )
}