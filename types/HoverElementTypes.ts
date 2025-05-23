import { type Course } from "./actionsTypes/actionsTypes";

export type CourseHoverType = {
    course: Course;
    isVisible: boolean;
};

export interface HoverDataType {
    hoverIndex: number | null;
    selectedCourse: Course | null;
    highLightWidth: number | null;
}