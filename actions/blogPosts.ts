'use server';

import prisma from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

import { APP_CONFIG } from '@/config/app.config';

import { convertFormData } from '@/lib/utils/formDataToObjectConvert';
import { logErrAndReturn } from '@/lib/utils/logErrAndReturn';
import { validateData } from '@/lib/utils/utils';
import { getCache, setCache, deleteMultipleCache } from '@/lib/redis/redis';
import { REDIS_KEYS } from '@/lib/redis/redisKeys';

import { basePostSchema, updatePostSchema } from '@/lib/zod-schemas/postsSchema';
import { idSchema } from '@/lib/zod-schemas/idSchema';

import { type GetPostType, type GetPostsType, type ReturnedType, type Post } from '@/types/actionsTypes/actionsTypes';

export const getBlogPosts = async (): Promise<GetPostsType> => {
	try {
		const cachedBlogPosts = await getCache<Post[]>(REDIS_KEYS.BLOGPOSTS);
		if (cachedBlogPosts) return { posts: cachedBlogPosts };

		const posts = await prisma.posts.findMany();

		if (!posts) {
			return logErrAndReturn('getBlogPosts', 'Blog posts not found.', { error: 'Blog posts not found.' });
		}

		await setCache<Post[]>(REDIS_KEYS.BLOGPOSTS, posts, APP_CONFIG.redis.defaultExpiration);
		return { posts: posts };
	} catch (error) {
		return logErrAndReturn('getBlogPosts', error, { error: 'Failed to fetch blog posts.' });
	}
};

export const getBlogPost = async (id: string): Promise<GetPostType> => {
	try {
		const validId = idSchema.safeParse(id);

		if (!validId.success) {
			return logErrAndReturn('getBlogPost', validId.error.flatten(), { error: 'Invalid input data' });
		}

		const cachedBlogPost = await getCache<Post>(REDIS_KEYS.BLOGPOST(validId.data));
		if (cachedBlogPost) return { post: cachedBlogPost };

		const post = await prisma.posts.findUnique({
			where: { id: validId.data },
		});

		if (!post) {
			return logErrAndReturn('getBlogPost', 'Post not found.', { error: 'Post not found' });
		}
		await setCache(REDIS_KEYS.BLOGPOST(id), post, APP_CONFIG.redis.defaultExpiration);
		return { post: post };
	} catch (error) {
		return logErrAndReturn('getBlogPost', error, { error: 'Failed to fetch blog post.' });
	}
};

export async function newBlogPost(prevState: ReturnedType, formData: FormData): Promise<ReturnedType> {
	try {
		const postObj = convertFormData(formData);
		const validPostObject = validateData(postObj, basePostSchema);

		if (!validPostObject.success) {
			return logErrAndReturn('newBlogPost', validPostObject.error.flatten(), {
				success: false,
				error: 'Invalid input data.',
			});
		}

		const id = uuidv4();

		const newPost = { id, ...(validPostObject.data as Omit<Post, 'id'>) };

		await prisma.posts.create({
			data: newPost,
		});

		await deleteMultipleCache(REDIS_KEYS.BLOGPOSTS, REDIS_KEYS.SITEMAP);
		return { success: true, message: 'Blog post added correctly.' };
	} catch (error) {
		return logErrAndReturn('newBlogPost', error, { success: false, error: 'Failed to add new blog post.' });
	}
}

export async function updateBlogPost(prevState: ReturnedType, formdata: FormData): Promise<ReturnedType> {
	try {
		const inputData = convertFormData(formdata);
		const validInputData = validateData(inputData, updatePostSchema);

		if (!validInputData.success) {
			return logErrAndReturn('updateBlogPost', validInputData.error.flatten(), {
				success: false,
				error: 'Invalid input data.',
			});
		}

		const { id, ...postData } = validInputData.data as Post;

		await prisma.posts.update({
			where: { id: id },
			data: postData,
		});

		await deleteMultipleCache(REDIS_KEYS.BLOGPOSTS, REDIS_KEYS.BLOGPOST(id));
		return { success: true, message: 'Blog post updated correctly.' };
	} catch (error) {
		return logErrAndReturn('updateBlogPost', error, { success: false, error: 'Failed to update blog post.' });
	}
}

export async function deleteBlogPost(prevState: ReturnedType, formData: FormData): Promise<ReturnedType> {
	try {
		const inputId = formData.get('id') as string;
		const validId = validateData(inputId, idSchema);

		if (!validId.success) {
			return logErrAndReturn('deleteBlogPost', validId.error.flatten(), {
				success: false,
				error: 'Invalid input data.',
			});
		}

		const deletedPost = await prisma.posts.delete({
			where: { id: validId.data as string },
		});

		await deleteMultipleCache(REDIS_KEYS.BLOGPOSTS, REDIS_KEYS.BLOGPOST(deletedPost.id), REDIS_KEYS.SITEMAP);
		return { success: true, message: 'Blog post deleted successfully.' };
	} catch (error) {
		return logErrAndReturn('deleteBlogPost', error, { success: false, error: 'Failed to delete blog post.' });
	}
}
