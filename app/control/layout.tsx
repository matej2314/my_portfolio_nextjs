import { type ReactNode } from "react"

export default async function ControlLayout({ children }: { children: ReactNode }) {

    return (
        <main className="w-full h-full bg-[#0c0c0c] no-scrollbar relative">
            <section className="w-full h-full flex">
                {children}
            </section>

        </main>
    )
}