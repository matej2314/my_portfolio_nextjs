import { Post } from '../actionsTypes/actionsTypes';

export interface BlogPostFormProps {
	blogPostData?: Post;
	mode?: 'edit' | 'create';
}
