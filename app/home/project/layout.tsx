import { type ReactNode } from 'react';
import { type Metadata } from 'next';

import FloatingContactBox from '@/components/floating-contact-box/FloatingContactBox';

export const metadata: Metadata = {
    title: 'msliwowski.net | WebDev, SEO, Security',
    description: 'Webdev, SEO, Security',
};

export default function DetailsPageLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative flex min-h-screen w-full min-w-0 flex-col bg-[#000805] pb-8 pt-4 no-scrollbar sm:pt-6">
            <div className="mx-auto flex w-full min-w-0 max-w-[1200px] flex-1 flex-col px-3 sm:px-6">{children}</div>
            <FloatingContactBox />
        </div>
    );
}
