'use client';

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react';

import { pageview } from '@/lib/google-analytics/gtag';

export default function ClientAnalytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const url = `${pathname}?${searchParams.toString()}`;
        pageview(url);
    }, [pathname, searchParams]);

    return null;
}