import { ReactNode } from "react";
import HomePageHeader from "@/components/HomePageHeader";
import DotNavigation from "@/components/DotNavigaion";

export default function HomePageLayout({ children }: { children: ReactNode }) {

    return (
        <main className="w-screen h-screen bg-black pt-5 flex justify-center">
            <div id="mainSection" className="bg-slate-900 w-11/12 h-full flex flex-col justify-start gap-10">
                <HomePageHeader />
                <div className="flex-1 overflow-y-auto px-4">
                    {children}
                </div>
            </div>

        </main>
    )
}