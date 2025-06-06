
import SignInForm from "@/components/control-panel-components/forms/SignInForm"


export default async function ControlPage() {


    return (
        <main className="w-screen h-screen flex flex-col justify-center items-center gap-4 rounded-md text-slate-200">
            <SignInForm />
        </main>
    )
}