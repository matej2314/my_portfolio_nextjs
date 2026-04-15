/** Zachowuje wysokość/szerokość slotu karty podczas lotu do pełnej strony projektu. */
export default function ProjectCardPlaceholder() {
	return (
		<div
			className='relative h-[280px] min-h-[280px] w-full rounded-xl border border-dashed border-[#facc15]/35 bg-[#0c0c0c]/50 animate-pulse'
			aria-hidden
		/>
	);
}
