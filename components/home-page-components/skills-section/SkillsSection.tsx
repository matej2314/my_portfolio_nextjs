import { getTranslations } from 'next-intl/server';

import { type GetSkillsType } from '@/types/actionsTypes/actionsTypes';

import SkillsList from './components/SkillsList';

export default async function SkillsSection({ skills }: { skills: GetSkillsType | undefined }) {
	const t = await getTranslations('homePage');

	if (!skills || 'error' in skills) {
		return <p>Failed to fetch skills</p>;
	}

	return (
		<section id='skillsSection' className='w-full h-fit lg:h-screen snap-center flex flex-col justify-center gap-3 font-kanit text-slate-200'>
			<span className='text-4xl text-green-400 w-full mb-[6rem] sm:mb-0'>Skills &#123;</span>

			<div className='w-full h-full flex flex-col xl:flex-row items-center xl:items-start xl:pt-[7rem] justify-start xl:justify-between gap-8 xl:gap-12 xl:mt-[1rem]'>
				<div className='w-full h-fit xl:w-[40%] text-justify flex justify-center'>
					<p className='h-fit text-base md:text-xl leading-9 tracking-wide font-kanit'>{t('skillsSection.description')}</p>
				</div>

				<div className='w-full xl:w-1/2 flex justify-start items-start xl:pl-[2rem]'>
					<SkillsList skills={skills.skills} />
				</div>
			</div>
			<span className='text-4xl text-green-400 w-full mt-[13rem] lg:mt-[8rem]'>&#125;</span>
		</section>
	);
}
