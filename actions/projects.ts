'use server';

import prisma from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import fs from 'node:fs';
import path from 'path';

import { REDIS_KEYS } from '@/lib/redis/redisKeys';
import { setCache, getCache, deleteMultipleCache } from '@/lib/redis/redis';

import { manageProjectImages } from '@/lib/utils/manageProjectImages';
import { logErrAndReturn } from '@/lib/utils/logErrAndReturn';
import { validateData } from '@/lib/utils/utils';
import { projectObjectForValidation, validateProjectFiles } from '@/lib/utils/manageProject';
import { getFilesList } from '@/lib/utils/getFilesList';
import { baseProjectSchema, updateProjectSchema } from '@/lib/zod-schemas/projectSchema';
import { idSchema } from '@/lib/zod-schemas/idSchema';

import { type ImageData } from '@/types/ProjectsGalleryTypes';
import { type GetShotsResult, type GetProjectType, type GetProjectsType, type ReturnedType, type Project } from '@/types/actionsTypes/actionsTypes';

export const getProjects = async (): Promise<GetProjectsType> => {
	const cacheKey = REDIS_KEYS.PROJECTS_ALL;

	try {
		const cachedProjects = await getCache<Project[]>(cacheKey);

		if (cachedProjects) return { projects: cachedProjects };

		const projects = await prisma.projects.findMany();

		if (!projects) {
			return logErrAndReturn('getProjects', 'Projects not found.', { error: 'Projects not found.' });
		}

		await setCache<Project[]>(cacheKey, projects, 3600);

		return { projects };
	} catch (error) {
		return logErrAndReturn('getProjects', error, { error: 'Failed to fetch projects' });
	}
};

export const getProject = async (id: string): Promise<GetProjectType> => {
	try {
		const validID = validateData(id, idSchema);

		if (!validID.success) {
			return logErrAndReturn('getProject', validID.error.flatten(), { error: 'Invalid input data' });
		}

		const project = await prisma.projects.findFirst({
			where: {
				id: validID.data as string,
			},
		});

		if (!project) {
			return logErrAndReturn('getProject', 'Failed to fetch project', { error: 'Failed to fetch project' });
		}

		return { project: project };
	} catch (error) {
		return logErrAndReturn('getProject', error, { error: 'Failed to fetch project' });
	}
};

export async function getProjectShots(id: string): Promise<GetShotsResult> {
	const inputId = validateData(id, idSchema);

	if (!inputId.success) {
		return logErrAndReturn('getProjectShots', inputId.error.flatten(), { success: false, error: 'Invalid input data.' });
	}

	const shotsKey = REDIS_KEYS.PROJECT_SHOTS(inputId.data as string);
	const cachedShots = await getCache<string[]>(shotsKey);
	if (cachedShots) return { success: true, files: cachedShots };

	const dirPath = path.join(process.cwd(), 'public', 'projects-photos', `${inputId.data}`, 'gallery');

	if (!fs.existsSync(dirPath)) {
		return logErrAndReturn('getProjectShots', `Directory ${dirPath} doesn't exist.`, { success: false, error: `Directory ${dirPath} doesn't exist.` });
	}

	const files = fs.readdirSync(dirPath).map(file => `/projects-photos/${inputId.data}/gallery/${file}`);
	await setCache<string[]>(shotsKey, files, 3600);
	return { success: true, files };
}

export async function saveProject(prevState: ReturnedType, formData: FormData): Promise<ReturnedType> {
	try {
		const mainFiles = formData.getAll('project_main_screens') as File[];
		const galleryFiles = formData.getAll('project_gallery_screens') as File[];
		const fileValidationResult = validateProjectFiles(mainFiles, galleryFiles, 'save');

		if (!fileValidationResult.success) {
			return logErrAndReturn('saveProject', fileValidationResult.error, { success: false, error: 'Invalid images data' });
		}

		const validMainFiles = fileValidationResult.mainFiles || [];
		const validGalleryFiles = fileValidationResult.galleryFiles || [];

		const projectTxtData = projectObjectForValidation(formData);
		const validProjectTxtData = baseProjectSchema.safeParse(projectTxtData);

		if (!validProjectTxtData.success) {
			return logErrAndReturn('saveProject', validProjectTxtData.error.flatten(), { success: false, error: 'Invalid project data' });
		}

		const id = uuidv4();
		const validatedProjectData = validProjectTxtData.data;

		const { mainFileName } = await manageProjectImages(id, validMainFiles, validGalleryFiles, { mode: 'save', clearExisting: false });
		const project_screenName = mainFileName as string;

		const newProject = {
			id,
			project_screenName,
			...validatedProjectData,
		};
		await prisma.projects.create({ data: newProject });

		await deleteMultipleCache(REDIS_KEYS.PROJECTS_ALL, REDIS_KEYS.SITEMAP);
		return { success: true, message: 'Project added correctly.' };
	} catch (error) {
		return logErrAndReturn('saveProject', error, { success: false, error: 'Failed to add new project.' });
	}
}

export async function updateProject(prevState: ReturnedType, formData: FormData, clearExisting: boolean = false): Promise<ReturnedType> {
	try {
		const mainFiles = (formData.getAll('project_main_screens') as File[]) || [];
		const galleryFiles = (formData.getAll('project_gallery_screens') as File[]) || [];
		const projectTxtData = projectObjectForValidation(formData);
		const validatedProjectData = updateProjectSchema.safeParse(projectTxtData);
		const filesSended = mainFiles.some(file => file.size > 0) || galleryFiles.some(file => file.size > 0);

		if (!validatedProjectData.success) {
			return logErrAndReturn('updateProject', validatedProjectData.error.flatten(), { success: false, error: 'Invalid project data' });
		}

		const projectId = validatedProjectData.data?.id as string;
		let screenName: string = validatedProjectData.data?.project_screenName || '';

		if (filesSended) {
			const fileValidationResult = validateProjectFiles(mainFiles, galleryFiles, 'update');

			if (!fileValidationResult.success) {
				return logErrAndReturn('updateProject', fileValidationResult.error, { success: false, error: 'Invalid images data' });
			}

			const validMainFiles = fileValidationResult.mainFiles as File[];
			const validGalleryFiles = fileValidationResult.galleryFiles as File[];
			const { mainFileName } = await manageProjectImages(projectId, validMainFiles, validGalleryFiles, { mode: 'update', clearExisting });
			screenName = mainFileName as string;
		}

		await prisma.projects.update({
			where: { id: projectId },
			data: {
				...validatedProjectData.data,
				project_screenName: screenName,
			},
		});

		await deleteMultipleCache(REDIS_KEYS.PROJECTS_ALL, REDIS_KEYS.PROJECT_SHOTS(projectId));

		return { success: true, message: 'Project updated correctly.' };
	} catch (error) {
		return logErrAndReturn('updateProject', error, { success: false, error: 'Failed to update project.' });
	}
}

export async function deleteProject(prevState: ReturnedType, formData: FormData): Promise<ReturnedType> {
	try {
		const id = formData.get('id') as string;
		const validId = validateData(id, idSchema);

		if (!validId.success) {
			return logErrAndReturn('deleteProject', validId.error.flatten(), { success: false, error: 'Invalid input data.' });
		}

		const projectId = validId.data as string;

		await prisma.projects.delete({
			where: { id: projectId },
		});

		await manageProjectImages(projectId, [], [], { mode: 'delete', clearExisting: false });

		await deleteMultipleCache(REDIS_KEYS.PROJECTS_ALL, REDIS_KEYS.PROJECT_SHOTS(id), REDIS_KEYS.SITEMAP);
		return { success: true, message: 'Project deleted correctly.' };
	} catch (error) {
		return logErrAndReturn('deleteProject', error, { success: false, error: 'Failed to delete project.' });
	}
}

export async function getProjectImages(projects: any[]): Promise<ImageData[]> {
	return await Promise.all(
		projects.map(async project => ({
			id: project.id,
			images: await getFilesList(project.id, 'main'),
		}))
	);
}
