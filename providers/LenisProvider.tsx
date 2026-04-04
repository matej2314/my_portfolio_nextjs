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
				duration: 1.5,
				wheelMultiplier: 1.9,
				easing: t => Math.min(1, 1.001 - Math.pow(2, -5 * t)),
				...options,
			}}
			{...rest}
		>
			{children}
		</ReactLenis>
	);
};
