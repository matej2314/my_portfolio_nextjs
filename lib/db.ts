import { PrismaClient } from '@prisma/client';
import './redis/redis';

declare global {
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
	global.prisma = prisma;
}

export default prisma;
