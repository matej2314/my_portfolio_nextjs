import { type ReactNode } from "react";

import HomePageHeader from "@/components/HomePageHeader";
import DotNavigation from "@/components/DotNavigation";

export const metadata = {
    title: 'msliwowski.net | WebDev, SEO, Security',
    description: 'Webdev, SEO, Security'
}

export default function HomePageLayout({ children }: { children: ReactNode }) {
    return (
        <main className="h-screen bg-[#0c0c0c] pt-8 flex justify-center items-center no-scrollbar relative">
            <div className="fixed right-10 top-1/3 transform -translate-y-1/2 z-50">
                <DotNavigation />
            </div>
            <div id="mainSection" className="w-[90%] h-full flex flex-col justify-start gap-4">
                <div className="flex-1 flex flex-col">
                    <HomePageHeader />
                    <div className="overflow-y-auto w-full h-full flex flex-col no-scrollbar scroll-smooth">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}
