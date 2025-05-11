'use client';

import TypingLine from "./TypingLine";
import { useState } from "react";
import { type Line } from "@/types/IntroTypes";

const linesDynamic: Line[] = [
    { type: 'typing', text: 'npm start' },
    { type: 'typing', text: 'Starting server...' },
    { type: 'typing', text: 'Server running on port 443' },
];

const linesStatic: Line[] = [
    { type: 'static', text: '(kali@kali)-[~]: $ cd my_portfolio' },
    { type: 'static', text: '(kali@kali)-[~/my_portfolio]: $ ls' },
    {
        type: 'static',
        text: '(kali@kali)-[~/my_portfolio]: $ package-lock.json package.json index.html index.css index.js public/ tsconfig.json next.config.ts'
    },
];

export default function Intro() {
    const [currentLine, setCurrentLine] = useState<number>(0);
    const [cleared, setCleared] = useState<boolean>(false);

    const handleComplete = () => {
        const lineJustCompleted = linesDynamic[currentLine];
        const lastString = 'Server running on port 443';

        if (lineJustCompleted?.text === lastString) {
            setTimeout(() => {
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
