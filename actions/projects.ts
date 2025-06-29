'use server';

import prisma from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import fs from 'node:fs';
import path from 'path';
import { unstable_cache, revalidateTag } from 'next/cache';

import { type GetShotsResult, GetProjectType, GetProjectsType, ReturnedType } from '@/types/actionsTypes/actionsTypes';

import { convertFormData } from '@/lib/formDataToObjectConvert';
import { saveProjectImages } from '@/lib/saveProjectImages';

import { baseProjectSchema, updateProjectSchema } from '@/lib/zod-schemas/projectSchema';
import { idSchema } from '@/lib/zod-schemas/idSchema';
import { mainFilesSchema, galleryFilesSchema } from '@/lib/zod-schemas/fileValidationSchema';

export const getProjects = unstable_cache(async (): Promise<GetProjectsType> => {
	try {
		const projects = await prisma.projects.findMany();

		if (!projects) {
			return { error: 'Failed to fetch projects.' };
		}

		return { projects };
	} catch (error) {
		console.error(`getProjects error: ${String(error)}`);
		return { error: 'Failed to fetch projects' };
	}
}, ['projects']);

export const getProject = async (id: string): Promise<GetProjectType> => {
	try {
		const validID = idSchema.safeParse(id);

		if (!validID.success) {
			console.error('getProject validation error:', validID.error.flatten());
			return { error: 'Invalid input data' };
		}

		const project = await prisma.projects.findFirst({
			where: {
				id: validID.data,
			},
		});

		if (!project) {
			return { error: 'Failed to fetch project' };
		}

		return { project: project };
	} catch (error) {
		console.error(`getProject error: ${String(error)}`);
		return { error: 'Failed to fetch project' };
	}
};

export async function getProjectShots(id: string): Promise<GetShotsResult> {
	const inputId = idSchema.safeParse(id);

	if (!inputId.success) {
		console.error(`getProjectShots validation error:`, inputId.error.flatten());
		return { success: false, error: 'Invalid input data.' };
	}

	const dirPath = path.join(process.cwd(), 'public', 'projects-photos', `${inputId.data}`, 'gallery');

	if (!fs.existsSync(dirPath)) {
		return { success: false, error: `Directory ${dirPath} doesn't exist.` };
	}

	const files = fs.readdirSync(dirPath).map(file => `/projects-photos/${inputId.data}/gallery/${file}`);
	return { success: true, files };
}

export async function saveProject(prevState: ReturnedType, formData: FormData): Promise<ReturnedType> {
	try {
		const dataObject = convertFormData(formData);
		const result = baseProjectSchema.safeParse(dataObject);

		if (!result.success) {
			console.error('SaveProject validation error:', result.error.flatten());
			return { success: false, error: 'Invalid input data' };
		}

		const mainFiles = formData.getAll('project_main_screens') as File[];
		const galleryFiles = formData.getAll('project_gallery_screens') as File[];

		const mainFilesResult = mainFilesSchema.safeParse(mainFiles);

		if (!mainFilesResult.success) {
			return { success: false, error: 'Incorrect main files.' };
		}

		const galleryFilesResult = galleryFilesSchema.safeParse(galleryFiles);

		if (!galleryFilesResult.success) {
			return { success: false, error: 'Incorrect gallery files.' };
		}

		const id = uuidv4();
		const validatedData = result.data;

		const { mainFileName } = await saveProjectImages(id, mainFiles, galleryFiles);
		const project_screenName = mainFileName as string;

		const newProject = {
			id,
			project_screenName,
			...validatedData,
		};

		await prisma.projects.create({ data: newProject });

		revalidateTag('projects');
		return { success: true, message: 'Project added correctly.' };
	} catch (error) {
		console.error('SaveProjectError:', error);
		return { success: false, error: 'Failed to add new project.' };
	}
}

export async function updateProject(formData: FormData): Promise<ReturnedType> {
	try {
		const updatedProject = convertFormData(formData);

		const isValidUpdatedProject = updateProjectSchema.safeParse(updatedProject);

		if (!isValidUpdatedProject.success) {
			console.error(`UpdateProject validation error: ${isValidUpdatedProject.error.flatten()}`);
			return { success: false, error: 'Invalid input data.' };
		}

		const { id, ...projectData } = isValidUpdatedProject.data;

		await prisma.projects.update({
			where: { id: id },
			data: projectData,
		});

		revalidateTag('projects');
		return { success: true, message: 'Project updated correctly.' };
	} catch (error) {
		console.error('updateProject error:', error);
		return { success: false, error: 'Failed to update project.' };
	}
}

export async function deleteProject(formData: FormData): Promise<ReturnedType> {
	try {
		const id = formData.get('id') as string;
		const validId = idSchema.safeParse(id);

		if (!validId.success) {
			console.error('deleteProject error:', validId.error.flatten());
			return { success: false, error: 'Invalid input data.' };
		}

		await prisma.projects.delete({
			where: { id: validId.data },
		});

		revalidateTag('projects');
		return { success: true, message: 'Project deleted correctly.' };
	} catch (error) {
		console.error('deleteProjectError:', error);
		return { success: false, error: 'Failed to delete project.' };
	}
}
