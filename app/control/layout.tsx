import { type ReactNode } from "react"

export default function ControlLayout({ children }: { children: ReactNode }) {

    return (
        <main className="h-screen bg-[#0c0c0c] pt-8 flex justify-center items-center no-scrollbar relative">
            {children}
        </main>
    )
}