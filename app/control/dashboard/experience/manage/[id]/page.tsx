

export default async function ExperienceAction({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    return (
        <main className="w-full h-full flex flex-col justify-center items-center text-slate-200">
            <p>Experience Action</p>
        </main>
    )
}