import path from 'path';
import { promises as fs } from 'fs';

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

export const deleteFilesInDir = async (dir: string, force: boolean = false): Promise<{ deletedFiles: number }> => {
	if (force) {
		await fs.rm(dir, { recursive: true, force: true });
	}

	const files = await fs.readdir(dir);

	for (const file of files) {
		await fs.unlink(path.join(dir, file));
	}

	return { deletedFiles: files.length };
};

export const defaultResultObject = {
	projectId: undefined,
	mainFileName: undefined,
	mainFilesSaved: 0,
	galleryFilesSaved: 0,
	mainFilesDeleted: 0,
	galleryFilesDeleted: 0,
};
