import { Link } from '@tanstack/react-router';
import { button, card, cardTitle } from './BackToHome.css.ts';

export function BackToHome() {
	return (
		<div className={card}>
			<p className={cardTitle}>Back To Home</p>
			<Link to="/" className={button}>
				Let's Go!
			</Link>
		</div>
	);
}
