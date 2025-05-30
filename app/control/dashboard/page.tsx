import { verifyCookie } from "@/lib/auth"
import { redirect } from "next/navigation";

export default async function DashboardPage() {

    const session = await verifyCookie();

    if (!session) {
        redirect('/control');
    };

    return (
        <p>dahboard page</p>
    )
}