import path from 'path';
import { promises as fs } from 'fs';

import { convertFormData } from './formDataToObjectConvert';
import { mainFilesSchema, galleryFilesSchema } from './zod-schemas/fileValidationSchema';
import { type ValidationResult } from '@/types/actionsTypes/actionsTypes';
import { type SaveImagesResult } from '@/types/manageImages';

export const extractBaseName = (fileName: string): string => {
	const name = path.parse(fileName).name;
	return name.split('-')[0];
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

export const defaultResultObject: SaveImagesResult = {
	projectId: undefined,
	mainFileName: undefined,
	mainFilesSaved: 0,
	galleryFilesSaved: 0,
	mainFilesDeleted: 0,
	galleryFilesDeleted: 0,
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
		const mainValidation = mainFilesSchema.safeParse(mainFiles);
		const galleryValidation = galleryFilesSchema.safeParse(galleryFiles);

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
			mainFiles: mainValidation.data,
			galleryFiles: galleryValidation.data,
		};
	} else if (mode === 'update') {
		let validMainFiles: File[] | [] = [];
		let validatedGalleryFiles: File[] | [] = [];
		const errors: string[] = [];

		if (mainFiles.some(file => file.size > 0)) {
			const isValidMainFiles = mainFilesSchema.safeParse(mainFiles);
			if (!isValidMainFiles.success) {
				errors.push(isValidMainFiles.error.message);
			} else {
				validMainFiles = isValidMainFiles.data;
			}
		}

		if (galleryFiles.some(file => file.size > 0)) {
			const isValidGalleryFiles = galleryFilesSchema.safeParse(galleryFiles);
			if (!isValidGalleryFiles.success) {
				errors.push(isValidGalleryFiles.error.message);
			} else {
				validatedGalleryFiles = isValidGalleryFiles.data;
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
