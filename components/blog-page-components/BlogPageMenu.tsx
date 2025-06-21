import LanguageSwitcher from "../LanguageSwitcher"
import BaseMenu from "../BaseMenu"
import { blogMenuArray } from "@/lib/menuArrays"

export default function BlogPageMenu() {

    return (
        <section id="blog-page-menu" className="w-9/12 h-[2rem] flex justify-end items-end ml-[5rem]">
            < BaseMenu array={blogMenuArray} />
        </section>
    )
}