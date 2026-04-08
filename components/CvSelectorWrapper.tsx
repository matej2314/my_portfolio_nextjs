'use client';

import CvSelector from './home-page-components/CvSelector';

type CvSelectorWrapperProps = {
	/** Gdy true, linki CV mają role="menuitem" (np. w mobilnym menu z role="menu"). */
	cvLinksAsMenuItems?: boolean;
};

export default function CvSelectorWrapper({ cvLinksAsMenuItems }: CvSelectorWrapperProps) {
	return (
		<div className="absolute left-1/2 top-full z-50 mt-1 -translate-x-1/2">
			<CvSelector isOpen={true} cvLinksAsMenuItems={cvLinksAsMenuItems} />
		</div>
	);
}