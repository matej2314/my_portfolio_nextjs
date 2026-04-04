import { getTranslations } from 'next-intl/server';

import ContactItems from './components/ContactItems';
import ContactForm from './components/ContactForm';

export default async function ContactSection() {
	const t = await getTranslations('homePage');

	return (
		<section id='contactSection' className='w-full bg-[#000805] px-6 py-12 sm:px-10 md:px-12 md:py-20'>
			<header className='flex flex-col gap-2'>
				<p className='text-[13px] font-semibold tracking-wide text-slate-500'>{t('contactSection.sectionIndex')}</p>
				<h2 className='text-[2rem] font-light leading-tight text-slate-50 sm:text-[2.375rem]'>{t('contactSection.title')}</h2>
				<div className='h-[3px] w-12 rounded-full bg-[#facc15]' aria-hidden />
			</header>

			<div className='mt-10 flex flex-col gap-10 lg:mt-10 lg:flex-row lg:items-start lg:gap-16'>
				<div className='flex flex-1 flex-col gap-6'>
					<p className='max-w-[520px] text-base font-normal leading-normal text-slate-400'>{t('contactSection.intro')}</p>
					<ContactItems />
				</div>
				<div className='w-full flex-1 lg:max-w-none'>
					<ContactForm />
				</div>
			</div>
		</section>
	);
}
