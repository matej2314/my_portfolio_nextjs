import fs from 'fs';
import path from 'path';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { getCurrentDateString } from './utils/utils';

// function getCurrentDateString(): string {
// 	const now = new Date();
// 	const year = now.getFullYear();
// 	const month = String(now.getMonth() + 1).padStart(2, '0');
// 	const day = String(now.getDate()).padStart(2, '0');
// 	return `${year}-${month}-${day}`;
// }

const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const datePrefix = getCurrentDateString();

const jsonFormat = winston.format.combine(
	winston.format.timestamp(),
	winston.format.printf(({ timestamp, level, message }) => JSON.stringify({ timestamp, level, message }))
);

const infoTransport: DailyRotateFile = new DailyRotateFile({
	filename: path.join(logDir, `${datePrefix}-info.log`),
});
