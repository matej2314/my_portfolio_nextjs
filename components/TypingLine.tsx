'use client';

import { useEffect, useState } from 'react';

import PulsingCursor from './ui/elements/PulsingCursor';

import { type TypingLineType } from '@/types/TypingLineType';

const TypingLine = ({ text, speed = 40, onComplete, cursor }: TypingLineType) => {
    const [displayed, setDisplayed] = useState<string>('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayed((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            }, speed);
            return () => clearTimeout(timeout);
        } else {
            if (onComplete) {
                const timeout = setTimeout(onComplete, 200);
                return () => clearTimeout(timeout);
            }
        }
    }, [index, text, onComplete, speed]);

    return (
        <span className='whitespace-pre font-mono text-green-400'>
            (kali@kali)-[~]: <span>{displayed}</span>
            {cursor && <PulsingCursor />}
        </span>
    );
};

export default TypingLine;
