import { type ReactNode } from "react";

import HomePageHeader from "@/components/HomePageHeader";
import DotNavigation from "@/components/DotNavigation";

export const metadata = {
    title: 'msliwowski.net | WebDev, SEO, Security',
    description: 'Webdev, SEO, Security'
}

export default function HomePageLayout({ children }: { children: ReactNode }) {

    return (
        <main className="w-screen h-screen bg-[#0c0c0c] pt-8 flex justify-center items-center">
            <div id="mainSection" className=" w-[90%] h-full flex flex-col justify-start gap-4">
                <div className="flex-1 flex flex-col">
                    <HomePageHeader />
                    <div className="overflow-y-auto w-full h-full flex justify-between">
                        {children}
                        <DotNavigation />
                    </div>
                </div>
            </div>

        </main>
    )
}