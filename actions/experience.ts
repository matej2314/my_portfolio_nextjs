'use server';
import { dbMethods } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

import { APP_CONFIG } from '@/config/app.config';
import { REDIS_KEYS } from '@/lib/redis/redisKeys';

import { deleteCache, getCache, setCache } from '@/lib/redis/redis';
import { experienceSchema, updateExperienceSchema } from '@/lib/zod-schemas/experienceSchema';
import { convertFormData } from '@/lib/utils/formDataToObjectConvert';
import { requireActionsAuth } from '@/lib/auth';
import { validateData } from '@/lib/utils/utils';
import { logErrAndReturn } from '@/lib/utils/logErrAndReturn';
import { type GetExperiencesType, type ReturnedType, type Experience, type GetSingleExperienceType } from '@/types/actionsTypes/actionsTypes';
import { idSchema } from '@/lib/zod-schemas/idSchema';


export const getSingleExperience = async(id: string): Promise<GetSingleExperienceType> => {
    try {
        const validId = validateData(id, idSchema);
        if (!validId.success) return logErrAndReturn('getSingleExperience', validId.error.flatten(), { error: 'Invalid input data' });
        const cachedExperience = await getCache<Experience>(REDIS_KEYS.EXPERIENCE(validId.data as string));
        if (cachedExperience) return { experience: cachedExperience };
    const experience = await dbMethods.getUniqueData('experience', validId.data as string);
    if (!experience) return logErrAndReturn('getSingleExperience', 'Experience not found.', { error: 'Experience not found.' });
    return { experience };
} catch (error) {
    return logErrAndReturn('getSingleExperience', error, { error: 'Failed to fetch experience' });
}
}

export const getExperience = async (): Promise<GetExperiencesType> => {
    const experienceKey = REDIS_KEYS.EXPERIENCES_ALL;
    try {
        const cachedExperience = await getCache<Experience[]>(experienceKey);
        if (cachedExperience) return { experiences: cachedExperience };

        const experiences = await dbMethods.getAllRecords('experience');
        if (!experiences) return logErrAndReturn('getExperience', 'Experiences not found.', { error: 'Experiences not found.' });

        await setCache<Experience[]>(experienceKey, experiences, APP_CONFIG.redis.defaultExpiration);
        return { experiences };
    } catch (error) {
        return logErrAndReturn('getExperience', error, { error: 'Failed to fetch experiences' });
    }
}

export const saveExperience = async (prevState: ReturnedType, formData: FormData): Promise<ReturnedType> => { 
try {
    const auth = await requireActionsAuth('saveExperience');

    if (!auth.success) return logErrAndReturn('saveExperience', auth.error, { success: false, error: 'Authentication failed' });

    const inputExperienceData = convertFormData(formData);
    const validExperience = validateData(inputExperienceData, experienceSchema);

    if (!validExperience.success) return logErrAndReturn('saveExperience', validExperience.error.flatten(), { success: false, error: 'Invalid input data' });

    const experienceId = uuidv4();
 

    const experience = { id: experienceId, ...(validExperience.data as Omit<Experience, 'id'>) };

    await dbMethods.insertData('experience', experience);

   await setCache<Experience[]>(REDIS_KEYS.EXPERIENCES_ALL, [experience], APP_CONFIG.redis.defaultExpiration);
    return { success: true, message: 'New experience added correctly' };
} catch (error) {
    return logErrAndReturn('saveExperience', error, { success: false, error: 'Failed to add new experience' });
}
}

export const updateExperience = async (prevState: ReturnedType, formData: FormData): Promise<ReturnedType> => { 
try {
    const auth = await requireActionsAuth('updateExperience');
    if (!auth.success) return logErrAndReturn('updateExperience', auth.error, { success: false, error: 'Authentication failed' });


    const inputExperienceData = convertFormData(formData);
    const validExperience = validateData(inputExperienceData, updateExperienceSchema);
    if (!validExperience.success) return logErrAndReturn('updateExperience', validExperience.error.flatten(), { success: false, error: 'Invalid input data' });
    const experienceId = (validExperience.data as unknown as { id: string }).id as string;
    const experience = { id: experienceId, ...(validExperience.data as unknown as Omit<Experience, 'id'>) };
    await dbMethods.updateData('experience', experienceId, experience);
    await setCache<Experience[]>(REDIS_KEYS.EXPERIENCES_ALL, [experience], APP_CONFIG.redis.defaultExpiration);
    return { success: true, message: 'Experience updated correctly' };
} catch (error) {
    return logErrAndReturn('updateExperience', error, { success: false, error: 'Failed to update experience' });
}
}


export const deleteExperience = async (prevState: ReturnedType, formData: FormData):
Promise<ReturnedType> => {
    try {
        const auth = await requireActionsAuth('deleteExperience');
        if (!auth.success) return logErrAndReturn('deleteExperience', auth.error, { success: false, error: 'Authentication failed' });

        const id = formData.get('id') as string;
        const validId = validateData(id, idSchema);

        if (!validId.success) return logErrAndReturn('deleteExperience', validId.error.flatten(), { success: false, error: 'Invalid input data' });

        await dbMethods.deleteData('experience', validId.data as string);
        await deleteCache(REDIS_KEYS.EXPERIENCES_ALL);
        return { success: true, message: 'Experience deleted correctly' };
    } catch (error) {
        return logErrAndReturn('deleteExperience', error, { success: false, error: 'Failed to delete experience' });
    }
}
