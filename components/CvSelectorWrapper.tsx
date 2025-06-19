'use client';

import CvSelector from "./home-page-components/CvSelector";

export default function CvSelectorWrapper({ onClose }: { onClose: () => void }) {
    return (
        <div className="absolute top-full left-[35dvw] md:left-0 md:z-10">
            <CvSelector isOpen={true} onClose={onClose} />
        </div>
    )
}