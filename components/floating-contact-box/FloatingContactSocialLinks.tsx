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
		'inline-flex text-slate-500 outline-none ring-0 transition-[transform,color] duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] [transform-origin:center]',
		'hover:text-slate-300 focus:text-slate-300 focus:outline-none focus-visible:text-slate-300 focus-visible:outline-none focus-visible:ring-0',
		allowMotion && 'hover:scale-[1.08] focus:scale-[1.08] focus-visible:scale-[1.08]',
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