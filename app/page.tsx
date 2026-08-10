import Intro from '@/components/Intro';
import { generatePageMetadata } from '@/lib/generatePageMetadata';

export async function generateMetadata() {
	return generatePageMetadata('page');
}

export default function IntroPage() {
	return (
		<main className='flex h-screen max-w-screen flex-col justify-center gap-2 bg-black'>
			<Intro />
		</main>
	);
}
