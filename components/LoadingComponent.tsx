import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";

export default function LoadingComponent() {
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