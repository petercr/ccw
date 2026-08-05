import { useState } from 'react';
import { BackToHome } from '@/components/BackToHome/BackToHome.tsx';
import { SocialLinks } from '@/components/SocialLinks/SocialLinks.tsx';
import type { ContactResponse } from '@/server/contact/schema.ts';
import {
	auditCard,
	auditContent,
	auditKicker,
	auditSubtext,
	auditText,
	container,
	errorMessage,
	fieldError,
	fieldGroup,
	fieldInput,
	fieldLabel,
	fieldTextarea,
	formCard,
	formTitle,
	headerPill,
	headerTitle,
	submitButton,
	successMessage,
} from './Contact.css.ts';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	reasonForMessage: string;
	additionalInfo: string;
}

interface FormErrors {
	firstName?: string;
	lastName?: string;
	email?: string;
	reasonForMessage?: string;
}

const initialFormData: FormData = {
	firstName: '',
	lastName: '',
	email: '',
	reasonForMessage: '',
	additionalInfo: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ContactPage = () => {
	const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
	const [formData, setFormData] = useState<FormData>(initialFormData);
	const [errors, setErrors] = useState<FormErrors>({});
	const [touched, setTouched] = useState<Record<string, boolean>>({});
	const [serverError, setServerError] = useState<string | null>(null);

	const validateField = (name: keyof FormData, value: string): string | undefined => {
		if (name === 'firstName' && value.trim().length === 0) {
			return 'First name is required';
		}
		if (name === 'lastName' && value.trim().length === 0) {
			return 'Last name is required';
		}
		if (name === 'email') {
			if (value.trim().length === 0) {
				return 'Email is required';
			}
			if (!EMAIL_RE.test(value.trim())) {
				return 'A valid email is required';
			}
		}
		if (name === 'reasonForMessage' && value.trim().length === 0) {
			return 'Reason for message is required';
		}
		return undefined;
	};

	const handleBlur = (name: keyof FormData) => {
		setTouched((prev) => ({ ...prev, [name]: true }));
		const error = validateField(name, formData[name]);
		setErrors((prev) => ({ ...prev, [name]: error }));
	};

	const handleChange = (name: keyof FormData, value: string) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (touched[name]) {
			const error = validateField(name, value);
			setErrors((prev) => ({ ...prev, [name]: error }));
		}
	};

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		setServerError(null);

		const newErrors: FormErrors = {
			firstName: validateField('firstName', formData.firstName),
			lastName: validateField('lastName', formData.lastName),
			email: validateField('email', formData.email),
			reasonForMessage: validateField('reasonForMessage', formData.reasonForMessage),
		};
		setErrors(newErrors);
		setTouched({ firstName: true, lastName: true, email: true, reasonForMessage: true });

		if (newErrors.firstName || newErrors.lastName || newErrors.email || newErrors.reasonForMessage) {
			return;
		}

		setSubmitStatus('submitting');
		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					firstName: formData.firstName.trim(),
					lastName: formData.lastName.trim(),
					email: formData.email.trim(),
					reasonForMessage: formData.reasonForMessage.trim(),
					additionalInfo: formData.additionalInfo.trim(),
				}),
			});

			let data: ContactResponse;
			try {
				data = (await response.json()) as ContactResponse;
			} catch {
				setSubmitStatus('error');
				setServerError('Something went wrong. Please try again.');
				return;
			}

			if (data.success) {
				setSubmitStatus('success');
				setFormData(initialFormData);
				setTouched({});
				setErrors({});
				return;
			}

			if (data.fieldErrors) {
				setErrors((prev) => ({ ...prev, ...data.fieldErrors }));
			}
			setSubmitStatus('error');
			setServerError(data.error || 'Something went wrong. Please try again.');
		} catch {
			setSubmitStatus('error');
			setServerError('Something went wrong. Please try again.');
		}
	};

	return (
		<article className={container}>
			<header className={headerPill}>
				<h1 className={headerTitle}>Contact</h1>
			</header>

			<aside className={auditCard} aria-label="Free website audit">
				<div className={auditContent}>
					<span className={auditKicker}>Free website audit</span>
					<p className={auditText}>Find the quick wins hiding on your site.</p>
					<p className={auditSubtext}>Contact us today for a complimentary review and practical next steps.</p>
				</div>
			</aside>

			<div className={formCard}>
				<h2 className={formTitle}>Contact Form</h2>

				{submitStatus === 'success' ? (
					<p className={successMessage}>Thanks! Your message has been sent. We'll be in touch soon.</p>
				) : (
					<form onSubmit={handleSubmit} noValidate>
						<div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
							<div className={fieldGroup}>
								<label htmlFor="firstName" className={fieldLabel}>
									First Name
								</label>
								<input
									id="firstName"
									name="firstName"
									className={fieldInput}
									value={formData.firstName}
									onBlur={() => handleBlur('firstName')}
									onChange={(e) => handleChange('firstName', e.target.value)}
									placeholder="First name"
									autoComplete="given-name"
								/>
								{touched.firstName && errors.firstName && <span className={fieldError}>{errors.firstName}</span>}
							</div>

							<div className={fieldGroup}>
								<label htmlFor="lastName" className={fieldLabel}>
									Last Name
								</label>
								<input
									id="lastName"
									name="lastName"
									className={fieldInput}
									value={formData.lastName}
									onBlur={() => handleBlur('lastName')}
									onChange={(e) => handleChange('lastName', e.target.value)}
									placeholder="Last name"
									autoComplete="family-name"
								/>
								{touched.lastName && errors.lastName && <span className={fieldError}>{errors.lastName}</span>}
							</div>

							<div className={fieldGroup}>
								<label htmlFor="email" className={fieldLabel}>
									Email
								</label>
								<input
									id="email"
									name="email"
									type="email"
									className={fieldInput}
									value={formData.email}
									onBlur={() => handleBlur('email')}
									onChange={(e) => handleChange('email', e.target.value)}
									placeholder="you@example.com"
									autoComplete="email"
								/>
								{touched.email && errors.email && <span className={fieldError}>{errors.email}</span>}
							</div>

							<div className={fieldGroup}>
								<label htmlFor="reasonForMessage" className={fieldLabel}>
									Reason For Message
								</label>
								<input
									id="reasonForMessage"
									name="reasonForMessage"
									className={fieldInput}
									value={formData.reasonForMessage}
									onBlur={() => handleBlur('reasonForMessage')}
									onChange={(e) => handleChange('reasonForMessage', e.target.value)}
									placeholder="Reason for message"
								/>
								{touched.reasonForMessage && errors.reasonForMessage && (
									<span className={fieldError}>{errors.reasonForMessage}</span>
								)}
							</div>

							<div className={fieldGroup}>
								<label htmlFor="additionalInfo" className={fieldLabel}>
									Additional Info
								</label>
								<textarea
									id="additionalInfo"
									name="additionalInfo"
									className={fieldTextarea}
									value={formData.additionalInfo}
									onChange={(e) => handleChange('additionalInfo', e.target.value)}
									placeholder="Additional info"
								/>
							</div>

							{(submitStatus === 'error' || serverError) && (
								<p className={errorMessage}>{serverError ?? 'Something went wrong. Please try again.'}</p>
							)}

							<button type="submit" className={submitButton} disabled={submitStatus === 'submitting'}>
								{submitStatus === 'submitting' ? 'Sending...' : 'Submit'}
							</button>
						</div>
					</form>
				)}
			</div>

			<SocialLinks />

			<BackToHome />
		</article>
	);
};
