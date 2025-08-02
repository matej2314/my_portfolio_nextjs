type CustomTabsContentProps = {
    value: string
    selectedValue: string
    children: React.ReactNode
    className?: string
}

export default function CustomTabsContent({ value, selectedValue, children, className }: CustomTabsContentProps) {
    const isActive = value === selectedValue

    return (
        <div
            style={{
                position: isActive ? "static" : "absolute",
                visibility: isActive ? "visible" : "hidden",
                height: isActive ? "auto" : 0,
                overflow: "hidden",
                pointerEvents: isActive ? "auto" : "none",
                width: "100%",
                ...(className && { className })
            }}
            aria-hidden={!isActive}
        >
            {children}
        </div>
    )
}
