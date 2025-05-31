import { verifyCookie } from "@/lib/auth"
import { redirect } from "next/navigation";

export default async function DashboardPage() {

    const session = await verifyCookie();

    if (!session) {
        redirect('/control');
    };

    return (
        <main className="w-full h-full flex justify-center -translate-x-[5.5rem]">
            <p>dashboardPage</p>
        </main>
    )
}