import { getTranslations } from 'next-intl/server';

import ContactItems from './components/ContactItems';
import ContactForm from './components/ContactForm';
import SectionShell from '@/components/home-page-components/shared/SectionShell';
import SectionHeading from '@/components/home-page-components/shared/SectionHeading';
import SectionBody from '@/components/home-page-components/shared/SectionBody';

export default async function ContactSection() {
	const t = await getTranslations('homePage');

	return (
		<SectionShell id='contactSection'>
			<SectionHeading
				index={t('contactSection.sectionIndex')}
				title={t('contactSection.title')}
				lead={t('contactSection.intro')}
			/>
			<SectionBody>
				<div className='flex flex-col gap-10 xl:flex-row xl:items-start xl:gap-12'>
					<div className='flex flex-1 flex-col gap-6'>
						<ContactItems />
					</div>
					<div className='w-full flex-1'>
						<ContactForm />
					</div>
				</div>
			</SectionBody>
		</SectionShell>
	);
}
