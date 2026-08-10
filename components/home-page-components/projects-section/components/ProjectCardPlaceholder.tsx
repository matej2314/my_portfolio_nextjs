export default function ProjectCardPlaceholder() {
	return (
		<div className='relative w-full overflow-hidden rounded-[var(--radius-shell)] border border-dashed border-brand-line/50 bg-surface-1/40 p-1.5 animate-pulse'>
			<div className='overflow-hidden rounded-[var(--radius-core)] border border-line-soft bg-surface-2'>
				<div className='aspect-[16/10] w-full bg-surface-3/50' />
				<div className='flex flex-col gap-3 p-5'>
					<div className='h-6 w-2/3 rounded bg-surface-3/60' />
					<div className='h-3 w-1/2 rounded bg-surface-3/40' />
					<div className='h-12 w-full rounded bg-surface-3/30' />
				</div>
			</div>
		</div>
	);
}
