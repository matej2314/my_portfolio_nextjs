/**
 * Full-bleed hero atmosphere — sits behind header + base in the first viewport shell.
 * No opaque surface fill: inherits body `.bg-scene` so the menu band and hero read as one plane.
 */
export default function HeroScene() {
	return (
		<div className='pointer-events-none absolute inset-0 overflow-hidden' aria-hidden>
			<div className='hero-blob hero-blob-a' />
			<div className='hero-blob hero-blob-b' />
			<div className='hero-blob hero-blob-c' />
			<div className='hero-grid' />
			{/* Soften only toward the next section — keep the top continuous with the menu band */}
			<div className='absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface-0 via-surface-0/50 to-transparent' />
		</div>
	);
}
