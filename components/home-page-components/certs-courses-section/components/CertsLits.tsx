'use client';

import { useState, useRef, type RefObject } from "react";
import { motion } from "framer-motion";

import YearLabelSpan from "./YearLabelSpan";
import CourseDot from "./CourseDot";
import SwipeHand from "@/components/ui/elements/SwipeHand";
import CourseHoverElement from "./CourseHoverElement";

import { useDeviceType } from "@/hooks/useDeviceType";

import { getSortedCourses } from "@/lib/utils/utils";
import { calculateElementPosition, validateRefs } from "@/lib/utils/certs-list";

import { type Course } from "@/types/actionsTypes/actionsTypes";
import { type HoverDataType } from "@/types/HoverElementTypes";

export default function CertsList({ courses }: { courses: Course[] }) {
    const sortedCourses = getSortedCourses(courses);
    const device = useDeviceType();
    const containerRef = useRef<HTMLDivElement>(null);
    const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [hoverData, setHoverData] = useState<HoverDataType>({
        hoverIndex: null,
        selectedCourse: null,
        highLightWidth: null,
    });

    const handleMouseEnter = (index: number, course: Course) => {
        if (!validateRefs(containerRef as RefObject<HTMLDivElement>, dotRefs, index)) return;

        const elementPosition = calculateElementPosition(containerRef as RefObject<HTMLDivElement>, dotRefs, index);

        setHoverData({
            highLightWidth: elementPosition,
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

    if (device === 'mobile') {
        return (
            <div className="w-full overflow-x-auto px-4 pt-6 scroll-smooth whitespace-nowrap snap-x snap-mandatory no-scrollbar">
                <div className="inline-flex min-w-full">
                    {sortedCourses.map((course) => (
                        <div
                            key={course.id}
                            className="min-w-[85vw] sm:min-w-[22rem] snap-center flex flex-col items-center justify-start bg-linear-green rounded-lg p-4 border border-green-400 shadow-lg"
                        >
                            <CourseHoverElement course={course} isVisible={true} />
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex justify-center">
                    <SwipeHand />
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="relative max-w-screen w-full flex items-center justify-center mt-10">
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
            <SwipeHand />
        </>

    );
}
