import { type ReturnedType } from '@/types/actionsTypes/actionsTypes';

export type DeleteFunction = (prevState: ReturnedType, formData: FormData) => Promise<ReturnedType>;

export type DataType = 'course' | 'project' | 'skill' | 'blogPost' | 'experience';
