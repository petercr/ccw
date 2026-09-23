import type { HomeDocument } from '@/types/home.ts';
import { stegaClean } from '@sanity/client/stega';
import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import {
	buttonLink,
	cardPair,
	cardRow,
	cardText,
	contentCard,
	contentCardsSection,
	headingCard,
	headingText,
	linkList,
	simpleLink,
} from './ContentCardsSection.css.ts';

/**
 * File routes use TanStack Link. Catch-all CMS slugs use a real <a href>
 * so navigation is a document request — the production client router does
 * not reliably leave `/` for `/$` splat targets (Playwright stays on home).
 */
function CmsLink({ url, className, children }: { url: string; className?: string; children: ReactNode }) {
	const pathname = stegaClean(url).trim();
	const path = pathname.startsWith('/') ? pathname : `/${pathname}`;

	if (path === '/') {
		return (
			<Link to="/" className={className}>
				{children}
			</Link>
		);
	}
	if (path === '/contact') {
		return (
			<Link to="/contact" className={className}>
				{children}
			</Link>
		);
	}
	if (path === '/our-work') {
		return (
			<Link to="/our-work" className={className}>
				{children}
			</Link>
		);
	}
	if (path === '/testimonials') {
		return (
			<Link to="/testimonials" className={className}>
				{children}
			</Link>
		);
	}

	return (
		<a href={path} className={className}>
			{children}
		</a>
	);
}

interface ContentCardsSectionProps {
	homeData: HomeDocument;
}

export function ContentCardsSection({ homeData }: ContentCardsSectionProps) {
	const { headingCard1, headingCard2, headingCard3, card1, card2, card3 } = homeData;

	const hasHeadings = headingCard1 || headingCard2 || headingCard3;
	const hasContentCards = card1 || card2 || card3;

	if (!hasHeadings && !hasContentCards) return null;

	return (
		<section className={contentCardsSection}>
			<div className={cardRow}>
				{/* Pair 1: Header + Card */}
				<div className={cardPair}>
					{headingCard1 && (
						<div className={headingCard}>
							<h3 className={headingText}>{headingCard1}</h3>
						</div>
					)}
					{card1 && (
						<div className={contentCard}>
							{card1.links && card1.links.length > 0 && (
								<div className={linkList}>
									{card1.links.map((link) =>
										link.isExternal ? (
											<a
												key={link.url}
												href={link.url}
												className={simpleLink}
												target="_blank"
												rel="noopener noreferrer"
											>
												{link.label}
											</a>
										) : (
											<CmsLink key={link.url} url={link.url} className={simpleLink}>
												{link.label}
											</CmsLink>
										),
									)}
								</div>
							)}
							{card1.text && <p className={cardText}>{card1.text}</p>}
						</div>
					)}
				</div>

				{/* Pair 2: Header + Card */}
				<div className={cardPair}>
					{headingCard2 && (
						<div className={headingCard}>
							<h3 className={headingText}>{headingCard2}</h3>
						</div>
					)}
					{card2 && <div className={contentCard}>{card2.text && <p className={cardText}>{card2.text}</p>}</div>}
				</div>

				{/* Pair 3: Header + Card */}
				<div className={cardPair}>
					{headingCard3 && (
						<div className={headingCard}>
							<h3 className={headingText}>{headingCard3}</h3>
						</div>
					)}
					{card3 && (
						<div className={contentCard}>
							{card3.content?.map((block) => {
								if (block._type === 'textContent' && block.text) {
									return (
										<p key={block.text} className={cardText}>
											{block.text}
										</p>
									);
								}
								if (block._type === 'buttonContent') {
									return (
										<div key={block.label} className={linkList}>
											{block.isExternal ? (
												<a href={block.url} className={buttonLink} target="_blank" rel="noopener noreferrer">
													{block.label}
												</a>
											) : (
												<CmsLink url={block.url} className={buttonLink}>
													{block.label}
												</CmsLink>
											)}
										</div>
									);
								}
								return null;
							})}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
