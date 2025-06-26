
interface DisplayFormMessageProps {
    type: 'error' | 'success';
    messages?: string[] | string | undefined;
}

export default function DisplayFormMessage({ type, messages }: DisplayFormMessageProps) {

    if (type === 'error') {
        return (
            <ul className="text-red-400 text-sm mt-1">
                {Array.isArray(messages) ? (
                    messages.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))
                ) : (
                    <li>{messages}</li>
                )}
            </ul>
        )
    }

    return (
        <p className="text-green-400 text-md mb-2">
            {typeof messages === 'string' ? messages : messages?.join(', ')}
        </p>
    )

}