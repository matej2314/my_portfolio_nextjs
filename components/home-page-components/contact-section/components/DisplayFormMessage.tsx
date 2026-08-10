
interface DisplayFormMessageProps {
    type: 'error' | 'success';
    messages?: string[] | string | undefined;
}

export default function DisplayFormMessage({ type, messages }: DisplayFormMessageProps) {

    if (type === 'error') {
        return (
            <ul className="mt-1 text-sm text-state-error">
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
        <p className="text-state-success text-md mb-2">
            {typeof messages === 'string' ? messages : messages?.join(', ')}
        </p>
    )

}