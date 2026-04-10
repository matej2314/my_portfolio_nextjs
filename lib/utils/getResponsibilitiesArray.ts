import { type Experience } from "@/types/actionsTypes/actionsTypes";
import { type useTranslations } from "next-intl";

export const getResponsibilitiesArray = (exp: Experience, t: ReturnType<typeof useTranslations>) => {
    const respKey = exp.responsibilities?.trim();
						let respItems: string[] = [];
						if (respKey && t.has(respKey)) {
							const raw = t.raw(respKey);
							respItems = Array.isArray(raw) ? raw.filter((x): x is string => typeof x === 'string') : [];
						}
                        return respItems;
}