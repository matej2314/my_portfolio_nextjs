'use server';

import { dbMethods } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

import { APP_CONFIG } from '@/config/app.config';

import { REDIS_KEYS } from '@/lib/redis/redisKeys';
import { setCache, getCache, deleteMultipleCache } from '@/lib/redis/redis';

import { manageProjectImages, extractProjectImages } from '@/lib/utils/manageProjectImages';
import { logErrAndReturn } from '@/lib/utils/logErrAndReturn';
import { validateData } from '@/lib/utils/utils';
import { requireActionsAuth } from '@/lib/auth';
import { projectObjectForValidation, validateProjectFiles, getProjectFiles, validateProjectData, isFilesSended } from '@/lib/utils/manageProject';
import { baseProjectSchema } from '@/lib/zod-schemas/projectSchema';
import { idSchema } from '@/lib/zod-schemas/idSchema';

import { type ImageData } from '@/types/ProjectsGalleryTypes';
import { type GetShotsResult, type GetProjectType, type GetProjectsType, type ReturnedType, type Project, type GetProjectCategoriesType, ProjectCategory } from '@/types/actionsTypes/actionsTypes';

export const getProjects = async (): Promise<GetProjectsType> => {
	const cacheKey = REDIS_KEYS.PROJECTS_ALL;

	try {
		const cachedProjects = await getCache<Project[]>(cacheKey);

		if (cachedProjects) return { projects: cachedProjects };

		const projects = await dbMethods.getAllRecords('projects');

		if (!projects) return logErrAndReturn('getProjects', 'Projects not found.', { error: 'Projects not found.' });

		await setCache<Project[]>(cacheKey, projects, APP_CONFIG.redis.defaultExpiration);

		return { projects };
	} catch (error) {
		return logErrAndReturn('getProjects', error, { error: 'Failed to fetch projects' });
	}
};

export const getProject = async (id: string): Promise<GetProjectType> => {
	try {
		const validId = validateData(id, idSchema);

		if (!validId.success) return logErrAndReturn('getProject', validId.error.flatten(), { error: 'Invalid input data' });

		const project = await dbMethods.getFirstUniqueData('projects', validId.data as string);

		if (!project) return logErrAndReturn('getProject', 'Failed to fetch project', { error: 'Failed to fetch project' });

		return { project: project };
	} catch (error) {
		return logErrAndReturn('getProject', error, { error: 'Failed to fetch project' });
	}
};

export async function getProjectShots(id: string): Promise<GetShotsResult> {
	const inputId = validateData(id, idSchema);

	if (!inputId.success) return logErrAndReturn('getProjectShots', inputId.error.flatten(), { success: false, error: 'Invalid input data.' });

	const result = await getProjectFiles(inputId.data as string, 'gallery', true);
	return result as GetShotsResult;
}

export async function getProjectCategories(): Promise<GetProjectCategoriesType> {
	const categoriesKey = REDIS_KEYS.PROJECT_CATEGORIES;

	try {
		const cachedCategories = await getCache<string[]>(categoriesKey);

		if (cachedCategories) return { categories: cachedCategories as ProjectCategory[] };

		const categoriesData = await dbMethods.selectAndDistinct('projects', 'project_category', 'project_category');

		const categories = categoriesData.map((cat: { project_category: string }) => cat.project_category);
		await setCache<string[]>(categoriesKey, categories, APP_CONFIG.redis.defaultExpiration);

		return { categories };
	} catch (error) {
		return logErrAndReturn('getProjectCategories', error, { error: 'Failed to fetch project categories.' });
	}
}

export async function saveProject(prevState: ReturnedType, formData: FormData): Promise<ReturnedType> {
	try {
		const auth = await requireActionsAuth('saveProject');

		if (!auth.success) return logErrAndReturn('saveProject', auth.error, { success: false, error: 'Authentication failed' });

		const { mainFiles, galleryFiles } = extractProjectImages(formData);
		const fileValidationResult = validateProjectFiles(mainFiles, galleryFiles, 'save');

		if (!fileValidationResult.success) return logErrAndReturn('saveProject', fileValidationResult.error, { success: false, error: 'Invalid images data' });

		const validMainFiles = fileValidationResult.mainFiles || [];
		const validGalleryFiles = fileValidationResult.galleryFiles || [];

		const projectTxtData = projectObjectForValidation(formData);
		const validProjectTxtData = baseProjectSchema.safeParse(projectTxtData);

		if (!validProjectTxtData.success) return logErrAndReturn('saveProject', validProjectTxtData.error.flatten(), { success: false, error: 'Invalid project data' });

		const id = uuidv4();
		const validatedProjectData = validProjectTxtData.data;

		const { mainFileName } = await manageProjectImages(id, validMainFiles, validGalleryFiles, { mode: 'save', clearExisting: false });
		const project_screenName = mainFileName as string;

		const newProject = {
			id,
			project_screenName,
			...validatedProjectData,
		};
		await dbMethods.insertData('projects', newProject);

		await deleteMultipleCache(REDIS_KEYS.PROJECTS_ALL, REDIS_KEYS.SITEMAP);
		return { success: true, message: 'Project added correctly.' };
	} catch (error) {
		return logErrAndReturn('saveProject', error, { success: false, error: 'Failed to add new project.' });
	}
}

export async function updateProject(prevState: ReturnedType, formData: FormData, clearExisting: boolean = false): Promise<ReturnedType> {
	try {
		const auth = await requireActionsAuth('updateProject');

		if (!auth.success) return logErrAndReturn('updateProject', auth.error, { success: false, error: 'Authentication failed' });

		const { mainFiles, galleryFiles } = extractProjectImages(formData);
		const projectTxtData = projectObjectForValidation(formData);
		const validatedProjectData = validateProjectData(projectTxtData);
		const filesSended = isFilesSended(mainFiles, galleryFiles);

		if (!validatedProjectData.success) return logErrAndReturn('updateProject', validatedProjectData.error.flatten(), { success: false, error: 'Invalid project data' });

		const projectId = validatedProjectData.data?.id as string;
		let screenName: string = validatedProjectData.data?.project_screenName || '';

		if (filesSended) {
			const fileValidationResult = validateProjectFiles(mainFiles, galleryFiles, 'update');

			if (!fileValidationResult.success) return logErrAndReturn('updateProject', fileValidationResult.error, { success: false, error: 'Invalid images data' });

			const validMainFiles = fileValidationResult.mainFiles as File[];
			const validGalleryFiles = fileValidationResult.galleryFiles as File[];
			const { mainFileName } = await manageProjectImages(projectId, validMainFiles, validGalleryFiles, { mode: 'update', clearExisting });
			screenName = mainFileName as string;
		}

		await dbMethods.updateData('projects', projectId, {
			...validatedProjectData.data,
			project_screenName: screenName,
		});

		await deleteMultipleCache(REDIS_KEYS.PROJECTS_ALL, REDIS_KEYS.PROJECT_SHOTS(projectId));

		return { success: true, message: 'Project updated correctly.' };
	} catch (error) {
		return logErrAndReturn('updateProject', error, { success: false, error: 'Failed to update project.' });
	}
}

export async function deleteProject(prevState: ReturnedType, formData: FormData): Promise<ReturnedType> {
	try {
		const auth = await requireActionsAuth('deleteProject');

		if (!auth.success) return logErrAndReturn('deleteProject', auth.error, { success: false, error: 'Authentication failed' });

		const id = formData.get('id') as string;
		const validId = validateData(id, idSchema);

		if (!validId.success) return logErrAndReturn('deleteProject', validId.error.flatten(), { success: false, error: 'Invalid input data.' });

		const projectId = validId.data as string;

		await dbMethods.deleteData('projects', projectId);

		await manageProjectImages(projectId, [], [], { mode: 'delete', clearExisting: false });

		await deleteMultipleCache(REDIS_KEYS.PROJECTS_ALL, REDIS_KEYS.PROJECT_SHOTS(projectId), REDIS_KEYS.SITEMAP);
		return { success: true, message: 'Project deleted correctly.' };
	} catch (error) {
		return logErrAndReturn('deleteProject', error, { success: false, error: 'Failed to delete project.' });
	}
}

export async function getProjectImages(projects: Project[]): Promise<ImageData[]> {
	return await Promise.all(
		projects.map(async project => {
			const result = await getProjectFiles(project.id, 'main', false);
			return {
				id: project.id,
				images: result.success && 'files' in result ? result.files : [],
			};
		})
	);
}
