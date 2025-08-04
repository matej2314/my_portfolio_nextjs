'use server';

import { dbMethods } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

import { APP_CONFIG } from '@/config/app.config';
import { REDIS_KEYS } from '@/lib/redis/redisKeys';

import { setCache, getCache, deleteCache } from '@/lib/redis/redis';
import { convertFormData } from '@/lib/utils/formDataToObjectConvert';
import { validateData } from '@/lib/utils/utils';
import { requireActionsAuth } from '@/lib/auth';
import { logErrAndReturn } from '@/lib/utils/logErrAndReturn';

import { baseSkillSchema, updateSkillSchema } from '@/lib/zod-schemas/skillSchema';
import { idSchema } from '@/lib/zod-schemas/idSchema';

import { type ReturnedType, type GetSkillsType, type GetSkillType, type Skill } from '@/types/actionsTypes/actionsTypes';

export const getSkills = async (): Promise<GetSkillsType> => {
	const skillsKey = REDIS_KEYS.SKILLS_ALL;

	try {
		const cachedSkills = await getCache<Skill[]>(skillsKey);
		if (cachedSkills) return { skills: cachedSkills };

		const result = await dbMethods.getAllRecords('skills');

		await setCache<Skill[]>(skillsKey, result, APP_CONFIG.redis.defaultExpiration);
		return { skills: result };
	} catch (error) {
		return logErrAndReturn('getSkills', error, { error: 'Failed to fetch skills' });
	}
};

export async function getSkill(id: string): Promise<GetSkillType> {
	try {
		const skillKey = REDIS_KEYS.SKILL(id);
		const cachedSkill = await getCache<Skill>(skillKey);

		if (cachedSkill) return { skill: cachedSkill };

		const result = await dbMethods.getUniqueData('skills', id);

		await setCache<Skill>(skillKey, result as Skill, APP_CONFIG.redis.defaultExpiration);
		return { skill: result as Skill };
	} catch (error) {
		return logErrAndReturn('getSkill', error, { error: 'Failed to fetch skill' });
	}
}

export async function saveSkill(prevState: ReturnedType, formData: FormData): Promise<ReturnedType> {
	try {
		const auth = await requireActionsAuth('saveSkill');

		if (!auth.success) return logErrAndReturn('saveSkill', auth.error, { success: false, error: 'Authentication failed' });

		const id = uuidv4();
		const inputSkillObject = convertFormData(formData);
		const validSkillObject = validateData<typeof inputSkillObject>(inputSkillObject, baseSkillSchema);

		if (!validSkillObject.success) return logErrAndReturn('saveSkill', validSkillObject.error.flatten(), { success: false, error: 'Invalid input data.' });

		const skill = { id, ...(validSkillObject.data as Omit<Skill, 'id'>) };

		await dbMethods.insertData('skills', skill);

		deleteCache(REDIS_KEYS.SKILLS_ALL);
		return { success: true, message: 'Skill added correctly.' };
	} catch (error) {
		return logErrAndReturn('saveSkill', error, { success: false, error: 'Failed to add new skill' });
	}
}

export async function updateSkill(prevState: ReturnedType, formData: FormData): Promise<ReturnedType> {
	try {
		const auth = await requireActionsAuth('updateSkill');

		if (!auth.success) return logErrAndReturn('updateSkill', auth.error, { success: false, error: 'Authentication failed' });

		const newSkillObject = convertFormData(formData);
		const validNewSkillObj = validateData(newSkillObject, updateSkillSchema);

		if (!validNewSkillObj.success) return logErrAndReturn('updateSkill', validNewSkillObj.error.flatten(), { success: false, error: 'Invalid input data.' });

		const { id, ...skillData } = validNewSkillObj.data as Skill;

		await dbMethods.updateData('skills', id, skillData);

		deleteCache(REDIS_KEYS.SKILLS_ALL);
		return { success: true, message: 'Skill updated correctly.' };
	} catch (error) {
		return logErrAndReturn('updateSkill', error, { success: false, error: 'Failed to update skill.' });
	}
}

export async function getSkillsCategories(): Promise<{ categories: string[] } | { error: string }> {
	const categoriesKey = REDIS_KEYS.SKILLS_CATEGORIES;
	try {
		const cachedCategories = await getCache<string[]>(categoriesKey);
		if (cachedCategories) return { categories: cachedCategories };

		const categoriesData = await dbMethods.selectAndDistinct('skills', 'skill_cat', 'skill_cat');

		const categories = categoriesData.map((cat: { skill_cat: string }) => cat.skill_cat);
		await setCache<string[]>(categoriesKey, categories, APP_CONFIG.redis.defaultExpiration);

		return { categories };
	} catch (error) {
		return logErrAndReturn('getSkillsCategories', error, { error: 'Failed to fetch skills categories.' });
	}
}

export async function deleteSkill(prevState: ReturnedType, formData: FormData): Promise<ReturnedType> {
	try {
		const auth = await requireActionsAuth('deleteSkill');

		if (!auth.success) return logErrAndReturn('deleteSkill', auth.error, { success: false, error: 'Authentication failed' });

		const id = formData.get('id') as string;
		const validId = validateData(id, idSchema);

		if (!validId.success) return logErrAndReturn('deleteSkill', validId.error.flatten(), { success: false, error: 'Invalid input data.' });

		await dbMethods.deleteData('skills', validId.data as string);

		deleteCache(REDIS_KEYS.SKILLS_ALL);
		return { success: true, message: 'Skill deleted correctly.' };
	} catch (error) {
		return logErrAndReturn('deleteSkill', error, { success: false, error: 'Failed to delete skill.' });
	}
}
