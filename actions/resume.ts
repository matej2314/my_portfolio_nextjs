'use server';

import fs from 'fs';
import path from 'path';

import { cvFileSchema } from '@/lib/zod-schemas/fileValidationSchema';
import { logErrAndReturn } from '@/lib/utils/logErrAndReturn';
import { validateData } from '@/lib/utils/utils';

import { type ReturnedType } from '@/types/actionsTypes/actionsTypes';

export async function saveResume(prevState: ReturnedType, formData: FormData): Promise<ReturnedType> {
	const file = formData.get('cv_file') as File;

	if (!file || !(file instanceof File)) {
		return logErrAndReturn('saveResume', 'No file uploaded or invalid file.', { success: false, error: 'No file uploaded or invalid file.' });
	}

	const validatedCvFile = validateData(file, cvFileSchema);

	if (!validatedCvFile.success) {
		return logErrAndReturn('saveResume', validatedCvFile.error.flatten(), { success: false, error: 'Cv file validation error' });
	}

	const fileName = (validatedCvFile.data as File).name;
	const buffer = Buffer.from(await (validatedCvFile.data as File).arrayBuffer());
	const uploadPath = path.join(process.cwd(), 'public', 'cv', fileName);

	try {
		await fs.promises.writeFile(uploadPath, buffer);
		return { success: true, message: 'Cv saved correctly' };
	} catch (error) {
		return logErrAndReturn('saveResume', error, { success: false, error: 'Failed to save cv file.' });
	}
}
