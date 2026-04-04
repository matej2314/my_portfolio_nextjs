import { ReactNode } from "react";


export default function ContentContainer({ children }: { children: ReactNode }) {
    return (
        <div className="w-full max-w-[1440px] mx-auto">
            {children}
        </div>
    )
}