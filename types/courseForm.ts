import { type Course } from './actionsTypes/actionsTypes';

export interface CourseFormProps {
	courseData?: Course;
	mode?: 'edit' | 'create';
}
