'use client';

import { type ReactNode, useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";

export default function HomeContent({ children }: { children: ReactNode }) {
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (showLoading) return <LoadingScreen />;

    return <>{children}</>
}