import { promises as fs } from 'fs';
import { extractBaseName, saveFile, createProjectPaths, createProjectFolders, deleteFilesInDir, defaultResultObject } from './manageProjectUtils';

type SaveImagesResult = {
	projectId?: string;
	mainFileName?: string;
	mainFilesSaved?: number;
	galleryFilesSaved?: number;
	mainFilesDeleted: number;
	galleryFilesDeleted?: number;
};

// export function createResultObject(projectId: string, mainFileName?: string, mainFilesSaved?: number, galleryFilesSaved?: number, mainFilesDeleted: number = 0, galleryFilesDeleted: number = 0): SaveImagesResult {
// 	return {
// 		projectId,
// 		mainFileName,
// 		mainFilesSaved,
// 		galleryFilesSaved,
// 		mainFilesDeleted,
// 		galleryFilesDeleted,
// 	};
// }

export async function manageProjectImages(
	projectId: string,
	mainFiles?: File[],
	galleryFiles?: File[],
	options?: {
		mode: 'save' | 'update' | 'delete';
		clearExisting: boolean;
	}
): Promise<SaveImagesResult> {
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

			return {
				projectId,
				mainFileName,
				mainFilesDeleted: 0,
				galleryFilesDeleted: 0,
				mainFilesSaved: mainFilesLimited?.length || 0,
				galleryFilesSaved: galleryFilesLimited?.length || 0,
			};
		case 'update':
			if (clearExisting) {
				await deleteFilesInDir(baseDir, true);
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

			return {
				projectId,
				mainFilesDeleted: 0,
				galleryFilesDeleted: 0,
				mainFileName,
				mainFilesSaved: mainFilesLimited?.length || 0,
				galleryFilesSaved: galleryFilesLimited?.length || 0,
			};
		case 'delete':
			let mainFilesDeleted = 0;
			let galleryFilesDeleted = 0;

			try {
				const mainDirExists = await fs.access(mainDir).then(() => true);
				const galleryDirExists = await fs.access(galleryDir).then(() => true);

				if (mainDirExists) {
					const { deletedFiles } = await deleteFilesInDir(mainDir, false);

					mainFilesDeleted = deletedFiles;
				}

				if (galleryDirExists) {
					const { deletedFiles } = await deleteFilesInDir(galleryDir, false);

					galleryFilesDeleted = deletedFiles;
				}

				await fs.rm(baseDir, { recursive: true });

				return {
					projectId,
					mainFileName: undefined,
					mainFilesDeleted,
					galleryFilesDeleted,
				};
			} catch (error) {
				console.error('Error deleting project images', error);
				return defaultResultObject;
			}
		default:
			return defaultResultObject;
	}
}
