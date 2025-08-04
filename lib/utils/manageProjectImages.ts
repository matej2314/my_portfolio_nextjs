import { promises as fs } from 'fs';
import { extractBaseName, saveFile, createProjectPaths, createProjectFolders, deleteFilesInDir, isDirectoryExists, createResultObject } from './manageProject';
import { logErrAndReturn } from './logErrAndReturn';
import { defaultData } from '@/lib/defaultData';

import { type SaveImagesResult, type OptionsObject } from '@/types/manageImages';

export const extractProjectImages = (formData: FormData) => {
	const mainFiles = (formData.getAll('project_main_screens') as File[]) || [];
	const galleryFiles = (formData.getAll('project_gallery_screens') as File[]) || [];

	return { mainFiles, galleryFiles };
};

export async function manageProjectImages(projectId: string, mainFiles?: File[] | [], galleryFiles?: File[] | [], options?: OptionsObject): Promise<SaveImagesResult> {
	const { mode, clearExisting = false } = options || { mode: 'save', clearExisting: false };

	const { baseDir, mainDir, galleryDir } = await createProjectPaths(projectId);

	const mainFilesLimited = mainFiles?.slice(0, 3);
	const galleryFilesLimited = galleryFiles?.slice(0, 7);

	let mainFileName: string | undefined = undefined;

	switch (mode) {
		case 'save':
			await createProjectFolders(baseDir, mainDir, galleryDir);

			for (const [i, file] of mainFilesLimited?.entries() || []) {
				await saveFile(file, mainDir);

				if (i === 0) {
					mainFileName = extractBaseName(file.name);
				}
			}

			for (const file of galleryFilesLimited || []) {
				await saveFile(file, galleryDir);
			}

			return createResultObject(projectId, mainFileName, mainFilesLimited?.length || 0, galleryFilesLimited?.length || 0);
		case 'update':
			if (clearExisting) {
				if (mainFilesLimited && mainFilesLimited.some(file => file.size > 0)) {
					await deleteFilesInDir(mainDir);
				}

				if (galleryFilesLimited && galleryFilesLimited.some(file => file.size > 0)) {
					await deleteFilesInDir(galleryDir);
				}
			}

			for (const [i, file] of mainFilesLimited?.entries() || []) {
				await saveFile(file, mainDir);
				if (i === 0) {
					mainFileName = extractBaseName(file.name);
				}
			}

			for (const file of galleryFilesLimited || []) {
				await saveFile(file, galleryDir);
			}

			return createResultObject(projectId, mainFileName, mainFilesLimited?.length || 0, galleryFilesLimited?.length || 0);
		case 'delete':
			let mainFilesDeleted: number | undefined = undefined;
			let galleryFilesDeleted: number | undefined = undefined;

			try {
				const mainDirExists = await isDirectoryExists(mainDir);

				const galleryDirExists = await isDirectoryExists(galleryDir);

				if (mainDirExists) {
					const { deletedFiles } = await deleteFilesInDir(mainDir);
					mainFilesDeleted = deletedFiles;
				}

				if (galleryDirExists) {
					const { deletedFiles } = await deleteFilesInDir(galleryDir);
					galleryFilesDeleted = deletedFiles;
				}

				const baseDirExists = await isDirectoryExists(baseDir);

				if (baseDirExists) {
					await fs.rm(baseDir, { recursive: true, force: true });
				}

				return createResultObject(projectId, undefined, 0, 0, mainFilesDeleted || 0, galleryFilesDeleted || 0);
			} catch (error) {
				logErrAndReturn('Error deleting project images', error, defaultData.manageImagesDefaultResult);

				try {
					const baseDirExists = await isDirectoryExists(baseDir);

					if (baseDirExists) {
						await fs.rm(baseDir, { recursive: true, force: true });
					}
				} catch (rmError) {
					logErrAndReturn('Error removing base directory', rmError, defaultData.manageImagesDefaultResult);
				}
				return defaultData.manageImagesDefaultResult;
			}
		default:
			return defaultData.manageImagesDefaultResult;
	}
}
