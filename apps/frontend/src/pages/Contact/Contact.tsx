import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { BackToHome } from '@/components/BackToHome/BackToHome.tsx';
import { SocialLinks } from '@/components/SocialLinks/SocialLinks.tsx';
import { type ContactFormInput, type ContactResponse, contactFormSchema } from '@/server/contact/schema.ts';
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

const initialFormData: ContactFormInput = {
	firstName: '',
	lastName: '',
	email: '',
	reasonForMessage: '',
	additionalInfo: '',
};

type ContactFormErrors = Partial<Record<keyof ContactFormInput, string>>;

function normalizeFormValues(value: ContactFormInput): ContactFormInput {
	return {
		firstName: value.firstName.trim(),
		lastName: value.lastName.trim(),
		email: value.email.trim(),
		reasonForMessage: value.reasonForMessage.trim(),
		additionalInfo: value.additionalInfo.trim(),
	};
}

function validateContactForm(value: ContactFormInput): { fields: ContactFormErrors } | undefined {
	const result = contactFormSchema.safeParse(normalizeFormValues(value));
	if (result.success) {
		return undefined;
	}

	const fields: ContactFormErrors = {};
	for (const issue of result.error.issues) {
		const field = issue.path[0];
		if (typeof field === 'string' && field in initialFormData && !fields[field as keyof ContactFormInput]) {
			fields[field as keyof ContactFormInput] = issue.message;
		}
	}
	if (!value.email.trim()) {
		fields.email = 'Email is required';
	}

	return { fields };
}

function getFieldError(errors: unknown[]): string | undefined {
	for (const error of errors) {
		if (typeof error === 'string') {
			return error;
		}
		if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
			return error.message;
		}
	}
}

function getServerFieldErrors(fieldErrors: Record<string, string> | undefined): ContactFormErrors {
	const fields: ContactFormErrors = {};
	for (const [field, error] of Object.entries(fieldErrors ?? {})) {
		if (field in initialFormData) {
			fields[field as keyof ContactFormInput] = error;
		}
	}
	return fields;
}

export const ContactPage = () => {
	const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
	const [serverError, setServerError] = useState<string | null>(null);

	const form = useForm({
		defaultValues: initialFormData,
		validators: {
			onChange: ({ value }) => validateContactForm(value),
		},
		onSubmit: async ({ value, formApi }) => {
			setServerError(null);
			setSubmitStatus('submitting');

			try {
				const response = await fetch('/api/contact', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					body: JSON.stringify(normalizeFormValues(value)),
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
					formApi.reset();
					return;
				}

				formApi.setErrorMap({
					onChange: {
						form: data.error,
						fields: getServerFieldErrors(data.fieldErrors),
					},
				});
				setSubmitStatus('error');
				setServerError(data.error || 'Something went wrong. Please try again.');
			} catch {
				setSubmitStatus('error');
				setServerError('Something went wrong. Please try again.');
			}
		},
	});

	const validateOnBlur = (handleBlur: () => void) => {
		handleBlur();
		void form.validate('change');
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
					<form
						onSubmit={(event) => {
							event.preventDefault();
							event.stopPropagation();
							void form.handleSubmit();
						}}
						noValidate
					>
						<div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
							<form.Field name="firstName">
								{(field) => {
									const error = getFieldError(field.state.meta.errors);
									return (
										<div className={fieldGroup}>
											<label htmlFor="firstName" className={fieldLabel}>
												First Name
											</label>
											<input
												id="firstName"
												name="firstName"
												className={fieldInput}
												value={field.state.value}
												onBlur={() => validateOnBlur(field.handleBlur)}
												onChange={(event) => field.handleChange(event.target.value)}
												placeholder="First name"
												autoComplete="given-name"
											/>
											{field.state.meta.isTouched && error && <span className={fieldError}>{error}</span>}
										</div>
									);
								}}
							</form.Field>

							<form.Field name="lastName">
								{(field) => {
									const error = getFieldError(field.state.meta.errors);
									return (
										<div className={fieldGroup}>
											<label htmlFor="lastName" className={fieldLabel}>
												Last Name
											</label>
											<input
												id="lastName"
												name="lastName"
												className={fieldInput}
												value={field.state.value}
												onBlur={() => validateOnBlur(field.handleBlur)}
												onChange={(event) => field.handleChange(event.target.value)}
												placeholder="Last name"
												autoComplete="family-name"
											/>
											{field.state.meta.isTouched && error && <span className={fieldError}>{error}</span>}
										</div>
									);
								}}
							</form.Field>

							<form.Field name="email">
								{(field) => {
									const error = getFieldError(field.state.meta.errors);
									return (
										<div className={fieldGroup}>
											<label htmlFor="email" className={fieldLabel}>
												Email
											</label>
											<input
												id="email"
												name="email"
												type="email"
												className={fieldInput}
												value={field.state.value}
												onBlur={() => validateOnBlur(field.handleBlur)}
												onChange={(event) => field.handleChange(event.target.value)}
												placeholder="you@example.com"
												autoComplete="email"
											/>
											{field.state.meta.isTouched && error && <span className={fieldError}>{error}</span>}
										</div>
									);
								}}
							</form.Field>

							<form.Field name="reasonForMessage">
								{(field) => {
									const error = getFieldError(field.state.meta.errors);
									return (
										<div className={fieldGroup}>
											<label htmlFor="reasonForMessage" className={fieldLabel}>
												Reason For Message
											</label>
											<input
												id="reasonForMessage"
												name="reasonForMessage"
												className={fieldInput}
												value={field.state.value}
												onBlur={() => validateOnBlur(field.handleBlur)}
												onChange={(event) => field.handleChange(event.target.value)}
												placeholder="Reason for message"
											/>
											{field.state.meta.isTouched && error && <span className={fieldError}>{error}</span>}
										</div>
									);
								}}
							</form.Field>

							<form.Field name="additionalInfo">
								{(field) => (
									<div className={fieldGroup}>
										<label htmlFor="additionalInfo" className={fieldLabel}>
											Additional Info
										</label>
										<textarea
											id="additionalInfo"
											name="additionalInfo"
											className={fieldTextarea}
											value={field.state.value}
											onBlur={() => validateOnBlur(field.handleBlur)}
											onChange={(event) => field.handleChange(event.target.value)}
											placeholder="Additional info"
										/>
									</div>
								)}
							</form.Field>

							{(submitStatus === 'error' || serverError) && (
								<p className={errorMessage}>{serverError ?? 'Something went wrong. Please try again.'}</p>
							)}

							<form.Subscribe selector={(state) => state.isSubmitting}>
								{(isSubmitting) => (
									<button type="submit" className={submitButton} disabled={isSubmitting}>
										{isSubmitting ? 'Sending...' : 'Submit'}
									</button>
								)}
							</form.Subscribe>
						</div>
					</form>
				)}
			</div>

			<SocialLinks />

			<BackToHome />
		</article>
	);
};
