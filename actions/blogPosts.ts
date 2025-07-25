'use server';

import prisma from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

import { basePostSchema, updatePostSchema } from '@/lib/zod-schemas/postsSchema';
import { idSchema } from '@/lib/zod-schemas/idSchema';

import { type GetPostType, GetPostsType, ReturnedType, Post } from '@/types/actionsTypes/actionsTypes';
import { convertFormData } from '@/lib/formDataToObjectConvert';
import { getCache, setCache, deleteCache, deleteMultipleCache } from '@/lib/redis/redis';
import { REDIS_KEYS } from '@/lib/redis/redisKeys';

export const getBlogPosts = async (): Promise<GetPostsType> => {
	try {
		const cachedBlogPosts = await getCache<Post[]>(REDIS_KEYS.BLOGPOSTS);
		if (cachedBlogPosts) return { posts: cachedBlogPosts };

		const posts = await prisma.posts.findMany();

		if (!posts) {
			return { error: 'Blog posts not found.' };
		}

		await setCache<Post[]>(REDIS_KEYS.BLOGPOSTS, posts, 3600);
		return { posts: posts };
	} catch (error) {
		console.error(`getPosts error:`, error);
		return { error: 'Failed to fetch blog posts.' };
	}
};

export const getBlogPost = async (id: string): Promise<GetPostType> => {
	try {
		const validId = idSchema.safeParse(id);

		if (!validId.success) {
			console.error('getBlogPost validation error:', validId.error.flatten());
			return { error: 'Invalid input data' };
		}

		const cachedBlogPost = await getCache<Post>(REDIS_KEYS.BLOGPOST(validId.data));
		if (cachedBlogPost) return { post: cachedBlogPost };

		const post = await prisma.posts.findUnique({
			where: { id: validId.data },
		});

		if (!post) {
			return { error: 'Post not found' };
		}
		await setCache(REDIS_KEYS.BLOGPOST(id), post, 3600);
		return { post: post };
	} catch (error) {
		console.error('getBlogPost error:', error);
		return { error: 'Failed to fetch blog post.' };
	}
};

export async function newBlogPost(prevState: ReturnedType, formData: FormData): Promise<ReturnedType> {
	try {
		const postObj = convertFormData(formData);
		const validPostObject = basePostSchema.safeParse(postObj);

		if (!validPostObject.success) {
			console.error('newBlogPost validation error:', validPostObject.error.flatten());
			return { success: false, error: 'Invalid input data.' };
		}

		const id = uuidv4();

		const newPost = { id, ...validPostObject.data };

		await prisma.posts.create({
			data: newPost,
		});

		deleteCache(REDIS_KEYS.BLOGPOSTS);
		deleteCache(REDIS_KEYS.SITEMAP);
		return { success: true, message: 'Blog post added correctly.' };
	} catch (error) {
		console.error('newBlogPost error:', error);
		return { success: false, error: 'Failed to add new blog post.' };
	}
}

export async function updateBlogPost(prevState: ReturnedType, formdata: FormData): Promise<ReturnedType> {
	try {
		const inputData = convertFormData(formdata);
		const validInputData = updatePostSchema.safeParse(inputData);

		if (!validInputData.success) {
			console.error('updateBlogPost validation error:', validInputData.error?.flatten());
			return { success: false, error: 'Invalid input data.' };
		}

		const { id, ...postData } = validInputData.data;

		await prisma.posts.update({
			where: { id: id },
			data: postData,
		});

		await deleteMultipleCache(REDIS_KEYS.BLOGPOSTS, REDIS_KEYS.BLOGPOST(id));
		await deleteCache(REDIS_KEYS.SITEMAP);
		return { success: true, message: 'Blog post updated correctly.' };
	} catch (error) {
		console.error('UpdateBlogPost error:', error);
		return { success: false, error: 'Failed to update blog post.' };
	}
}

export async function deleteBlogPost(prevState: ReturnedType, formData: FormData): Promise<ReturnedType> {
	try {
		const inputId = formData.get('id') as string;
		const validId = idSchema.safeParse(inputId);

		if (!validId.success) {
			console.error('deleteBlogPost validation error:', validId.error.flatten());
			return { success: false, error: 'Invalid input data.' };
		}

		const deletedPost = await prisma.posts.delete({
			where: { id: validId.data },
		});

		deleteMultipleCache(REDIS_KEYS.BLOGPOSTS, REDIS_KEYS.BLOGPOST(deletedPost.id));
		deleteCache(REDIS_KEYS.SITEMAP);
		return { success: true, message: 'Blog post deleted successfully.' };
	} catch (error) {
		console.error('deleteBlogPost error:', error);
		return { success: false, error: 'Failed to delete blog post.' };
	}
}
