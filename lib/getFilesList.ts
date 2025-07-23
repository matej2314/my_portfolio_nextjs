import fs from 'fs/promises';
import path from 'path';

import { isDirectoryExists } from './manageProjectUtils';

export async function getFilesList(projectId: string, photosPath: string): Promise<string[]> {
	if (!projectId || !photosPath) {
		console.error('getFilesList: projectId and photosPath are required');
		return [];
	}

	const dirExists = await isDirectoryExists(path.join('public', 'projects-photos', projectId, photosPath));

	if (!dirExists) {
		console.error(`Directory ${photosPath} does not exist`);
		return [];
	}

	try {
		const dirPath = path.join('public', 'projects-photos', projectId, photosPath);
		const files = await fs.readdir(dirPath);

		return files.map(file => `/projects-photos/${projectId}/${photosPath}/${file}`);
	} catch (error) {
		console.error(`Failed to read files for project ${projectId}: ${error}`);
		return [];
	}
}
