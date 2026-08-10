import { type SocialLinkItem } from "@/types/floatingContactTypes";
import { cn } from "@/lib/utils/utils";
import { Icon } from "@iconify/react/dist/iconify.js";

type FloatingContactSocialLinksProps = {
	links: SocialLinkItem[];
	borderColor: string;
	ariaLabel: (kind: SocialLinkItem['kind']) => string;
	reducedMotion: boolean | null;
};

const socialLinkClass = (allowMotion: boolean) =>
	cn(
		'inline-flex rounded-full text-ink-3 outline-none transition-[transform,color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] [transform-origin:center]',
		'hover:text-brand focus:outline-none focus-visible:text-brand focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0',
		allowMotion && 'hover:scale-[1.08] focus-visible:scale-[1.08]',
	);
    
    export default function FloatingContactSocialLinks({ links, borderColor, ariaLabel, reducedMotion }: FloatingContactSocialLinksProps) {
        const allowMotion = !reducedMotion;
    
        return (
            <div className='border-t px-4 py-3' style={{ borderColor: borderColor }}>
                <div className='flex flex-wrap gap-3'>
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            target='_blank'
                            rel='noopener noreferrer'
                            className={socialLinkClass(allowMotion)}
                            aria-label={ariaLabel(link.kind)}
                        >
                            <Icon icon={link.icon} width={22} height={22} aria-hidden={true} className='shrink-0 text-current' />
                        </a>
                    ))}
                </div>
            </div>
        );
    }