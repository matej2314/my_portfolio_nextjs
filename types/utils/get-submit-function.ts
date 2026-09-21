import { type ReturnedType } from '../actionsTypes/actionsTypes';

export type SubmitFunction = (prevState: ReturnedType, formData: FormData) => Promise<ReturnedType>;
export type FormMode = 'create' | 'edit';

export interface SubmitCallbacks {
	create: SubmitFunction;
	edit: SubmitFunction;
}
