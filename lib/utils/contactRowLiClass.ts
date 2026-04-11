import { cn } from "./utils";

export const contactRowLiClass = (hasHref: boolean) =>
	cn(
		'list-none border-b border-solid py-2.5 last:border-b-0 transition-[border-bottom-color] duration-150',
		hasHref && 'focus-within:[border-bottom-color:#ffdb70!important]',
	);