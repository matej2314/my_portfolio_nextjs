'use client';

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import { defaultData } from "@/lib/defaultData";

import SelectElement from "./ui/elements/SelectElement";

export default function LanguageSwitcher() {
    const currentLocale = useLocale();
    const router = useRouter();
    const langOptions = defaultData.langOptions;

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
            aria-label="Select language"
            className="md:min-w-[6rem] items-center xl:flex md:h-[2rem] bg-black  border-green-300 border-[1px] text-slate-300 rounded-full px-3 py-1 text-sm font-semibold justify-center appearance-none focus:border-[1px] focus:border-green-300"

        />
    )
}