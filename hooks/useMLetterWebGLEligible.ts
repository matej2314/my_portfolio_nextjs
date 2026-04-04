'use client';

import { useState, useEffect } from 'react';
import { isWebGLAvailable } from '@/lib/three/isWebGLAvailable';


const MIN_WIDTH = 360;
const MQ = `(max -width: ${MIN_WIDTH - 1}px)`;

export const useMLetterWebGLEligible = () => {
    const [eligible, setEligible] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia(MQ);

        const compute = () => {
            const narrow = mq.matches || window.innerWidth < MIN_WIDTH;
            setEligible(!narrow && isWebGLAvailable());
        };


        compute();

        mq.addEventListener('change', compute);
        window.addEventListener('resize', compute);
        return () => {
            mq.removeEventListener('change', compute);
            window.removeEventListener('resize', compute);
        };
    }, []);

    return eligible;
}