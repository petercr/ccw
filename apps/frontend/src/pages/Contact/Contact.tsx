import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  backHomeButton,
  backHomeCard,
  backHomeTitle,
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
  socialCard,
  socialIcons,
  socialLink,
  socialTitle,
  submitButton,
  successMessage,
} from "./Contact.css.ts";

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface FormData {
  firstName: string;
  lastName: string;
  reasonForMessage: string;
  additionalInfo: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  reasonForMessage?: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  reasonForMessage: "",
  additionalInfo: "",
};

export const ContactPage = () => {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (
    name: keyof FormData,
    value: string,
  ): string | undefined => {
    if (name === "firstName" && value.trim().length === 0) {
      return "First name is required";
    }
    if (name === "lastName" && value.trim().length === 0) {
      return "Last name is required";
    }
    if (name === "reasonForMessage" && value.trim().length === 0) {
      return "Reason for message is required";
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

    const newErrors: FormErrors = {
      firstName: validateField("firstName", formData.firstName),
      lastName: validateField("lastName", formData.lastName),
      reasonForMessage: validateField(
        "reasonForMessage",
        formData.reasonForMessage,
      ),
    };
    setErrors(newErrors);
    setTouched({ firstName: true, lastName: true, reasonForMessage: true });

    if (
      newErrors.firstName ||
      newErrors.lastName ||
      newErrors.reasonForMessage
    ) {
      return;
    }

    setSubmitStatus("submitting");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: `${formData.firstName} ${formData.lastName}`,
          subject: formData.reasonForMessage,
          message: formData.additionalInfo,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setSubmitStatus("success");
        setFormData(initialFormData);
        setTouched({});
        setErrors({});
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }
  };

  return (
    <article className={container}>
      <header className={headerPill}>
        <h1 className={headerTitle}>Contact</h1>
      </header>

      <div className={formCard}>
        <h2 className={formTitle}>Contact Form</h2>

        {submitStatus === "success" ? (
          <p className={successMessage}>
            Thanks! Your message has been sent. We'll be in touch soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className={fieldGroup}>
                <label htmlFor="firstName" className={fieldLabel}>
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  className={fieldInput}
                  value={formData.firstName}
                  onBlur={() => handleBlur("firstName")}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  placeholder="First name"
                />
                {touched.firstName && errors.firstName && (
                  <span className={fieldError}>{errors.firstName}</span>
                )}
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
                  onBlur={() => handleBlur("lastName")}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  placeholder="Last name"
                />
                {touched.lastName && errors.lastName && (
                  <span className={fieldError}>{errors.lastName}</span>
                )}
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
                  onBlur={() => handleBlur("reasonForMessage")}
                  onChange={(e) =>
                    handleChange("reasonForMessage", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleChange("additionalInfo", e.target.value)
                  }
                  placeholder="Additional info"
                />
              </div>

              {submitStatus === "error" && (
                <p className={errorMessage}>
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                className={submitButton}
                disabled={submitStatus === "submitting"}
              >
                {submitStatus === "submitting" ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>

      <div className={socialCard}>
        <p className={socialTitle}>Social Links</p>
        <div className={socialIcons}>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className={socialLink}
          >
            <svg
              role="img"
              aria-label="Twitter"
              width="40"
              height="28"
              viewBox="0 0 40 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40 3.31C38.53 3.97 36.95 4.41 35.29 4.62C36.99 3.59 38.28 1.97 38.88 0.05C37.28 1.01 35.5 1.69 33.61 2.06C32.1 0.45 29.97 -0.44 27.69 0.02C23.6 0.82 20.8 4.73 21.6 8.82C14.12 8.44 7.49 4.95 3.05 -0.01C0.72 3.99 1.93 9.16 5.87 11.73C4.54 11.69 3.29 11.33 2.19 10.73C2.15 14.86 5.08 18.71 9.29 19.52C8.11 19.84 6.82 19.91 5.51 19.66C6.63 23.22 9.94 25.82 13.87 25.89C10.5 28.54 6.26 29.7 2 29.22C6.01 31.82 10.77 33.33 15.87 33.33C28.02 33.33 34.94 22.96 34.51 13.59C35.93 12.62 37.17 11.39 38.15 9.97C36.76 10.58 35.26 10.99 33.69 11.17C35.31 10.22 36.55 8.71 37.12 6.91C35.6 7.79 33.93 8.43 32.16 8.77C30.71 7.22 28.67 6.27 26.42 6.27C22.08 6.27 18.56 9.79 18.56 14.13C18.56 14.78 18.63 15.41 18.77 16.02C12.26 15.69 6.49 12.56 2.65 7.79C1.94 9.01 1.53 10.43 1.53 11.94C1.53 14.81 2.97 17.35 5.18 18.84C3.97 18.8 2.83 18.46 1.84 17.9V17.99C1.84 21.78 4.55 24.94 8.17 25.7C7.47 25.89 6.73 25.99 5.97 25.99C5.43 25.99 4.91 25.94 4.4 25.84C5.46 28.96 8.37 31.23 11.83 31.29C9.14 33.39 5.76 34.64 2.08 34.64C1.42 34.64 0.77 34.6 0.13 34.53C3.63 36.75 7.78 38.04 12.23 38.04C26.41 38.04 34.17 26.12 34.17 15.76C34.17 15.42 34.16 15.09 34.15 14.76C35.67 13.67 36.99 12.3 38.04 10.75L40 3.31Z"
                fill="#61b2e4"
              />
            </svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={socialLink}
          >
            <svg
              role="img"
              aria-label="Facebook"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="8" fill="#61b2e4" />
              <path
                d="M26 8H22C19.79 8 18 9.79 18 12V16H14V20H18V32H22V20H26L27 16H22V12C22 11.45 22.45 11 23 11H26V8Z"
                fill="white"
              />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={socialLink}
            style={{
              borderRadius: 14,
              background:
                "linear-gradient(135deg, rgba(226,9,244,0.49) 0%, #fed766 100%)",
            }}
          >
            <svg
              role="img"
              aria-label="Instagram"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                fill="#61b2e4"
              />
            </svg>
          </a>
          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
            className={socialLink}
          >
            <svg
              role="img"
              aria-label="Pinterest"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"
                fill="#cb1f27"
              />
            </svg>
          </a>
        </div>
      </div>

      <div className={backHomeCard}>
        <p className={backHomeTitle}>Back To Home</p>
        <Link to="/" className={backHomeButton}>
          Let's Go!
        </Link>
      </div>
    </article>
  );
};
