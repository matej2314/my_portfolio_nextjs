import IconButton from "../ui/elements/IconButton";


export default function AddItemBtn({ redirectPath, title, label }: { redirectPath: string, title: string, label: string }) {
    return (
        <IconButton
            iconCode="mdi:plus"
            redirectPath={redirectPath}
            title={title}
            className="w-[7rem] h-[2rem] bg-yellow-400 hover:bg-yellow-500 text-slate-800 border-[1px] border-slate-200 flex items-center"
        >
            {label}
        </IconButton>
    )
}