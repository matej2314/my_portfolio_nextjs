import { headers } from "next/headers";

import BaseSection from "@/components/home-page-components/base-section/BaseSection";
import AboutSection from "@/components/home-page-components/about-section/AboutSection";
import SkillsSection from "@/components/home-page-components/skills-section/SkillsSection";
import ProjectsSection from "@/components/home-page-components/projects-section/ProjectsSection";
import CertsCoursesSection from "@/components/home-page-components/certs-courses-section/CertsCoursesSection";
import ExperienceSection from "@/components/home-page-components/experience-section/ExperienceSection";
import ContactSection from "@/components/home-page-components/contact-section/ContactSection";
import HomeFooter from "@/components/home-page-components/HomeFooter";
import SiteHeader from "@/components/home-page-components/SiteHeader";
import HeroScene from "@/components/home-page-components/base-section/components/HeroScene";
import ScrollProgressBar from "@/components/ScrollProgressBar";

import KeyboardNavigation from "@/components/KeyboardNavigation";
import { LenisProvider } from "@/providers/LenisProvider";

import { getHomePageData } from "@/actions/homePage";
import { generatePageMetadata } from "@/lib/generatePageMetadata";
import { deviceClassFromUserAgent } from "@/lib/metrics/deviceClass";
import { observeHomePageView } from "@/lib/metrics/productMetrics";

export async function generateMetadata() {
	return generatePageMetadata("page", null);
}

export default async function HomePage() {
	const h = await headers();
	const isPrefetch =
		h.get("next-router-prefetch") === "1" || h.get("purpose") === "prefetch";

	if (!isPrefetch) {
		observeHomePageView(deviceClassFromUserAgent(h.get("user-agent")));
	}

	const { data, error } = await getHomePageData();

	if (error) {
		console.error(error);
		return;
	}

	return (
		<LenisProvider
			id="mainSection"
			className="no-scrollbar z-0 flex h-[100dvh] max-h-[100dvh] w-full min-w-0 flex-col items-stretch overflow-x-hidden overflow-y-auto"
		>
			<ScrollProgressBar />
			<div className="flex h-fit w-full min-w-0 flex-col items-stretch justify-start">
				{/* Shared atmosphere behind the hero */}
				<div className="relative flex min-h-[88dvh] w-full shrink-0 flex-col xl:min-h-[100dvh]">
					<HeroScene />
					<div className="relative z-[1] flex min-h-0 w-full flex-1 flex-col">
						<BaseSection />
					</div>
				</div>
				<SiteHeader variant="home" />
				<div className="flex w-full flex-col">
					<AboutSection
						aboutText={
							data?.aboutMe && "aboutMe" in data.aboutMe
								? data.aboutMe.aboutMe
								: undefined
						}
					/>
					<ExperienceSection experiences={data?.experience} />
					<SkillsSection skills={data?.skills} />
					<CertsCoursesSection courses={data?.courses} />
					<ProjectsSection projects={data?.projects} />
					<ContactSection />
					<HomeFooter />
				</div>
			</div>
			<KeyboardNavigation />
		</LenisProvider>
	);
}
