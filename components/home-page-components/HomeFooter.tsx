import Link from 'next/link';
import { getCvHref } from '@/lib/utils/getCvHref';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function HomeFooter() {
	const locale = await getLocale();
	const { cvHref, cvFileName } = getCvHref(locale);
	const date = new Date().getFullYear();
	const t = await getTranslations('homePage');
	const tMenu = await getTranslations('mainMenu');

	const navLinks = [
		{ href: '#aboutSection', label: tMenu('About') },
		{ href: '#projectsSection', label: tMenu('Projects') },
		{ href: '#contactSection', label: tMenu('Contact') },
	];

	const channelLinks = [
		{ href: cvHref, label: t('aboutSection.downloadCv'), download: cvFileName },
		{ href: 'https://www.linkedin.com/in/mateusz-mateo2314-sliwowski/', label: 'LinkedIn' },
		{ href: 'https://github.com/matej2314', label: 'GitHub' },
	];

	return (
		<footer className='w-full border-t border-line px-5 py-16 xl:px-10'>
			<div className='mx-auto grid w-full max-w-[1440px] gap-10 md:grid-cols-3 md:gap-8'>
				<p className='font-mono text-xs tracking-wide text-ink-3'>{`© ${date} ${t('homeFooter.copyright')}`}</p>

				<nav aria-label='Footer' className='flex flex-col gap-3 md:items-center'>
					{navLinks.map(link => (
						<Link
							key={link.href}
							href={link.href}
							className='text-sm text-ink-1 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60'
						>
							{link.label}
						</Link>
					))}
				</nav>

				<div className='flex flex-col gap-3 md:items-end'>
					{channelLinks.map(link => (
						<Link
							key={link.href}
							href={link.href}
							{...(link.download ? { download: link.download } : {})}
							className='text-sm text-brand transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-brand-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60'
						>
							{link.label}
						</Link>
					))}
				</div>
			</div>
		</footer>
	);
}
