import { PrismaClient } from '@prisma/client';
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

export default prisma;
