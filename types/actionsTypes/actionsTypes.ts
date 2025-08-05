import { type about_me as PrismaAboutMeType } from '@prisma/client';
import { type courses as PrismaCourseType } from '@prisma/client';
import { type projects as PrismaProjectType } from '@prisma/client';
import { type skills as PrismaSkillType } from '@prisma/client';
import { type users as PrismaUserType } from '@prisma/client';
import { type posts as PrismaPostType } from '@prisma/client';

export type AboutTextType = PrismaAboutMeType;

export type GetAboutMeType = { aboutMe: AboutTextType | null } | { error: string };

export type Course = PrismaCourseType;

export type GetCourseType = { course: Course } | { error: string };

export type GetCoursesType = { courses: Course[] } | { error: string };

export type Project = PrismaProjectType;

export type ProjectCategory = 'FullStack' | 'Frontend' | 'Backend';

export type GetProjectsType = { projects: Project[] } | { error: string };

export type GetProjectType = { project: Project } | { error: string };

export type GetProjectCategoriesType = { categories: ProjectCategory[] } | { error: string };

export type Skill = PrismaSkillType;

export type GetSkillType = { skill: Skill } | { error: string };

export type GetSkillsType = { skills: Skill[] } | { error: string };

export type Post = PrismaPostType;

export type GetPostsType = { posts: Post[] } | { error: string };

export type GetPostType = { post: Post } | { error: string };

export type User = PrismaUserType;

export type AuthorizedUser = {
	email: string;
	role: string;
	login: string;
};

export type GetShotsResult = { success: true; files: string[] } | { success: false; error: string };

export type ReturnedType = { success: true; message: string } | { success: false; error: string };

export type ValidationResult =
	| {
			success: true;
			mainFiles?: File[] | [];
			galleryFiles?: File[] | [];
	  }
	| {
			success: false;
			error: string;
	  };

export type DataCounterReturnedData = {
	projectsCount: number;
	coursesCount: number;
	skillsCount: number;
	blogPostsCount: number;
};
