'use client';

import { useDeviceType } from "@/hooks/useDeviceType";

export default function SloganWrapper() {

    const device = useDeviceType();

    return (
        <div className={`relative w-full h-fit flex justify-center items-center mt-[5rem] mr-[4rem] ${device === 'mobile' ? 'hidden' : ''}`}>
            <div className="absolute w-[15rem] h-full bg-linear-to-r from-amber-300/40 to-green-300/40 blur-2xl rounded-full" />
            <p className="text-4xl text-green-500 italic font-extralight">
                <span className="mr-1 font-extralight">❝</span>
                First solve the problem.<br />&nbsp;&nbsp;&nbsp;Then write the code.
                <span className="font-ex">❞</span>
            </p>
        </div>
    )
}