'use client';

import { useState, useRef } from "react";
import { motion } from "framer-motion";

import YearLabelSpan from "./YearLabelSpan";
import CourseDot from "./CourseDot";

import { type Course } from "@/types/actionsTypes/actionsTypes";
import { type HoverDataType } from "@/types/HoverElementTypes";


export default function CertsList({ courses }: { courses: Course[] }) {
    const sortedCourses = courses.sort((a, b) => new Date(a.course_date).getTime() - new Date(b.course_date).getTime());

    const containerRef = useRef<HTMLDivElement>(null);
    const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [hoverData, setHoverData] = useState<HoverDataType>({
        hoverIndex: null,
        selectedCourse: null,
        highLightWidth: null,
    });

    const handleMouseEnter = (index: number, course: Course) => {
        if (!containerRef.current || !dotRefs.current[index]) return;

        const containerLeft = containerRef.current.getBoundingClientRect().left;
        const dotLeft = dotRefs.current[index]!.getBoundingClientRect().left;

        const width = dotLeft - containerLeft + dotRefs.current[index]!.offsetWidth / 2;

        setHoverData({
            highLightWidth: width,
            selectedCourse: course,
            hoverIndex: index
        })
    };

    const handleMouseLeave = () => {
        setHoverData({
            highLightWidth: 0,
            hoverIndex: null,
            selectedCourse: null
        })
    };

    return (
        <>
            <div className="relative w-full flex items-center justify-center mt-10">
                <YearLabelSpan year={2023} />
                <div
                    ref={containerRef}
                    className="relative w-full sm:w-10/12 h-2 bg-green-400 rounded-full mb-10 shadow-2xl shadow-green-400"
                >
                    <motion.div
                        className="absolute top-0 h-2 bg-yellow-300 rounded-full"
                        animate={{ width: (hoverData.highLightWidth as number) }}
                        transition={{ duration: 0.2 }}
                    />
                    <div className="absolute top-1/2 sm:left-[2.5rem] w-full sm:w-11/12 flex justify-around sm:gap-0 sm:justify-between -translate-y-1/2 px-1">
                        {sortedCourses.map((course, index) => (
                            <CourseDot
                                key={course.id}
                                ref={(el) => {
                                    dotRefs.current[index] = el;
                                }}
                                course={course}
                                isVisible={hoverData.hoverIndex === index}
                                onMouseEnter={() => handleMouseEnter(index, course)}
                                onMouseLeave={handleMouseLeave}
                            />
                        ))}
                    </div>
                </div>
                <YearLabelSpan />
            </div>
        </>

    );
}
