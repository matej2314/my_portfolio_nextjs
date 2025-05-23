import { type Course } from "./actionsTypes/actionsTypes";

export type CourseDotProps = {
    course: Course;
    isVisible: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
};