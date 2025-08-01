import { getTranslations } from "next-intl/server"

import { Button } from "../../ui/button"
import NavLink from "@/components/links/NavLink"
import HomeSubHeader from "./components/HomeSubHeader"
import SloganWrapper from "./components/SloganWrapper"
import IconButton from "@/components/ui/elements/IconButton"
import { defaultData } from "@/lib/defaultData"

export default async function BaseSection() {

    const t = await getTranslations("homePage");
    const contentArray = defaultData.baseSectionSubHeader.content;
    const typingSpeed = defaultData.baseSectionSubHeader.typingSpeed;
    const deletingSpeed = defaultData.baseSectionSubHeader.deletingSpeed;

    return (
        <section id="baseSection" className="w-full min-h-screen h-screen flex flex-col md:flex-row justify-center px-5 lg:pt-[3rem] gap-4 font-kanit snap-start">
            <div className=" w-full flex flex-col items-start mt-6 md:mt-[5rem]">
                <p className="text-4xl sm:text-5xl md:text-6xl text-yellow-300 text-glow">
                    Mateusz
                </p>
                <div className="w-fit">
                    <HomeSubHeader texts={contentArray} typingSpeed={typingSpeed} deletingSpeed={deletingSpeed} />
                </div>
                <p className=" text-sm sm:text-base md:text-xl text-white mb-5 tracking-wide text-justify leading-[2rem] mt-3">
                    {t("baseSection.baseDescription")}
                </p>
                <div className="w-full sm:w-11/12 h-fit flex flex-col items-center justify-center sm:flex-row gap-4 sm:gap-2">
                    <NavLink
                        variant="home"
                        pathName="#contactSection"
                        title='Contact me'
                        aria-label="Navigate to contact section"
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
                        className="w-fit md:w-fit h-fit flex px-4 sm:px-0 justify-center items-center font-bold tracking-wide xl:text-2xl pt-2 pb-3 bg-transparent border-2 border-yellow-300 text-yellow-300 hover:bg-transparent hover-shadow"
                        redirectPath="#aboutSection"
                        aria-label="Navigate to about section"
                    >
                        {t("baseSection.learnMoreTxt")}
                    </IconButton>
                </div>
            </div>
            <SloganWrapper />
        </section>

    )
}