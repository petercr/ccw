import { useSiteSettings } from '@/hooks/useSiteSettings.ts';
import { Link } from '@tanstack/react-router';
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
						Web design, development, content and AI integration for small businesses on Cape Cod. Based here year-round
						and serving the Cape, the Islands and the South Shore.
					</p>
					<p className={brandTagline}>© 2016–{year} Cape Cod World · Cape Cod, Massachusetts</p>
				</div>
				<nav className={linkGroup} aria-label="Services">
					<div className={groupTitle}>Services</div>
					<a className={footerLink} href="/design">
						Web Design
					</a>
					<a className={footerLink} href="/development">
						Development
					</a>
					<a className={footerLink} href="/digital-content">
						Content &amp; SEO
					</a>
					<a className={footerLink} href="/ai-integration">
						AI Integration
					</a>
					<a className={footerLink} href="/deployment">
						Hosting &amp; Deployment
					</a>
				</nav>
				<nav className={linkGroup} aria-label="Company">
					<div className={groupTitle}>Company</div>
					<Link className={footerLink} to="/our-work">
						Our Work
					</Link>
					<Link className={footerLink} to="/testimonials">
						Testimonials
					</Link>
					<Link className={footerLink} to="/contact">
						Free Website Review
					</Link>
				</nav>
				<nav className={linkGroup} aria-label="Social">
					<div className={groupTitle}>Social</div>
					<a className={footerLink} href={linkedin ?? 'https://linkedin.com'} target="_blank" rel="noopener noreferrer">
						LinkedIn
					</a>
					<a className={footerLink} href={github ?? 'https://github.com'} target="_blank" rel="noopener noreferrer">
						GitHub
					</a>
					<a className={footerLink} href={twitter ?? 'https://x.com'} target="_blank" rel="noopener noreferrer">
						X
					</a>
				</nav>
			</div>
			<div className={bottomRow}>
				<div className={smallMeta}>
					<span className={metaItem}>
						Made with <span className={heart}>♥</span> on Cape Cod
					</span>
				</div>
				<div className={smallMeta}>
					<span className={metaItem}>
						<Link className={footerLink} to="/contact">
							Contact
						</Link>
					</span>
				</div>
			</div>
		</footer>
	);
}
