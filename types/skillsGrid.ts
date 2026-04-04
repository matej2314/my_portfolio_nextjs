import { Skill } from "./actionsTypes/actionsTypes";

export type SkillsGridColumn = {
	categoryKey: string;
	title: string;
	skills: Skill[];
};