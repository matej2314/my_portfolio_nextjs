import { AboutTextType } from '../actionsTypes/actionsTypes';

export interface AboutTxtFormProps {
	aboutMeData?: AboutTextType;
	mode?: 'edit' | 'create';
}
