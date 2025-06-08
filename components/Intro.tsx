'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import TypingLine from "./TypingLine";

import { linesDynamic, linesStatic } from "@/lib/introLinesArrays";
import { getBrowserStorage, setBrowserStorage } from "@/lib/browserStorage";

export default function Intro() {
    const [currentLine, setCurrentLine] = useState<number>(0);
    const [cleared, setCleared] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const introCompleted = getBrowserStorage('intro', 'session') === 'true';
        if (introCompleted) {
            router.replace(`/home`);
        }

        if (cleared) {
            const timeout = setTimeout(() => {
                router.replace(`/home`);
            }, 1000);
            return () => clearTimeout(timeout);
        }

    }, [router, cleared]);

    const handleComplete = () => {
        const lineJustCompleted = linesDynamic[currentLine];
        const lastString = 'Server running on port 443';

        if (lineJustCompleted?.text === lastString) {
            setTimeout(() => {
                setBrowserStorage('intro', 'true', 'session');
                setCleared(true);
            }, 500);
        } else {
            setCurrentLine((prev) => prev + 1);
        }
    };

    if (cleared) {
        return (
            <div className="h-screen flex justify-center items-center bg-black">
                <p className="w-fit h-fit flex justify-center items-center text-4xl text-green-400">
                    Welcome!
                </p>
            </div>
        );
    }

    return (
        <ul className="w-fit h-full flex flex-col gap-2 pt-20 pl-9 text-xl">
            {linesStatic.map((line, index) => (
                <li key={index} className="w-fit h-fit text-green-400 flex items-center">{line.text}</li>
            ))}
            {linesDynamic.slice(0, currentLine + 1).map((line, index) => (
                <li className="w-full" key={`${line.text}-${index}`}>
                    <TypingLine
                        text={line.text}
                        cursor={index === currentLine}
                        onComplete={handleComplete}
                    />
                </li>
            ))}
        </ul>
    );
}
