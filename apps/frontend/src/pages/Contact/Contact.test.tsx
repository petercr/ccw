/** @vitest-environment jsdom */

import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ContactPage } from './Contact.tsx';

vi.mock('@/components/BackToHome/BackToHome.tsx', () => ({
	BackToHome: () => null,
}));

vi.mock('@/components/SocialLinks/SocialLinks.tsx', () => ({
	SocialLinks: () => null,
}));

vi.mock('./Contact.css.ts', () => ({
	auditCard: '',
	auditContent: '',
	auditKicker: '',
	auditSubtext: '',
	auditText: '',
	container: '',
	errorMessage: '',
	fieldError: '',
	fieldGroup: '',
	fieldInput: '',
	fieldLabel: '',
	fieldTextarea: '',
	formCard: '',
	formTitle: '',
	headerPill: '',
	headerTitle: '',
	submitButton: '',
	successMessage: '',
}));

afterEach(() => {
	cleanup();
	vi.unstubAllGlobals();
});

function fillValidForm() {
	fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'Jane' } });
	fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
	fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jane@example.com' } });
	fireEvent.change(screen.getByLabelText('Reason For Message'), { target: { value: 'Website audit' } });
}

describe('ContactPage', () => {
	it('shows shared-schema validation errors and does not submit invalid values', async () => {
		const fetchMock = vi.fn();
		vi.stubGlobal('fetch', fetchMock);
		render(<ContactPage />);

		fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

		await waitFor(() => {
			expect(screen.getByText('First name is required')).toBeTruthy();
		});
		expect(screen.getByText('Last name is required')).toBeTruthy();
		expect(screen.getByText('Email is required')).toBeTruthy();
		expect(screen.getByText('Reason for message is required')).toBeTruthy();
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it('clears a field error after the user corrects that field', async () => {
		render(<ContactPage />);

		const email = screen.getByLabelText('Email');
		fireEvent.blur(email);

		await waitFor(() => {
			expect(screen.getByText('Email is required')).toBeTruthy();
		});

		fireEvent.change(email, { target: { value: 'jane@example.com' } });

		await waitFor(() => {
			expect(screen.queryByText('Email is required')).toBeNull();
			expect(screen.queryByText('A valid email is required')).toBeNull();
		});
	});

	it('renders API errors and API field errors after a valid submission', async () => {
		const fetchMock = vi.fn().mockResolvedValue({
			json: async () => ({
				success: false,
				error: 'Unable to save your message. Please try again later.',
				fieldErrors: { email: 'This email address is blocked' },
			}),
		});
		vi.stubGlobal('fetch', fetchMock);
		render(<ContactPage />);

		fillValidForm();
		fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

		await waitFor(() => {
			expect(screen.getByText('Unable to save your message. Please try again later.')).toBeTruthy();
		});
		expect(screen.getByText('This email address is blocked')).toBeTruthy();
		expect(fetchMock).toHaveBeenCalledWith('/api/contact', expect.objectContaining({ method: 'POST' }));
	});

	it('submits normalized values and shows the success confirmation', async () => {
		const fetchMock = vi.fn().mockResolvedValue({
			json: async () => ({ success: true, id: 'submission-1' }),
		});
		vi.stubGlobal('fetch', fetchMock);
		render(<ContactPage />);

		fillValidForm();
		fireEvent.change(screen.getByLabelText('First Name'), { target: { value: ' Jane ' } });
		fireEvent.change(screen.getByLabelText('Additional Info'), { target: { value: ' Please call me ' } });
		fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

		await waitFor(() => {
			expect(screen.getByText("Thanks! Your message has been sent. We'll be in touch soon.")).toBeTruthy();
		});
		expect(fetchMock).toHaveBeenCalledWith(
			'/api/contact',
			expect.objectContaining({
				body: JSON.stringify({
					firstName: 'Jane',
					lastName: 'Doe',
					email: 'jane@example.com',
					reasonForMessage: 'Website audit',
					additionalInfo: 'Please call me',
				}),
			}),
		);
	});
});
