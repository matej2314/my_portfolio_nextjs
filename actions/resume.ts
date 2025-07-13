'use server';

import fs from 'fs';
import path from 'path';

import { cvFileSchema } from '@/lib/zod-schemas/fileValidationSchema';

import { type ReturnedType } from '@/types/actionsTypes/actionsTypes';

export async function saveResume(_: any, formData: FormData): Promise<ReturnedType> {
	const file = formData.get('cv_file') as File;

	if (!file || !(file instanceof File)) {
		return { success: false, error: 'No file uploaded or invalid file.' };
	}

	const validatedCvFile = cvFileSchema.safeParse(file);

	if (!validatedCvFile.success) {
		console.error(validatedCvFile.error.flatten());
		return { success: false, error: 'Cv file validation error' };
	}

	const fileName = validatedCvFile.data.name;
	const buffer = Buffer.from(await validatedCvFile.data.arrayBuffer());
	const uploadPath = path.join(process.cwd(), 'public', 'cv', fileName);

	try {
		await fs.promises.writeFile(uploadPath, buffer);
		return { success: true, message: 'Cv saved correctly' };
	} catch (error) {
		console.error('Cv saving error:', error);
		return {
			success: false,
			error: 'Failed to save cv file.',
		};
	}
}
