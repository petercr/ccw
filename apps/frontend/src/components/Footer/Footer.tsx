import { useSiteSettings } from '@/hooks/useSiteSettings.ts';
import {
	bottomRow,
	brandBlock,
	brandName,
	brandTagline,
	footer,
	footerLink,
	groupTitle,
	heart,
	linkGroup,
	metaItem,
	smallMeta,
	topRow,
} from './Footer.css.ts';

export function Footer() {
	const year = new Date().getFullYear();
	const siteSettings = useSiteSettings();
	const { linkedin, github, twitter } = siteSettings?.socialLinks ?? {};

	return (
		<footer className={footer} role="contentinfo">
			<div className={topRow}>
				<div className={brandBlock}>
					<div className={brandName}>Cape Cod World</div>
					<p className={brandTagline}>
						Bringing your ideas to the world. We help small businesses and individuals build a strong online presence
						with modern, fast, and beautiful websites.
					</p>
					<p className={brandTagline}>© 2016–{year} Cape Cod World</p>
				</div>
				<nav className={linkGroup} aria-label="Social">
					<div className={groupTitle}>Social</div>
					<a
						className={footerLink}
						href={linkedin ?? 'https://linkedin.com'}
						target="_blank"
						rel="noopener noreferrer"
					>
						LinkedIn
					</a>
					<a
						className={footerLink}
						href={github ?? 'https://github.com'}
						target="_blank"
						rel="noopener noreferrer"
					>
						GitHub
					</a>
					<a
						className={footerLink}
						href={twitter ?? 'https://x.com'}
						target="_blank"
						rel="noopener noreferrer"
					>
						X
					</a>
				</nav>
			</div>
			<div className={bottomRow}>
				<div className={smallMeta}>
					<span className={metaItem}>
						Made with <span className={heart}>♥</span> using TanStack & Sanity
					</span>
				</div>
				<div className={smallMeta}>
					<span className={metaItem}>
						<a className={footerLink} href="https://github.com/petercr/ccw/issues" target="_blank" rel="noopener noreferrer">
							Issues
						</a>
					</span>
					<span className={metaItem}>
						<a className={footerLink} href="/contact">
							Contact
						</a>
					</span>
				</div>
			</div>
		</footer>
	);
}
