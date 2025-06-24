import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const csp = `
    default-src 'self';
    script-src 'self' https://apis.google.com https://api.iconify.design 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    font-src 'self';
    img-src 'self' data:;
    connect-src 'self' https://api.iconify.design;
    frame-src 'none';
  `
		.replace(/\s{2,}/g, ' ')
		.trim();

	const response = NextResponse.next();
	response.headers.set('Content-Security-Policy', csp);
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

	return response;
}

export const config = {
	matcher: ['/', '/((?!_next|api|favicon.ico).*)'],
};
