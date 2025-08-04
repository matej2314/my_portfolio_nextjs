/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient, about_me, posts, courses, projects, skills, users } from '@prisma/client';
import './redis/redis';
import { APP_CONFIG } from '@/config/app.config';

declare global {
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (APP_CONFIG.nodeEnv !== 'production') {
	global.prisma = prisma;
}

type ModelMap = {
	about_me: about_me;
	posts: posts;
	courses: courses;
	projects: projects;
	skills: skills;
	users: users;
};

export const dbMethods = {
	getAllRecords: async <T extends keyof ModelMap>(model: T): Promise<ModelMap[T][]> => {
		return await (prisma[model] as any).findMany();
	},
	selectAndDistinct: async <T extends keyof ModelMap>(model: T, selectedColumn: string, distinctColumn: string) => {
		return await (prisma[model] as any).findMany({
			select: {
				[selectedColumn]: true,
			},
			distinct: [distinctColumn],
		});
	},
	insertData: async <T extends keyof ModelMap>(model: T, data: ModelMap[T]) => {
		return await (prisma[model] as any).create({ data });
	},
	deleteData: async <T extends keyof ModelMap>(model: T, id: string) => {
		return await (prisma[model] as any).delete({ where: { id } });
	},
	getUniqueData: async <T extends keyof ModelMap>(model: T, id: string) => {
		return await (prisma[model] as any).findUnique({ where: { id } });
	},
	countRecords: async <T extends keyof ModelMap>(model: T) => {
		return await (prisma[model] as any).count();
	},
	updateData: async <T extends keyof ModelMap>(model: T, id: string, data: Omit<ModelMap[T], 'id'>) => {
		return await (prisma[model] as any).update({ where: { id }, data });
	},
	deleteAllRecords: async <T extends keyof ModelMap>(model: T) => {
		return await (prisma[model] as any).deleteMany({});
	},
	getFirstUniqueData: async <T extends keyof ModelMap>(model: T, id: string) => {
		return await (prisma[model] as any).findFirst({ where: { id } });
	},
};

export default prisma;
