import Link from "next/link";
import { getCvHref } from "@/lib/utils/getCvHref";
import { getLocale } from "next-intl/server";

export default async function HomeFooter() {
    const locale = await getLocale();
    const { cvHref, cvFileName } = getCvHref(locale);

    return (
        <footer className="w-full h-full max-h-[50px] flex justify-start items-center px-4 py-4">
            <div className="grid grid-rows-2 w-full h-fit md:flex md:justify-between items-center text-slate-400">
                <p>© 2025 Mateusz Śliwowski. Wszelkie prawa zastrzeżone.</p>
                <div className="flex gap-4">
                <Link className="text-yellow-300 hover:text-yellow-400 focus:text-yellow-400 focus:outline-none" href={cvHref} download={cvFileName}>Download CV</Link>
                    <Link className="text-yellow-300 hover:text-yellow-400 focus:text-yellow-400 focus:outline-none" href="https://www.linkedin.com/in/mateusz-mateo2314-sliwowski/">LinkedIn</Link>
                    <Link className="text-yellow-300 hover:text-yellow-400 focus:text-yellow-400 focus:outline-none" href="https://github.com/matej2314">GitHub</Link>
                </div>
            </div>
        </footer>
    )
}