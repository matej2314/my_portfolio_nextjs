import { homeMenuArray } from '@/lib/arrays/menuArrays';
import BaseMenu from '../BaseMenu';

export default function HomePageMenu() {
	return (
		<section
			id='home-page-menu'
			className='sticky top-0 z-30 w-full xl:top-4 xl:pt-4'
		>
			<BaseMenu array={homeMenuArray} />
		</section>
	);
}
