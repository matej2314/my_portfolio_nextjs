
import SignInForm from "@/components/control-panel-components/forms/SignInForm"


export default async function ControlPage() {


    return (
        <main className="w-[90%] h-[95dvh] flex flex-col justify-center items-center gap-4 rounded-md text-slate-200">
            <SignInForm />
        </main>
    )
}