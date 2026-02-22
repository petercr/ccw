import type { PortableText } from '@/types/sanitySchemas';

/**
 * Extracts plain text from PortableText blocks.
 * Useful for previews, excerpts, and meta descriptions.
 */
export function toPlainText(blocks: PortableText | null | undefined): string {
	if (!blocks || blocks.length === 0) return '';

	return blocks
		.filter((block): block is Extract<typeof block, { _type: 'block' }> => block._type === 'block')
		.map((block) => {
			if (!block.children) return '';
			return block.children
				.map((child) => ('text' in child ? child.text : ''))
				.join('');
		})
		.join('\n\n');
}

/**
 * Extracts a truncated plain text excerpt from PortableText blocks.
 */
export function toPlainTextExcerpt(
	blocks: PortableText | null | undefined,
	maxLength = 150,
): string {
	const text = toPlainText(blocks);
	if (text.length <= maxLength) return text;
	return `${text.slice(0, maxLength).trim()}…`;
}
