// lib/utils/getSubmitFunction.ts
import { type ReturnedType } from '@/types/actionsTypes/actionsTypes';
import { type FormMode, type SubmitFunction, type SubmitCallbacks, type ExtendedSubmitFunction } from '@/types/utils/get-submit-function';

export const isSupportedFormMode = (mode: string): mode is FormMode => {
	return mode === 'create' || mode === 'edit';
};

export const modeValidation = (mode: string) => {
	if (!isSupportedFormMode(mode)) {
		throw new Error(`Unknown or unsupported form mode: ${mode}`);
	}
};

export const getSubmitFunction = (callbacks: SubmitCallbacks, mode: FormMode): SubmitFunction => {
	modeValidation(mode);

	const submitFunction = callbacks[mode];

	if (!submitFunction) {
		throw new Error(`No submit function found for mode: ${mode}`);
	}

	return submitFunction;
};

export const getSubmitFunctionWithParams = (callbacks: SubmitCallbacks, mode: FormMode, clearExisting: boolean = false): SubmitFunction => {
	const baseFunction = getSubmitFunction(callbacks, mode);

	return (prevState: ReturnedType, formData: FormData): Promise<ReturnedType> => {
		if (mode === 'edit' && clearExisting !== undefined) {
			return (baseFunction as ExtendedSubmitFunction)(prevState, formData, clearExisting);
		}

		return baseFunction(prevState, formData);
	};
};
