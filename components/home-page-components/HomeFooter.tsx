import Link from 'next/link';
import { getCvHref } from '@/lib/utils/getCvHref';
import { getLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

export default async function HomeFooter() {
	const locale = await getLocale();
	const { cvHref, cvFileName } = getCvHref(locale);
	const date = new Date().getFullYear();
	const t = await getTranslations('homePage');

	return (
		<footer className='flex w-full max-h-[50px] h-fit mt-[3rem] items-center justify-start max-xl:px-4 max-xl:py-3 xl:px-6 xl:py-4'>
			<div className='grid h-fit w-full grid-rows-2 items-center text-slate-400 max-xl:gap-2 xl:flex xl:justify-between'>
				<p>{`© ${date} ${t('homeFooter.copyright')}`}</p>
				<div className='flex gap-4'>
					<Link className='text-yellow-300 hover:text-yellow-400 focus:text-yellow-400 focus:outline-none' href={cvHref} download={cvFileName}>
						{t('aboutSection.downloadCv')}
					</Link>
					<Link className='text-yellow-300 hover:text-yellow-400 focus:text-yellow-400 focus:outline-none' href='https://www.linkedin.com/in/mateusz-mateo2314-sliwowski/'>
						LinkedIn
					</Link>
					<Link className='text-yellow-300 hover:text-yellow-400 focus:text-yellow-400 focus:outline-none' href='https://github.com/matej2314'>
						GitHub
					</Link>
				</div>
			</div>
		</footer>
	);
}
