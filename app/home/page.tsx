import BaseSection from '@/components/home-page-components/base-section/BaseSection';
import AboutSection from '@/components/home-page-components/about-section/AboutSection';
import SkillsSection from '@/components/home-page-components/skills-section/SkillsSection';
import ProjectsSection from '@/components/home-page-components/projects-section/ProjectsSection';
import CertsCoursesSection from '@/components/home-page-components/certs-courses-section/CertsCoursesSection';
import ExperienceSection from '@/components/home-page-components/experience-section/ExperienceSection';
import ContactSection from '@/components/home-page-components/contact-section/ContactSection';
import HomeFooter from '@/components/home-page-components/HomeFooter';
import SiteHeader from '@/components/home-page-components/SiteHeader';
import ScrollToTop from '@/components/ui/elements/ScrollToTopBtn';

import KeyboardNavigation from '@/components/KeyboardNavigation';
import { LenisProvider } from '@/providers/LenisProvider';

import { getHomePageData } from '@/actions/homePage';
import { generatePageMetadata } from '@/lib/generatePageMetadata';

export async function generateMetadata() {
	return generatePageMetadata('page', null);
}

export default async function HomePage() {
	const { data, error } = await getHomePageData();

	if (error) {
		console.error(error);
		return;
	}

	return (
		<LenisProvider
			id='mainSection'
			className='no-scrollbar flex h-screen max-h-screen w-full flex-col items-center overflow-x-hidden overflow-y-auto px-3 sm:px-8 z-0'
		>
			<div className='flex h-fit w-full flex-col items-center justify-start'>
				<div className='flex h-[100dvh] w-full shrink-0 flex-col'>
					<SiteHeader variant='home' />
					<BaseSection />
				</div>
				<div className='flex w-full flex-col'>
					<AboutSection aboutText={data?.aboutMe && 'aboutMe' in data.aboutMe ? data.aboutMe.aboutMe : undefined} />
					<ExperienceSection experiences={data?.experience} />
					<SkillsSection skills={data?.skills} />
					<CertsCoursesSection courses={data?.courses} />
					<ProjectsSection projects={data?.projects} />
					<ContactSection />
					<HomeFooter />
				</div>
			</div>
			<div className='fixed bottom-2 right-[2rem]'>
				<ScrollToTop />
			</div>
			<KeyboardNavigation />
		</LenisProvider>
	);
}
