import { getMessages, getTranslations } from 'next-intl/server';

import { type GetCoursesType } from '@/types/actionsTypes/actionsTypes';
import { groupCoursesByCategory, skillCategorySlug } from '@/lib/utils/utils';

import CoursesByCategoryGrid, { type CoursesColumn } from './components/CoursesByCategoryGrid';
import SectionShell from '@/components/home-page-components/shared/SectionShell';
import SectionHeading from '@/components/home-page-components/shared/SectionHeading';
import SectionBody from '@/components/home-page-components/shared/SectionBody';

export default async function CertsCoursesSection({ courses }: { courses: GetCoursesType | undefined }) {
	const t = await getTranslations('homePage');
	const messages = await getMessages();
	const categoryTitles =
		(messages.homePage?.certsSection?.categoryTitles as Record<string, string> | undefined) ?? {};

	if (!courses || 'error' in courses) {
		return (
			<SectionShell id='certsSection'>
				<p className='text-ink-2 xl:col-span-12'>{t('certsSection.fetchError')}</p>
			</SectionShell>
		);
	}

	const columns: CoursesColumn[] = groupCoursesByCategory(courses.courses).map(({ category, items }) => ({
		categoryKey: category,
		title: categoryTitles[skillCategorySlug(category)] ?? category,
		items,
	}));

	return (
		<SectionShell id='certsSection'>
			<SectionHeading
				index={t('certsSection.sectionIndex')}
				title={t('certsSection.title')}
				lead={t('certsSection.subtitle')}
			/>
			<SectionBody>
				{columns.length === 0 || columns.every(c => c.items.length === 0) ? (
					<p className='text-ink-3'>{t('certsSection.emptyState')}</p>
				) : (
					<CoursesByCategoryGrid columns={columns.filter(c => c.items.length > 0)} />
				)}
			</SectionBody>
		</SectionShell>
	);
}
