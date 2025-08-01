export default function FormTitle({ editTitle, createTitle, mode }: { editTitle?: string, createTitle?: string, mode: 'edit' | 'create' }) {
    return (
        <h2
            className={`text-2xl font-bold text-center ${mode === 'edit' ? 'text-yellow-400' : 'text-green-400'}`}
        >
            {mode === 'edit' ? editTitle : createTitle}
        </h2>
    )
}