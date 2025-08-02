import { type ReturnedType } from '../actionsTypes/actionsTypes';

export type SubmitFunction = (prevState: ReturnedType, formData: FormData) => Promise<ReturnedType>;
export type ExtendedSubmitFunction = (prevState: ReturnedType, formData: FormData, clearExisting: boolean) => Promise<ReturnedType>;

export type FormMode = 'create' | 'edit';

export interface SubmitCallbacks {
	create: SubmitFunction;
	edit: SubmitFunction;
}

export interface AdditionalParams {
	clearExisting?: boolean;
}
