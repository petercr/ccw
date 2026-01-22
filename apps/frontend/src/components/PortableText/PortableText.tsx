import { block } from '@/components/PortableText/block';
import { list, listItem } from '@/components/PortableText/list';
import { marks } from '@/components/PortableText/marks';
import { types } from '@/components/PortableText/types';
import type { PortableText as PortableTextType } from '@/types/sanitySchemas';
import { PortableText } from '@portabletext/react';
import React from 'react';

const BlockContent = ({ value }: { value?: PortableTextType }) => {
	const components = React.useMemo(
		() => ({
			types,
			block,
			list,
			listItem,
			marks,
		}),
		[],
	);

	// If no value or an empty array, return null
	if (!value || value.length === 0) return null;

	// Send the original value directly to PortableText (unnecessary filtering removed)
	return <PortableText value={value} components={components} />;
};

export default BlockContent;
