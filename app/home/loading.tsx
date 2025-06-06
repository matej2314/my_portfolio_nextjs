'use client';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

export default function Loading() {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShow(false);
        }, 20000);

        return () => clearTimeout(timeout);
    }, []);

    if (!show) return null;

    return <LoadingScreen />;
}
