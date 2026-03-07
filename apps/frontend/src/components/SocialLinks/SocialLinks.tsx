import { useSiteSettings } from '@/hooks/useSiteSettings.ts';
import { Github, Linkedin } from 'lucide-react';
import { card, icons, link, title } from './SocialLinks.css.ts';

function XLogo() {
	return (
		<svg
			role="img"
			aria-hidden="true"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.636 5.903-5.636Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
		</svg>
	);
}

export function SocialLinks() {
	const siteSettings = useSiteSettings();
	const { linkedin, github, twitter } = siteSettings?.socialLinks ?? {};

	return (
		<div className={card}>
			<p className={title}>Social Links</p>
			<div className={icons}>
				<a
					href={linkedin ?? 'https://linkedin.com'}
					target="_blank"
					rel="noopener noreferrer"
					className={link}
					aria-label="LinkedIn"
					style={{ background: '#0A66C2', color: '#ffffff', borderRadius: 8 }}
				>
					<Linkedin size={28} />
				</a>
				<a
					href={github ?? 'https://github.com'}
					target="_blank"
					rel="noopener noreferrer"
					className={link}
					aria-label="GitHub"
				>
					<Github size={28} />
				</a>
				<a
					href={twitter ?? 'https://x.com'}
					target="_blank"
					rel="noopener noreferrer"
					className={link}
					aria-label="X"
				>
					<XLogo />
				</a>
			</div>
		</div>
	);
}
