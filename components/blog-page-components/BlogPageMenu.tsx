import LanguageSwitcher from "../LanguageSwitcher"
import BaseMenu from "../BaseMenu"
import { blogMenuArray } from "@/lib/menuArrays"

export default function BlogPageMenu() {

    return (
        <>
            <BaseMenu array={blogMenuArray} />
            <LanguageSwitcher />
        </>
    )
}