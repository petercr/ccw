import { useState } from "react";
import { BackToHome } from "@/components/BackToHome/BackToHome.tsx";
import { SocialLinks } from "@/components/SocialLinks/SocialLinks.tsx";
import {
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
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
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

      <SocialLinks />

      <BackToHome />
    </article>
  );
};
