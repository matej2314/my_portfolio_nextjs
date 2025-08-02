import InputElement from "@/components/ui/elements/InputElement";
import SelectElement from "@/components/ui/elements/SelectElement";

interface SkillCatInputProps {
    isCustomCategory: boolean;
    selectedCategory: string;
    onSelectedCategory: (category: string) => void;
    categories: { value: string; label: string }[];
}

export default function SkillCatInput({ isCustomCategory, selectedCategory, onSelectedCategory, categories }: SkillCatInputProps) {
    return isCustomCategory ? (
        <InputElement
            type="text"
            title="Custom skill category"
            name="skill_cat"
            id="skill_cat"
            required={false}
            className="text-md pl-2 tracking-wide w-[16rem]"
            placeholder="min 5 characters, max 20 characters"
        />
    ) : (
        <>
            <SelectElement
                value={selectedCategory}
                onChange={(val) => onSelectedCategory(val)}
                options={categories.map(category =>
                ({
                    value: category.value as string,
                    label: category.label,
                    ariaLabel: category.label
                }))}
                placeholder="skill category"
                className="w-[15rem]"
            />
            <input type="hidden" id="skill_cat" name="skill_cat" value={selectedCategory} />
        </>
    )
}