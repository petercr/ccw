/** @vitest-environment jsdom */

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vite-plus/test';
import BlockContent from './PortableText';

describe('BlockContent', () => {
	it('renders a Sanity text block with its custom phone link mark', () => {
		render(
			<BlockContent
				value={[
					{
						_type: 'block',
						_key: 'paragraph',
						style: 'normal',
						markDefs: [{ _type: 'phoneNumberLink', _key: 'phone', phoneNumber: '+15551234567' }],
						children: [
							{ _type: 'span', _key: 'intro', text: 'Call ' },
							{ _type: 'span', _key: 'number', text: 'our team', marks: ['phone'] },
						],
					},
				]}
			/>,
		);

		const phoneLink = screen.getByRole('link', { name: /our team/i });
		expect(phoneLink.closest('p')?.textContent).toContain('Call our team');
		expect(phoneLink.getAttribute('href')).toBe('tel:+15551234567');
	});
});
