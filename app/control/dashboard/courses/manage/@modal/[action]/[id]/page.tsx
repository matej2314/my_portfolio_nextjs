

export default async function ManageCourses({ params }: { params: Promise<{ action: string, id: string }> }) {

    const { id, action } = await params;

    return (
        <>
            <p>id: {id}</p>
            <p>action: {action}</p>
        </>
    )

}