import { type ReactNode } from "react";

import HomePageHeader from "@/components/HomePageHeader";
import DotNavigation from "@/components/DotNavigaion";

export const metadata = {
    title: 'msliwowski.net | WebDev, SEO, Security',
    description: 'Webdev, SEO, Security'
}

export default function HomePageLayout({ children }: { children: ReactNode }) {

    return (
        <main className="w-screen h-screen bg-[#0c0c0c] pt-5 flex justify-center">
            <div id="mainSection" className=" w-[90%] h-full flex flex-col justify-start gap-4">
                <div className="flex-1 overflow-y-auto px-4 flex flex-col bg-">
                    <HomePageHeader />
                    {children}
                </div>
            </div>

        </main>
    )
}