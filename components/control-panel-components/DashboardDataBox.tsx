
type DashboardBoxProps = {
    header: string;
    data: string | number;
    dataColor?: string;
}

export default function DashboardDataBox({ header, data, dataColor = 'text-slate-200' }: DashboardBoxProps) {

    return (
        <section className="dashboard-data-box">
            <div className="w-full h-full flex flex-col justify-start items-center gap-[0.5rem]">
                <h2
                    className="text-xl font-semibold flex gap-1"
                >
                    {header}
                    <span>:</span>
                </h2>
                <p
                    className={`text-lg font-semibold ${dataColor}`}
                >
                    {data}
                </p>
            </div>
        </section>
    )
}