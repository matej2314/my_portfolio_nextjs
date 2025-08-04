import path from 'path';
import { promises as fs } from 'fs';

import { convertFormData } from './formDataToObjectConvert';
import { validateData } from './utils';
import { mainFilesSchema, galleryFilesSchema } from '../zod-schemas/fileValidationSchema';
import { type ValidationResult } from '@/types/actionsTypes/actionsTypes';
import { type SaveImagesResult } from '@/types/manageImages';
import { idSchema } from '../zod-schemas/idSchema';
import { getCache, setCache } from '../redis/redis';
import { REDIS_KEYS } from '../redis/redisKeys';
import { getFilesList } from './getFilesList';
import { logErrAndReturn } from './logErrAndReturn';
import { updateProjectSchema } from '../zod-schemas/projectSchema';

export const extractBaseName = (fileName: string): string => {
	const name = path.parse(fileName).name;
	return name.split('-')[0];
};

export const isFilesSended = (mainFiles: File[] | [], galleryFiles: File[] | []) => {
	return mainFiles.some(file => file.size > 0) || galleryFiles.some(file => file.size > 0);
};

export const saveFile = async (file: File, dir: string): Promise<string> => {
	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	const filePath = path.join(dir, file.name);
	await fs.writeFile(filePath, buffer);
	return file.name;
};

export const createProjectPaths = async (projectId: string) => {
	const baseDir = path.resolve(process.cwd(), 'public', 'projects-photos', projectId);
	const mainDir = path.join(baseDir, 'main');
	const galleryDir = path.join(baseDir, 'gallery');

	return {
		baseDir,
		mainDir,
		galleryDir,
	};
};

export const createProjectFolders = async (baseDir: string, mainDir: string, galleryDir: string) => {
	await fs.mkdir(baseDir, { recursive: true });
	await fs.mkdir(mainDir, { recursive: true });
	await fs.mkdir(galleryDir, { recursive: true });
};

export const deleteFilesInDir = async (dir: string): Promise<{ deletedFiles: number }> => {
	const files = await fs.readdir(dir);
	let deletedFiles = 0;

	for (const file of files) {
		const filePath = path.join(dir, file);
		const stats = await fs.stat(filePath);

		if (stats.isDirectory()) {
			await fs.rm(filePath, { recursive: true, force: true });
		} else {
			await fs.unlink(filePath);
		}
		deletedFiles++;
	}

	return { deletedFiles };
};

export const projectObjectForValidation = (projectData: FormData) => {
	const projectDataForValidation = new FormData();

	for (const [key, value] of projectData.entries()) {
		if (key !== 'project_main_screens' && key !== 'project_gallery_screens') {
			projectDataForValidation.append(key, value);
		}
	}

	return convertFormData(projectDataForValidation);
};

export function validateProjectFiles(mainFiles: File[] | [], galleryFiles: File[] | [], mode: 'save' | 'update'): ValidationResult {
	if (mode === 'save') {
		const mainValidation = validateData(mainFiles, mainFilesSchema);
		const galleryValidation = validateData(galleryFiles, galleryFilesSchema);

		if (!mainValidation.success || !galleryValidation.success) {
			const errors: string[] = [];

			if (!mainValidation.success) errors.push(mainValidation.error.message);
			if (!galleryValidation.success) errors.push(galleryValidation.error.message);

			return {
				success: false,
				error: errors.join(';'),
			};
		}

		return {
			success: true,
			mainFiles: mainValidation.data as File[],
			galleryFiles: galleryValidation.data as File[],
		};
	} else if (mode === 'update') {
		let validMainFiles: File[] | [] = [];
		let validatedGalleryFiles: File[] | [] = [];
		const errors: string[] = [];

		if (mainFiles.some(file => file.size > 0)) {
			const isValidMainFiles = validateData(mainFiles, mainFilesSchema);
			if (!isValidMainFiles.success) {
				errors.push(isValidMainFiles.error.message);
			} else {
				validMainFiles = isValidMainFiles.data as File[];
			}
		}

		if (galleryFiles.some(file => file.size > 0)) {
			const isValidGalleryFiles = validateData(galleryFiles, galleryFilesSchema);
			if (!isValidGalleryFiles.success) {
				errors.push(isValidGalleryFiles.error.message);
			} else {
				validatedGalleryFiles = isValidGalleryFiles.data as File[];
			}
		}

		return errors.length === 0
			? {
					success: true,
					mainFiles: validMainFiles,
					galleryFiles: validatedGalleryFiles,
			  }
			: {
					success: false,
					error: errors.join('; '),
			  };
	}

	return {
		success: false,
		error: 'Invalid validation mode',
	};
}

export const isDirectoryExists = async (dir: string) => {
	return await fs
		.access(dir)
		.then(() => true)
		.catch(() => false);
};

export function createResultObject(projectId?: string, mainFileName?: string, mainFilesSaved?: number, galleryFilesSaved?: number, mainFilesDeleted?: number, galleryFilesDeleted?: number): SaveImagesResult {
	return {
		projectId,
		mainFileName,
		mainFilesSaved,
		galleryFilesSaved,
		mainFilesDeleted,
		galleryFilesDeleted,
	};
}

export async function getProjectFiles(projectId: string, folder: 'main' | 'gallery', cache: boolean = false): Promise<{ success: boolean; files: string[] } | { success: boolean; error: string }> {
	const shotsKey = REDIS_KEYS.PROJECT_SHOTS(projectId);

	if (!cache) {
		const inputId = validateData(projectId, idSchema);
		if (!inputId.success) {
			return logErrAndReturn('getProjectFiles', inputId.error.flatten(), { success: false, error: 'Invalid input data.' });
		}
		projectId = inputId.data as string;
	}

	if (cache && folder === 'gallery') {
		const cachedShots = await getCache<string[]>(shotsKey);
		if (cachedShots) return { success: true, files: cachedShots };
	}

	try {
		const files = await getFilesList(projectId, folder);

		if (cache && folder === 'gallery') {
			await setCache<string[]>(shotsKey, files, 3600);
		}
		return { success: true, files };
	} catch (error) {
		return logErrAndReturn('getProjectFiles', error, { success: false, error: 'Failed to fetch project files.' });
	}
}

export const validateProjectData = (projectData: Record<string, string | null>) => {
	return updateProjectSchema.safeParse(projectData);
};
