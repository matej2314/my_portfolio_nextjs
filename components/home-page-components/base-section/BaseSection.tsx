import { Button } from "../../ui/button"
import HomeSubHeader from "./components/HomeSubHeader"
import IconButton from "../../IconButton"
import { contentArray } from "@/lib/subHeaderContentArray"

export default function BaseSection() {

    return (
        <section id="baseSection" className="w-full h-[100dvh] flex justify-between pl-2 snap-start">
            <div className="w-fit h-fit flex flex-col">
                <p className="w-fit h-fit text-[3.6rem] text-yellow-300 text-glow font-normal tracking-wider">Mateusz</p>
                <HomeSubHeader texts={contentArray} typingSpeed={55} deletingSpeed={30} />
                <p
                    className="w-8/12 text-xl text-white mb-5"
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis distinctio iste eligendi quia, porro ipsam saepe doloribus sunt officia reiciendis odit magnam sint dolor perferendis dolore facere eius quam! Placeat!
                </p>
                <div className="w-8/12 flex justify-start items-start h-fit gap-5">
                    <Button
                        className="w-fit h-fit  flex hover:bg-yellow-300 hover:text-slate-600 justify-center items-center bg-yellow-200 text-slate-900 font-bold text-3xl"
                    >
                        Contact me
                    </Button>
                    <IconButton
                        iconCode="maki:arrow"
                        iconClass="mt-1 ml-1"
                        className="w-fit h-fit flex justify-center items-center font-bold text-2xl pt-2 pb-3 bg-transparent border-2 border-yellow-300 text-yellow-300 hover:bg-transparent hover-shadow"
                    >
                        Learn more

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