import DotNavigation from "@/components/home-page-components/DotNavigation";

import { type ReactNode } from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: 'msliwowski.net | WebDev, SEO, Security',
    description: 'Webdev, SEO, Security'
}

export default function HomePageLayout({ children }: { children: ReactNode }) {
    return (
        <main className="h-screen bg-[#0c0c0c] pt-8 flex justify-center items-center relative">
            <div className="fixed right-10 top-1/3 transform -translate-y-1/2 z-50">
                <DotNavigation />
            </div>
            {children}
        </main>
    )
}
