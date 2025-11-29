import { dbMethods } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

import { APP_CONFIG } from '@/config/app.config';
import { REDIS_KEYS } from '@/lib/redis/redisKeys';

import { getCache, setCache } from '@/lib/redis/redis';
import { experienceSchema, updateExperienceSchema } from '@/lib/zod-schemas/experienceSchema';
import { convertFormData } from '@/lib/utils/formDataToObjectConvert';
import { requireActionsAuth } from '@/lib/auth';
import { validateData } from '@/lib/utils/utils';
import { logErrAndReturn } from '@/lib/utils/logErrAndReturn';
import { type GetExperiencesType, type ReturnedType, type Experience } from '@/types/actionsTypes/actionsTypes';

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

// export const saveExperience = async (prevState: ReturnedType, formData: FormData): Promise<ReturnedType> => { 
// try {
//     const auth = await requireActionsAuth('saveExperience');
// }
// }

// export const updateExperience = async (prevState: ReturnedType, formData: FormData): Promise<ReturnedType> => { }