import { homeMenuArray } from "@/lib/menuArrays";
import BaseMenu from "../BaseMenu";

export default function HomePageMenu() {

    return (
        <section id="home-page-menu" className="w-screen md:h-[5rem] relative top-0 flex justify-end items-center md:translate-x-9.5 md:items-end md:fixed bg-[#000905]">
            <BaseMenu array={homeMenuArray} />
        </section>
    )
}