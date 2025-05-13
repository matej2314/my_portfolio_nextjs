import TypingLine from "../TypingLine"

export default function BaseSection() {

    return (
        <section id="baseSection" className="w-full flex justify-between pt-5 pl-2">
            <div className="w-fit h-fit flex flex-col">
                <p className="w-fit h-fit text-[3.6rem] text-yellow-300 text-glow font-normal tracking-wider">Mateusz</p>
                <p className="text-4xl text-green-700 font-mono">Web Developer</p>
                <p className="w-8/12 text-xl text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis distinctio iste eligendi quia, porro ipsam saepe doloribus sunt officia reiciendis odit magnam sint dolor perferendis dolore facere eius quam! Placeat!</p>
            </div>
            <div className="w-10/12 pr-5 pt-[7rem]">
                <p className="text-4xl text-green-600 italic font-extralight  hover:font-semibold">
                    <span className="mr-1 font-extralight">❝</span>
                    First, solve the problem.<br />&nbsp;&nbsp;&nbsp;Then, write the code.❞</p>
            </div>
        </section>
    )
}