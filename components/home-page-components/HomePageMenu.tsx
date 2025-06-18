import { homeMenuArray } from "@/lib/menuArrays";
import BaseMenu from "../BaseMenu";
import LanguageSwitcher from "../LanguageSwitcher";

export default function HomePageMenu() {

    return (
        <section className="w-full md:h-[2.5rem] flex justify-end items-start fixed bg-[#0c0c0c] top-1">
            <BaseMenu array={homeMenuArray} />
            <LanguageSwitcher />
        </section>
    )
}