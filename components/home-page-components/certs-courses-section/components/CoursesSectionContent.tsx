'use client';

import { easeInOut, motion} from "framer-motion";

import CertsList from "./CertsLits";

import { useDeviceType } from "@/hooks/useDeviceType";
import { type Course } from "@/types/actionsTypes/actionsTypes";


export default function CoursesSectionContent({ description, courses }: { description: string, courses: Course[] }) {
    const device = useDeviceType();
    const isMobile = device === 'mobile';

    const paragraphVariant = {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeInOut } }
    }
    const listContainerVariant = {
        hidden: { opacity: 0, y: 150 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeInOut } }
    }
    
    return ( 
        <section className="w-full h-screen flex flex-col justify-center items-center gap-2">
            <motion.p
                variants={paragraphVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.3, once: true }}
            className="w-full h-fit text-justify sm:px-[8rem] flex justify-center items-center text-slate-200 text-lg sm:text-xl leading-7 tracking-wide"
        >
            {description}
            </motion.p>
            <motion.div
                variants={listContainerVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.3, once: true }}
                className="w-full h-fit flex justify-center items-start"> 
                <CertsList courses={courses} />
            </motion.div>
    </section>
    )
}