'use client';

import CvSelector from "./home-page-components/CvSelector";


export default function CvSelectorWrapper() {
    return (
        <div className="absolute left-1/2 top-full z-50 mt-1 -translate-x-1/2">
            <CvSelector isOpen={true} />
        </div>
    );
}