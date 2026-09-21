import { type ReturnedType } from '@/types/actionsTypes/actionsTypes';
import { type FormMode, type SubmitFunction, type SubmitCallbacks } from '@/types/utils/get-submit-function';

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

