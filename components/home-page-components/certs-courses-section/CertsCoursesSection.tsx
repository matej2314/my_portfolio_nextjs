import { getMessages, getTranslations } from 'next-intl/server';

import { type GetCoursesType } from '@/types/actionsTypes/actionsTypes';
import { groupCoursesByCategory, skillCategorySlug } from '@/lib/utils/utils';

import CoursesByCategoryGrid, { type CoursesColumn } from './components/CoursesByCategoryGrid';

export default async function CertsCoursesSection({ courses }: { courses: GetCoursesType | undefined }) {
	const t = await getTranslations('homePage');
	const messages = await getMessages();
	const categoryTitles =
		(messages.homePage?.certsSection?.categoryTitles as Record<string, string> | undefined) ?? {};

	if (!courses || 'error' in courses) {
		return (
			<section
				id="certsSection"
				className="w-full bg-transparent px-6 py-10 max-[480px]:mx-auto max-[480px]:max-w-[100vw] sm:px-10 md:px-12 md:py-12"
			>
				<p className="text-slate-400">{t('certsSection.fetchError')}</p>
			</section>
		);
	}

	const columns: CoursesColumn[] = groupCoursesByCategory(courses.courses).map(({ category, items }) => ({
		categoryKey: category,
		title: categoryTitles[skillCategorySlug(category)] ?? category,
		items,
	}));

	return (
		<section
			id="certsSection"
			className="flex w-full flex-col gap-8 bg-transparent px-6 py-10 max-[480px]:mx-auto max-[480px]:max-w-[100vw] sm:px-10 md:gap-8 md:px-12 md:py-12"
		>
			<header className="flex flex-col gap-2">
				<p className="text-[13px] font-semibold tracking-wide text-slate-500">
					{t('certsSection.sectionIndex')}
				</p>
				<h2 className="text-[2rem] font-light leading-tight text-slate-50 sm:text-[2.375rem]">
					{t('certsSection.title')}
				</h2>
				<div className="h-[3px] w-12 rounded-full bg-[#facc15]" aria-hidden />
			</header>

			<p className="max-w-[640px] text-base font-normal leading-normal text-slate-400">
				{t('certsSection.subtitle')}
			</p>

			{columns.length === 0 || columns.every((c) => c.items.length === 0) ? (
				<p className="text-slate-500">{t('certsSection.emptyState')}</p>
			) : (
				<CoursesByCategoryGrid columns={columns.filter((c) => c.items.length > 0)} />
			)}
		</section>
	);
}
