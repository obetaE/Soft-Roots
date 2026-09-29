"use client";
import { useState } from "react";
import FormField from "@/components/FormField/FormField";
import { simulateRequest, useForm } from "@/components/FormField/useForm";
import { EMAIL_PATTERN, required } from "@/libs/validation";
import ui from "@/components/ui/ui.module.css";
import styles from "./contact.module.css";

const INITIAL_VALUES = { name: "", email: "", subject: "", message: "" };

const RULES = {
  name: required("Full name", 100),
  email: (value) => {
    if (!value) return "Email address is required.";
    if (!EMAIL_PATTERN.test(value)) return "Enter a valid email address.";
  },
  subject: required("Subject", 150),
  message: (value) => {
    if (!value) return "Message is required.";
    if (value.length < 10) return "Message should be at least 10 characters.";
    if (value.length > 2000) return "Message must be 2000 characters or fewer.";
  },
};

export default function ContactForm() {
  const { values, errors, formRef, handleChange, validateForm, reset } = useForm(INITIAL_VALUES, RULES);
  const [status, setStatus] = useState("idle");
  const submitting = status === "submitting";

  const handleFieldChange = (event) => {
    handleChange(event);
    if (status === "success") setStatus("idle");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setStatus("submitting");
    await simulateRequest();
    reset();
    setStatus("success");
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-busy={submitting} className={styles.form}>
      <div role="status">
        {status === "success" && (
          <p className={`${ui.alert} ${ui.alertSuccess}`}>
            Your message has been sent. We’ll be in touch within 24 hours.
          </p>
        )}
      </div>

      <FormField id="contact-name" label="Full Name" required error={errors.name}>
        {(field) => (
          <input
            {...field}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={100}
            placeholder="John Doe"
            value={values.name}
            onChange={handleFieldChange}
            className={ui.input}
          />
        )}
      </FormField>

      <FormField id="contact-email" label="Email Address" required error={errors.email}>
        {(field) => (
          <input
            {...field}
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            placeholder="john@example.com"
            value={values.email}
            onChange={handleFieldChange}
            className={ui.input}
          />
        )}
      </FormField>

      <FormField id="contact-subject" label="Subject" required error={errors.subject}>
        {(field) => (
          <input
            {...field}
            name="subject"
            type="text"
            maxLength={150}
            placeholder="How can we help you?"
            value={values.subject}
            onChange={handleFieldChange}
            className={ui.input}
          />
        )}
      </FormField>

      <FormField id="contact-message" label="Message" required error={errors.message}>
        {(field) => (
          <textarea
            {...field}
            name="message"
            rows={5}
            maxLength={2000}
            placeholder="Tell us about your luxury truck needs..."
            value={values.message}
            onChange={handleFieldChange}
            className={ui.input}
          />
        )}
      </FormField>

      <button type="submit" className={`${ui.btn} ${ui.btnPrimary} ${ui.btnBlock}`} disabled={submitting}>
        {submitting ? (
          <>
            <span className={styles.spinner} aria-hidden="true" />
            Sending…
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
