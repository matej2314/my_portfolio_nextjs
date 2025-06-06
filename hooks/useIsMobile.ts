'use client';

import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'unknown';

export const useIsMobile = (): DeviceType => {
	const isMobile = useMediaQuery({ minWidth: 360, maxWidth: 767 });
	const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
	const isDesktop = useMediaQuery({ minWidth: 1025 });

	const [deviceType, setDeviceType] = useState<DeviceType>('unknown');

	useEffect(() => {
		if (isMobile) setDeviceType('mobile');
		else if (isTablet) setDeviceType('tablet');
		else if (isDesktop) setDeviceType('desktop');
		else setDeviceType('unknown');
	}, [isMobile, isTablet, isDesktop]);

	return deviceType;
};
