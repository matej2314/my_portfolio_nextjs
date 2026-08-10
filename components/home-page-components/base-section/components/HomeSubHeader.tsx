import { defaultData } from '@/lib/defaultData';
import TechList from './TechList';

export default function HomeSubHeader() {
	const contentArray = defaultData.baseSectionSubHeader.content;
	return (
		<p className='mt-1'>
			<TechList techArray={contentArray} />
		</p>
	);
}
