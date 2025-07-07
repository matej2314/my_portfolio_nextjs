




export default async function ManageAbout({ params }: { params: { action: string, id: string } }) {

    const { id, action } = params;

    return (
        <>
            <p>id: {id}</p>
            <p>action: {action}</p>
        </>
    )
}