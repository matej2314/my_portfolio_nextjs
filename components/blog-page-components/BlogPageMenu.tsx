import BaseMenu from "../BaseMenu"
import { blogMenuArray } from "@/lib/arrays/menuArrays"

export default function BlogPageMenu() {

    return (
        <section
            id="blog-page-menu"
            className="w-full border-b border-green-900/20 bg-[#000805]"
        >
            <BaseMenu array={blogMenuArray} />
        </section>
    )
}