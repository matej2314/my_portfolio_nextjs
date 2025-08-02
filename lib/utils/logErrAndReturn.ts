import { APP_CONFIG } from '@/config/app.config';
import logger from '@/lib/winston.config';

export const logErrAndReturn = <T>(logPrefix: string, error: unknown, returnValue: T): T => {
	const formattedError = error instanceof Error ? `${error.message}\n${error.stack}` : String(error);

	if (APP_CONFIG.nodeEnv !== 'production') {
		console.error(`${logPrefix} error: ${formattedError}`);
	} else {
		logger.error(`${logPrefix} error: ${formattedError}`);
	}
	return returnValue;
};
