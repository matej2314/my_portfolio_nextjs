import path from 'path';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import { APP_CONFIG } from '@/config/app.config';

const logDir = path.join(process.cwd(), 'logs');

const jsonFormat = winston.format.combine(
	winston.format.timestamp(),
	winston.format.printf(({ timestamp, level, message }) => JSON.stringify({ timestamp, level, message }))
);

const infoTransport: DailyRotateFile = new DailyRotateFile({
	filename: path.join(logDir, `%DATE%-info.log`),
	level: APP_CONFIG.winston.infoLevel,
	datePattern: APP_CONFIG.winston.datePattern,
	zippedArchive: APP_CONFIG.winston.zippedArchive,
	maxFiles: APP_CONFIG.winston.maxFiles,
	format: jsonFormat,
	auditFile: path.join(logDir, '.audit-info.json'),
});

const errorTransport: DailyRotateFile = new DailyRotateFile({
	filename: path.join(logDir, `%DATE%-error.log`),
	level: APP_CONFIG.winston.errorLevel,
	datePattern: APP_CONFIG.winston.datePattern,
	zippedArchive: APP_CONFIG.winston.zippedArchive,
	maxFiles: APP_CONFIG.winston.maxFiles,
	format: jsonFormat,
	auditFile: path.join(logDir, '.audit-error.json'),
});

const logger = winston.createLogger({
	transports: [infoTransport, errorTransport],
});

export default logger;
