import { promises as fs } from 'node:fs';
import path from 'path';
import { logErrAndReturn } from './logErrAndReturn';

import { isDirectoryExists } from './manageProject';

export async function getFilesList(projectId: string, photosPath: string): Promise<string[]> {
	if (!projectId || !photosPath) {
		return logErrAndReturn('getFilesList: projectId and photosPath are required', new Error('projectId and photosPath are required'), []);
	}

	const dirExists = await isDirectoryExists(path.join('public', 'projects-photos', projectId, photosPath));

	if (!dirExists) {
		return logErrAndReturn(`Directory ${photosPath} does not exist`, new Error(`Directory ${photosPath} does not exist`), []);
	}

	try {
		const dirPath = path.join('public', 'projects-photos', projectId, photosPath);
		const files = await fs.readdir(dirPath);

		return files.map(file => `/projects-photos/${projectId}/${photosPath}/${file}`);
	} catch (error) {
		return logErrAndReturn(`Failed to read files for project ${projectId}: ${error}`, error, []);
	}
}
