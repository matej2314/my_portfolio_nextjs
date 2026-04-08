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
				className="w-full bg-transparent max-xl:mx-auto max-xl:max-w-[100vw] max-xl:px-4 max-xl:py-8 xl:px-12 xl:py-12"
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
			className="flex w-full flex-col gap-8 bg-transparent max-xl:mx-auto max-xl:max-w-[100vw] max-xl:px-4 max-xl:py-8 xl:px-12 xl:py-12"
		>
			<header className="flex flex-col gap-2 max-xl:gap-1.5 xl:gap-2">
				<p className="font-semibold tracking-wide text-slate-500 max-xl:text-xs xl:text-[13px]">
					{t('certsSection.sectionIndex')}
				</p>
				<h2 className="font-light leading-tight text-slate-50 max-xl:text-[1.625rem] max-xl:leading-snug xl:text-[2.375rem]">
					{t('certsSection.title')}
				</h2>
				<div className="h-[3px] rounded-full bg-[#facc15] max-xl:w-10 xl:w-12" aria-hidden />
			</header>

			<p className="max-w-[640px] font-normal text-slate-400 max-xl:text-[15px] max-xl:leading-relaxed xl:text-base xl:leading-normal">
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
