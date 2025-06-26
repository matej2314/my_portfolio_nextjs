import { promises as fs } from 'fs';
import path from 'path';

type SaveImagesResult = {
	mainFileName?: string;
	mainFilesSaved: number;
	galleryFilesSaved?: number;
};

export async function saveProjectImages(projectId: string, mainFiles: File[], galleryFiles: File[]): Promise<SaveImagesResult> {
	const baseDir = path.resolve(process.cwd(), 'public', 'projects-photos', projectId);
	const mainDir = path.join(baseDir, 'main');
	const galleryDir = path.join(baseDir, 'gallery');

	await fs.mkdir(baseDir, { recursive: true });
	await fs.mkdir(mainDir, { recursive: true });
	await fs.mkdir(galleryDir, { recursive: true });

	const extractBaseName = (fileName: string): string => {
		const name = path.parse(fileName).name;
		return name.split('-')[0];
	};

	const saveFile = async (file: File, dir: string): Promise<string> => {
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		const filePath = path.join(dir, file.name);
		await fs.writeFile(filePath, buffer);
		return file.name;
	};

	const mainFilesLimited = mainFiles.slice(0, 3);
	const galleryFilesLimited = galleryFiles.slice(0, 7);

	let mainFileName: string | undefined = undefined;
	for (const [i, file] of mainFilesLimited.entries()) {
		await saveFile(file, mainDir);
		if (i === 0) {
			mainFileName = extractBaseName(file.name);
		}
	}

	for (const file of galleryFilesLimited) {
		await saveFile(file, galleryDir);
	}

	return {
		mainFileName,
		mainFilesSaved: mainFilesLimited.length,
		galleryFilesSaved: galleryFilesLimited.length,
	};
}
