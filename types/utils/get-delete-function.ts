import { type ReturnedType } from '@/types/actionsTypes/actionsTypes';

// get delete function for delete any data from the database

export type DeleteFunction = (prevState: ReturnedType, formData: FormData) => Promise<ReturnedType>;

export type DataType = 'course' | 'project' | 'skill' | 'blogPost' | 'experience';
