import { Water } from '@paper-design/shaders-react';
import { useEffect, useState } from 'react';
import { shaderContainer, shaderVisible } from './WaterShader.css.ts';

const DARK_HIGHLIGHT = '#EFEFEF';
const LIGHT_HIGHLIGHT = '#17A9E5';

function hasWebGL2Support() {
	if (typeof document === 'undefined') return false;
	try {
		const canvas = document.createElement('canvas');
		return !!canvas.getContext('webgl2');
	} catch {
		return false;
	}
}

export default function WaterShader() {
	const [visible, setVisible] = useState(false);
	const [isDark, setIsDark] = useState(true);
	const [reducedMotion, setReducedMotion] = useState(false);
	const [webglSupported, setWebglSupported] = useState(false);

	useEffect(() => {
		setWebglSupported(hasWebGL2Support());
	}, []);

	useEffect(() => {
		const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
		const read = () => setReducedMotion(mql.matches);
		read();
		mql.addEventListener('change', read);
		return () => mql.removeEventListener('change', read);
	}, []);

	useEffect(() => {
		if (reducedMotion || !webglSupported) return;
		const id = requestAnimationFrame(() => setVisible(true));
		return () => cancelAnimationFrame(id);
	}, [reducedMotion, webglSupported]);

	useEffect(() => {
		const root = document.documentElement;
		const read = () => setIsDark(root.getAttribute('data-theme') === 'dark');
		read();
		const observer = new MutationObserver(read);
		observer.observe(root, {
			attributes: true,
			attributeFilter: ['data-theme'],
		});
		return () => observer.disconnect();
	}, []);

	if (reducedMotion || !webglSupported) return null;

	return (
		<div className={`${shaderContainer}${visible ? ` ${shaderVisible}` : ''}`} aria-hidden="true">
			<Water
				speed={0.71}
				colorBack="#00000000"
				colorHighlight={isDark ? DARK_HIGHLIGHT : LIGHT_HIGHLIGHT}
				size={0.55}
				highlights={0.19}
				layering={0.5}
				edges={0.8}
				waves={0.17}
				caustic={0.26}
				scale={1.43}
				fit="contain"
				style={{ width: '100%', height: '100%' }}
			/>
		</div>
	);
}
