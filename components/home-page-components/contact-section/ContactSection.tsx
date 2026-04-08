import { getTranslations } from 'next-intl/server';

import ContactItems from './components/ContactItems';
import ContactForm from './components/ContactForm';

export default async function ContactSection() {
	const t = await getTranslations('homePage');

	return (
		<section id='contactSection' tabIndex={-1} className='w-full bg-[#000805] max-xl:px-4 max-xl:py-8 xl:px-12 xl:py-20'>
			<header className='flex flex-col gap-2 max-xl:gap-1.5 xl:gap-2'>
				<p className='font-semibold tracking-wide text-slate-500 max-xl:text-xs xl:text-[13px]'>{t('contactSection.sectionIndex')}</p>
				<h2 className='font-light leading-tight text-slate-50 max-xl:text-[1.625rem] max-xl:leading-snug xl:text-[2.375rem]'>{t('contactSection.title')}</h2>
				<div className='h-[3px] rounded-full bg-[#facc15] max-xl:w-10 xl:w-12' aria-hidden />
			</header>

			<div className='mt-10 flex flex-col gap-10 max-xl:mt-8 max-xl:gap-8 xl:mt-10 xl:flex-row xl:items-start xl:gap-16'>
				<div className='flex flex-1 flex-col gap-6'>
					<p className='max-w-[520px] font-normal text-slate-400 max-xl:text-[15px] max-xl:leading-relaxed xl:text-base xl:leading-normal'>{t('contactSection.intro')}</p>
					<ContactItems />
				</div>
				<div className='w-full flex-1 xl:max-w-none'>
					<ContactForm />
				</div>
			</div>
		</section>
	);
}
