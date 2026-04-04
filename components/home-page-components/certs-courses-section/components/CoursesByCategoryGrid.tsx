import { type Course } from '@/types/actionsTypes/actionsTypes';

export type CoursesColumn = {
	categoryKey: string;
	title: string;
	items: Course[];
};

function courseYear(course: Course): number {
	return new Date(course.course_date).getFullYear();
}

export default function CoursesByCategoryGrid({ columns }: { columns: CoursesColumn[] }) {
	return (
		<div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-10">
			{columns.map((col) => (
				<div key={col.categoryKey} className="flex min-w-0 flex-col gap-4">
					<h3 className="text-sm font-semibold text-[#facc15]">{col.title}</h3>
					<div className="flex flex-col gap-4">
						{col.items.map((course) => (
							<div key={course.id} className="flex flex-col gap-2">
								<p className="text-base font-semibold leading-snug text-slate-50">{course.course_name}</p>
								<p className="text-sm font-normal text-slate-500">
									{courseYear(course)}
									{' · '}
									{course.course_organizer}
								</p>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
