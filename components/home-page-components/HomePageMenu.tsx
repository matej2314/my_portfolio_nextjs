import { homeMenuArray } from "@/lib/menuArrays";
import BaseMenu from "../BaseMenu";
import LanguageSwitcher from "../LanguageSwitcher";

export default function HomePageMenu() {

    return (
        <section className="w-fit h-full flex justify-end items-center">
            <BaseMenu array={homeMenuArray} />
            <LanguageSwitcher />
        </section>
    )
}