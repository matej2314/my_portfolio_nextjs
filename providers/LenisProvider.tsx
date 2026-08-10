'use client';

import { ReactLenis } from 'lenis/react';
import { type ComponentProps } from 'react';

import 'lenis/dist/lenis.css';

export const LenisProvider = ({ children, className, id, options, ...rest }: Omit<ComponentProps<typeof ReactLenis>, 'root'>) => {
	return (
		<ReactLenis
			className={className}
			id={id}
			options={{
				autoRaf: true,
				lerp: 0.085,
				wheelMultiplier: 0.9,
				syncTouch: false,
				...options,
			}}
			{...rest}
		>
			{children}
		</ReactLenis>
	);
};
