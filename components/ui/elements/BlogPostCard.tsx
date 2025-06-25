import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

import { type BlogPostCardProps } from "@/types/BlogPostTypes";

export default function BlogPostCard({ title, lead, date, isoDate, imageSrc, imageAlt, buttonSlot }: BlogPostCardProps) {


    return (
        <Card className="w-[18rem] h-fit flex flex-col justify-between text-slate-200 bg-radial-green">
            <CardHeader>
                <div className="relative w-full h-[10rem] rounded-md overflow-hidden border-[3px] border-green-200/35">
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        className="object-cover"
                    />
                </div>
            </CardHeader>
            <time
                dateTime={isoDate}
                className="w-full flex justify-end text-sm italic text-slate-200 pr-2"
            >
                {date}
            </time>
            <CardTitle className="w-full flex justify-center font-semibold text-lg">{title}</CardTitle>
            <CardContent className="flex flex-col gap-2">
                <CardDescription
                    className="w-full flex justify-center text-justify text-slate-200"
                >
                    {lead}
                </CardDescription>
            </CardContent>
            <CardFooter className="w-full flex justify-end">
                {buttonSlot}
            </CardFooter>
        </Card>
    )
}