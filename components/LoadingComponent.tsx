'use client';

import LoadingScreen from './LoadingScreen';

/** Route-level suspense fallback — short brand overlay without the home gate. */
export default function LoadingComponent() {
	return <LoadingScreen phase='draw' />;
}
