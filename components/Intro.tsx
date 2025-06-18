'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import TypingLine from "./TypingLine";

import { linesDynamic, linesStatic } from "@/lib/introLinesArrays";
import { getBrowserStorage, setBrowserStorage } from "@/lib/browserStorage";

type IntroState = {
    introChecked: boolean;
    currentLine: number;
    cleared: boolean;
};

export default function Intro() {
    const [introState, setIntroState] = useState<IntroState>({
        introChecked: false,
        currentLine: 0,
        cleared: false,
    });
    const router = useRouter();

    useEffect(() => {
        const introCompleted = getBrowserStorage('intro', 'session') === 'true';
        if (introCompleted) {
            router.replace(`/home`);
        } else {
            setIntroState(prev => ({ ...prev, introChecked: true }));
        };

    }, [router]);

    useEffect(() => {
        if (introState.cleared) {
            const timeout = setTimeout(() => {
                router.replace(`/home`);
            }, 1500);
            return () => clearTimeout(timeout);
        }
    }, [introState.cleared, router]);

    const handleComplete = () => {
        const lineJustCompleted = linesDynamic[introState.currentLine];
        const delay = lineJustCompleted?.delayAfter || 500;
        const lastString = 'Server running on port 443';

        if (lineJustCompleted?.text === lastString) {
            setTimeout(() => {
                setBrowserStorage('intro', 'true', 'session');
                setIntroState(prev => ({ ...prev, cleared: true }));
            }, 2000);
        } else {
            setTimeout(() => {
                setIntroState(prev => ({
                    ...prev,
                    currentLine: prev.currentLine + 1
                }));
            }, delay);
        }
    };

    if (!introState.introChecked) return null;

    if (introState.cleared) {
        return (
            <div className="h-screen flex justify-center items-center bg-black">
                <p className="w-fit h-fit flex justify-center items-center text-4xl text-green-400">
                    Welcome!
                </p>
            </div>
        );
    }

    return (
        <ul className="w-full max-w-full md:w-fit h-full flex flex-col gap-2 pt-20 md:pl-9 text-sm xl:text-xl">
            {linesStatic.map((line, index) => (
                <li key={index} className="w-fit h-fit text-green-400 flex items-center">{line.text}</li>
            ))}
            {linesDynamic.slice(0, introState.currentLine + 1).map((line, index) => (
                <li className="w-full h-fit flex flex-wrap sm:flex-nowrap" key={`${line.text}-${index}`}>
                    <TypingLine
                        text={line.text}
                        speed={40}
                        cursor={index === introState.currentLine}
                        onComplete={handleComplete}
                    />
                </li>
            ))}
        </ul>
    );
}
