'use server';

import fs from 'fs';
import path from 'path';

import { cvFileSchema } from '@/lib/zod-schemas/fileValidationSchema';
import { logErrAndReturn } from '@/lib/utils/logErrAndReturn';
import { validateData } from '@/lib/utils/utils';

import { type CvFileEntry, type GetCvFilesListType, type ReturnedType } from '@/types/actionsTypes/actionsTypes';

const CV_DIR = path.join(process.cwd(), 'public', 'cv');

function getFileExtension(fileName: string): string {
	const base = fileName.split(/[/\\]/).pop() ?? fileName;
	const lastDot = base.lastIndexOf('.');
	if (lastDot === -1 || lastDot >= base.length - 1) return '';
	return base.slice(lastDot + 1).toLowerCase();
}

export async function getCvFilesList(): Promise<GetCvFilesListType> {
	try {
		await fs.promises.access(CV_DIR);
	} catch {
		return { files: [] };
	}

	try {
		const entries = await fs.promises.readdir(CV_DIR, { withFileTypes: true });
		const files: CvFileEntry[] = [];

		for (const entry of entries) {
			if (!entry.isFile()) continue;

			const filePath = path.join(CV_DIR, entry.name);
			const stats = await fs.promises.stat(filePath);

			files.push({
				id: entry.name,
				fileName: entry.name,
				extension: getFileExtension(entry.name),
				lastModified: stats.mtime.toLocaleString('pl-PL', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
					hour: '2-digit',
					minute: '2-digit',
				}),
			});
		}

		files.sort((a, b) => a.fileName.localeCompare(b.fileName, 'pl'));

		return { files };
	} catch (error) {
		return logErrAndReturn('getCvFilesList', error, { error: 'Failed to fetch cv files.' });
	}
}

export async function saveResume(prevState: ReturnedType, formData: FormData): Promise<ReturnedType> {
	const file = formData.get('cv_file') as File;

	if (!file || !(file instanceof File)) return logErrAndReturn('saveResume', 'No file uploaded or invalid file.', { success: false, error: 'No file uploaded or invalid file.' });

	const validatedCvFile = validateData(file, cvFileSchema);

	if (!validatedCvFile.success) return logErrAndReturn('saveResume', validatedCvFile.error.flatten(), { success: false, error: 'Cv file validation error' });

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
