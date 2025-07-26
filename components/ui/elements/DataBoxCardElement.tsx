'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type DataBoxCardProps = {
    header: string;
    value: string | number;
    valueColor?: string;
    suffix?: string;
};


export default function DataBoxCardElement({ header, value, valueColor = 'text-slate-300', suffix = '' }: DataBoxCardProps) {
    return (
        <Card className="w-full select-none bg-radial-green text-slate-300 border-2 border-green-500/15 flex gap-y-2">
            <CardHeader>
                <CardTitle className="w-full flex justify-center text-xl font-semibold">
                    {header}
                    <span>{suffix}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className={`w-full flex justify-center text-xl font-semibold ${valueColor}`}>
                    {value}
                </p>
            </CardContent>
        </Card>
    );
}