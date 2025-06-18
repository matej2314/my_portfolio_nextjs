import { getTranslations } from "next-intl/server"

import { Button } from "../../ui/button"
import NavLink from "@/components/NavLink"
import HomeSubHeader from "./components/HomeSubHeader"
import SloganWrapper from "./components/SloganWrapper"
import IconButton from "../../IconButton"
import { contentArray } from "@/lib/subHeaderContentArray"

export default async function BaseSection() {

    const t = await getTranslations("homePage");

    return (
        <section id="baseSection" className="w-full min-h-screen flex justify-center px-5 gap-4 font-kanit">
            <div className=" w-full flex flex-col items-start mt-6 md:mt-10">
                <p className="text-4xl sm:text-5xl md:text-6xl text-yellow-300 text-glow">
                    Mateusz
                </p>

                <HomeSubHeader texts={contentArray} typingSpeed={55} deletingSpeed={30} />

                <p className=" text-sm sm:text-base md:text-xl text-white mb-5 tracking-wide text-justify leading-[2rem] mt-3">
                    {t("baseSection.baseDescription")}
                </p>

                <div className="w-full flex flex-col items-center justify-center sm:flex-row sm:items-center gap-4 sm:gap-5 mt-4">

                    <NavLink
                        variant="home"
                        pathName="#contactSection"
                        title='Contact me'
                    >
                        <Button
                            className="w-1/2 md:w-fit h-fit xl:mt-0 text-md flex hover:bg-yellow-300 hover:text-slate-600 justify-center items-center bg-yellow-200 text-slate-900 font-bold tracking-wide xl:text-3xl"
                        >
                            {t("baseSection.contactTxt")}
                        </Button>
                    </NavLink>

                    <IconButton
                        iconCode="maki:arrow"
                        iconClass="mt-1 ml-1"
                        className="w-1/2 md:w-fit h-fit flex justify-center items-center font-bold tracking-wide xl:text-2xl pt-2 pb-3 bg-transparent border-2 border-yellow-300 text-yellow-300 hover:bg-transparent hover-shadow"
                        redirectPath="#aboutSection"
                    >
                        {t("baseSection.learnMoreTxt")}
                    </IconButton>
                </div>
            </div>
            <SloganWrapper />
        </section>

    )
}