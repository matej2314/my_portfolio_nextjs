'use client';

import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import { type DeviceType } from '@/types/deviceTypes';

/** Desktop = wide enough for horizontal nav; matches Tailwind xl (1280px) minus 1px for boundary stability. */
export const useDeviceType = (): DeviceType => {
	const isMobile = useMediaQuery({ maxWidth: 767 });
	const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });
	const isDesktop = useMediaQuery({ minWidth: 1280 });

	const [deviceType, setDeviceType] = useState<DeviceType>('unknown');

	useEffect(() => {
		if (isMobile) setDeviceType('mobile');
		else if (isTablet) setDeviceType('tablet');
		else if (isDesktop) setDeviceType('desktop');
		else setDeviceType('unknown');
	}, [isMobile, isTablet, isDesktop]);

	return deviceType;
};
