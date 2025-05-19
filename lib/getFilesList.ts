import fs from 'fs/promises';
import path from 'path';

export async function getFilesList(projectId: string, photosPath: string): Promise<string[]> {

    let picsPath: string = '';

    if (photosPath === 'main') {
        picsPath = 'main';
    } else if (photosPath === 'gallery') {
        picsPath = 'gallery';
    };


    try {
        const dirPath = path.join('public', 'projects-photos', projectId, picsPath);
        const files = await fs.readdir(dirPath);

        return files.map((file) => `/projects-photos/${projectId}/${picsPath}/${file}`)
    } catch (error) {
        console.error(`Failed to read files for project ${projectId}: ${error}`);
        return [];
    }
}