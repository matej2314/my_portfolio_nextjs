export type Category = {
    name: string | null;
    label: string;

}

export type SkillSelectorProps = {
    clickAction: (category: string | null) => void;
    selectedCategory: string | null;
}