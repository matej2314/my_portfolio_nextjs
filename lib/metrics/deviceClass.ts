import type { DeviceClass } from './productMetrics';

const MOBILE_UA_PATTERN = /Mobile|Android|iPhone|iPad|iPod|webOS|BlackBerry|Opera Mini|IEMobile/i;

export function deviceClassFromUserAgent(userAgent: string | null | undefined): DeviceClass {
	if (!userAgent) return 'unknown';
	return MOBILE_UA_PATTERN.test(userAgent) ? 'mobile' : 'desktop';
}
