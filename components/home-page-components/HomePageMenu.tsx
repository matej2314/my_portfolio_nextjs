import { homeMenuArray } from "@/lib/arrays/menuArrays";
import BaseMenu from "../BaseMenu";

export default function HomePageMenu() {

    return (
        <section
            id="home-page-menu"
            className="sticky top-0 z-40 w-full border-b border-green-900/20 bg-[#000805]"
        >
            <BaseMenu array={homeMenuArray} />
        </section>
    )
}