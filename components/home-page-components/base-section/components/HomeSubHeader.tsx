'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

import { defaultData } from '@/lib/defaultData';

import { type HomesubHeaderType } from '@/types/homeSubHeaderTypes';

export default function HomeSubHeader({
    texts,
    typingSpeed = defaultData.homeSubHeaderValues.typingSpeed,
    deletingSpeed = defaultData.homeSubHeaderValues.deletingSpeed,
    pauseTime = defaultData.homeSubHeaderValues.pauseTime
}: HomesubHeaderType) {

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentText, setCurrentText] = useState<string | null>('');
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    useEffect(() => {
        const fullText = texts[currentIndex];
        const speed = isDeleting ? deletingSpeed : typingSpeed;

        let updatedText = '';

        if (isDeleting) {
            updatedText = fullText.substring(0, (currentText as string).length - 1);
        } else {
            updatedText = fullText.substring(0, (currentText as string).length + 1);
        }

        const timeout = setTimeout(() => {
            setCurrentText(updatedText);

            if (!isDeleting && updatedText === fullText) {
                setTimeout(() => setIsDeleting(true), pauseTime);
            }

            if (isDeleting && updatedText === '') {
                setIsDeleting(false);
                setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentIndex, texts, typingSpeed, deletingSpeed, pauseTime]);


    return (
        <motion.p
            className="h-[2.25rem] mb-1 text-2xl xl:text-4xl text-green-600 font-kanit mt-1"
        >
            {currentText}
        </motion.p>
    )
}