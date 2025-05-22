'use client';

import { type Course } from "@/types/actionsTypes/actionsTypes";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

import YearLabelSpan from "./YearLabelSpan";
import CourseHoverElement from "./CourseHoverElement";


export default function CertsList({ courses }: { courses: Course[] }) {
    const sortedCourses = courses
        .slice()
        .sort((a, b) => new Date(a.course_date).getTime() - new Date(b.course_date).getTime());

    const containerRef = useRef<HTMLDivElement>(null);
    const [hoverIndex, setHoveredIndex] = useState<number | null>(null);
    // const [hoveredCourse, setHoveredCourse] = useState<Course | null>(null);
    const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [highlightWidth, setHighlightWidth] = useState(0);

    const handleMouseEnter = (index: number) => {
        if (!containerRef.current || !dotRefs.current[index]) return;

        const containerLeft = containerRef.current.getBoundingClientRect().left;
        const dotLeft = dotRefs.current[index]!.getBoundingClientRect().left;

        const width = dotLeft - containerLeft + dotRefs.current[index]!.offsetWidth / 2;
        setHighlightWidth(width);
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHighlightWidth(0);
    };

    return (
        <div className="w-full flex  items-center justify-center mt-10">
            <YearLabelSpan year={2023} />
            <div
                ref={containerRef}
                className="relative w-full max-w-4xl h-2 bg-green-400 rounded-full mb-10 shadow-2xl shadow-green-400 hover:shadow-2xl hover:shadow-yellow-300"
            >
                <motion.div
                    className="absolute top-0 left-0 h-2 bg-yellow-300 rounded-full"
                    animate={{ width: highlightWidth }}
                    transition={{ duration: 0.3 }}
                />
                <div className="absolute top-1/2 left-0 w-full flex justify-between -translate-y-1/2 px-1">
                    {sortedCourses.map((course, index) => (
                        <>
                            <div
                                key={course.id}
                                ref={(el) => {
                                    dotRefs.current[index] = el;
                                }}
                                className="relative z-10 w-5 h-5 bg-white border-2 border-green-500 rounded-full cursor-pointer hover:scale-110 transition"
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                                title={`${course.course_name} - ${new Date(course.course_date).toLocaleDateString()}`}
                            />
                            <CourseHoverElement course={course} isVisible={hoverIndex === index} />
                        </>
                    ))}
                </div>
            </div>
            <YearLabelSpan />
        </div>
    );
}
