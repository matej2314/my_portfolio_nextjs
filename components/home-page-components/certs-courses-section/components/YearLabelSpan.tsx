'use client';

export default function YearLabelSpan({ year }: { year?: number }) {

    return (
        <span className="w-fit h-fit flex items-center text-xl text-green-500">
            {year ? year : new Date().getFullYear()}
        </span>
    )
};