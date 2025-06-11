'use client';

import CvSelector from "./home-page-components/CvSelector";

export default function CvSelectorWrapper({ onClose }: { onClose: () => void }) {
    return (
        <div className="absolute top-full left-0 z-10">
            <CvSelector isOpen={true} onClose={onClose} />
        </div>
    )
}