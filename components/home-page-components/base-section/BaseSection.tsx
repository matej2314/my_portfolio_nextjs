import { getTranslations } from "next-intl/server"

import { Button } from "../../ui/button"
import NavLink from "@/components/NavLink"
import HomeSubHeader from "./components/HomeSubHeader"
import IconButton from "../../IconButton"
import { contentArray } from "@/lib/subHeaderContentArray"

export default async function BaseSection() {

    const t = await getTranslations("homePage");

    return (
        <section id="baseSection" className="w-full h-screen flex justify-between pl-2 snap-start">
            <div className="w-fit h-fit flex flex-col ml-10 mt-9">
                <p className="w-fit h-fit text-[3.6rem] text-yellow-300 text-glow font-normal tracking-wider">Mateusz</p>
                <HomeSubHeader texts={contentArray} typingSpeed={55} deletingSpeed={30} />
                <p
                    className="w-8/12 text-xl text-white mb-5 tracking-wide"
                >
                    {t("baseSection.baseDescription")}
                </p>
                <div className="w-7/12 flex justify-start items-start h-fit gap-5">
                    <NavLink
                        variant="home"
                        pathName="#contactSection"
                        title='Contact me'
                    >
                        <Button
                            className="w-fit h-fit  flex hover:bg-yellow-300 hover:text-slate-600 justify-center items-center bg-yellow-200 text-slate-900 font-bold text-3xl"
                        >
                            {t("baseSection.contactTxt")}
                        </Button>
                    </NavLink>
                    <IconButton
                        iconCode="maki:arrow"
                        iconClass="mt-1 ml-1"
                        className="w-fit h-fit flex justify-center items-center font-bold text-2xl pt-2 pb-3 bg-transparent border-2 border-yellow-300 text-yellow-300 hover:bg-transparent hover-shadow"
                        redirectPath="#aboutSection"
                    >
                        {t("baseSection.learnMoreTxt")}

                    </IconButton>
                </div>
            </div>
            <div className="relative w-10/12 h-fit pr-5 pt-[10rem] hover:font-semibold flex justify-center items-center">
                <div className="absolute w-[15rem] h-full bg-linear-to-r from-amber-300/40 to-green-300/40 blur-2xl rounded-full" />
                <p className="absolute text-4xl text-green-500 italic font-extralight">
                    <span className="mr-1 font-extralight">❝</span>
                    First solve the problem.<br />&nbsp;&nbsp;&nbsp;Then write the code.
                    <span className="font-ex">❞</span>
                </p>
            </div>
        </section>
    )
}