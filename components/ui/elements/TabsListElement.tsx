import { TabsList, TabsTrigger } from "@radix-ui/react-tabs";

export interface Trigger {
    value: string;
    label: string;
}

export default function TabsListElement({ triggers }: { triggers: Trigger[] }) {
    return (
        <TabsList className="grid w-full grid-cols-4 gap-2 bg-transparent">
            {triggers.map((trigger) => (
                <TabsTrigger key={trigger.value} value={trigger.value} className="w-full px-5 bg-[#001a0e] text-slate-300 data-[state=active]:bg-[#1d3228] data-[state=active]:text-slate-200">
                    {trigger.label}
                </TabsTrigger>
            ))}
        </TabsList>
    )
}