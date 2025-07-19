'use client';

import { motion } from "framer-motion";
import { forwardRef } from "react";

import CourseHoverElement from "./CourseHoverElement";

import { type CourseDotProps } from "@/types/CourseDotTypes";

const CourseDot = forwardRef<HTMLDivElement, CourseDotProps>(
    ({ course, isVisible, onMouseEnter, onMouseLeave }, ref) => (
        <motion.div
            ref={ref}
            whileHover={{
                backgroundColor: '#fde68a'
            }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="flex justify-center z-10 w-5 h-5 bg-white border-2 border-yellow-300 rounded-full cursor-pointer hover:scale-110 transition"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onTapStart={onMouseEnter}
            onTapCancel={onMouseLeave}
            title={`${course.course_name} - ${new Date(course.course_date).toLocaleDateString("pl-PL")}`}
        >
            <CourseHoverElement course={course} isVisible={isVisible} />
        </motion.div>
    )
);

CourseDot.displayName = 'CourseDot';

export default CourseDot;