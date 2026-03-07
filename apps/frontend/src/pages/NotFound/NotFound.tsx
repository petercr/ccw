import { Link } from '@tanstack/react-router';
import { ArrowLeft, Home } from 'lucide-react';
import { buttonContainer, buttonGhost, buttonPrimary, container, description, title } from './NotFound.css.ts';

export function NotFoundPage() {
	return (
		<div className={container}>
			<h1 className={title}>404</h1>
			<p className={description}>Sorry, this page could not be found.</p>
			<div className={buttonContainer}>
				<Link to="/" className={buttonPrimary} aria-label="Go to home page">
					<Home size={20} />
					Go to home page
				</Link>
				<button onClick={() => window.history.back()} className={buttonGhost} aria-label="Go back to previous page">
					<ArrowLeft size={20} />
					Go back
				</button>
			</div>
		</div>
	);
}
