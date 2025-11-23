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

