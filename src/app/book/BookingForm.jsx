"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import FormField from "@/components/FormField/FormField";
import { simulateRequest, useForm } from "@/components/FormField/useForm";
import { EMAIL_PATTERN, PHONE_PATTERN, required } from "@/libs/validation";
import ui from "@/components/ui/ui.module.css";
import styles from "./book.module.css";

const LOCATIONS = [
  { value: "detroit", label: "Detroit, MI" },
  { value: "new-york", label: "New York, NY" },
  { value: "los-angeles", label: "Los Angeles, CA" },
  { value: "chicago", label: "Chicago, IL" },
  { value: "miami", label: "Miami, FL" },
];

const MODELS = ["Fjord F-100 Heritage", "Voyota Halux Overland", "My saved 3D build", "Not sure yet — recommend one"];

const TIMES = [
  { value: "morning", label: "Morning (9AM–12PM)" },
  { value: "afternoon", label: "Afternoon (1PM–4PM)" },
  { value: "evening", label: "Evening (5PM–8PM)" },
];

const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  model: MODELS[0],
  preferredDate: "",
  preferredTime: "",
  message: "",
};

// Local calendar date as YYYY-MM-DD, `days` from today.
const dateFromToday = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
};

const RULES = {
  firstName: required("First name", 50),
  lastName: required("Last name", 50),
  email: (value) => {
    if (!value) return "Email is required.";
    if (!EMAIL_PATTERN.test(value)) return "Enter a valid email address.";
  },
  phone: (value) => {
    if (!value) return "Phone number is required.";
    if (!PHONE_PATTERN.test(value)) return "Enter a valid phone number.";
  },
  location: required("Preferred location"),
  model: (value) => (MODELS.includes(value) ? undefined : "Choose a model."),
  preferredDate: (value) => {
    if (!value) return "Choose a preferred date.";
    if (value < dateFromToday(1)) return "Choose a date from tomorrow onward.";
    if (value > dateFromToday(180)) return "Choose a date within the next six months.";
  },
  preferredTime: required("Preferred time"),
  message: (value) => (value.length > 1000 ? "Special requests must be 1000 characters or fewer." : undefined),
};

const subscribeNoop = () => () => {};

export default function BookingForm() {
  const { values, errors, formRef, handleChange, validateForm, reset } = useForm(INITIAL_VALUES, RULES);
  const [status, setStatus] = useState("idle");
  const [reference, setReference] = useState("");
  const successRef = useRef(null);

  // Date limits depend on the visitor's clock, so they are only set on the client.
  const minDate = useSyncExternalStore(subscribeNoop, () => dateFromToday(1), () => undefined);
  const maxDate = useSyncExternalStore(subscribeNoop, () => dateFromToday(180), () => undefined);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setStatus("submitting");
    await simulateRequest();
    const code = crypto.getRandomValues(new Uint32Array(1))[0] % 1_000_000;
    setReference(`SR-${String(code).padStart(6, "0")}`);
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className={`${ui.card} ${styles.success}`}>
        <h3 ref={successRef} tabIndex={-1}>
          Your Test Drive Request Is In!
        </h3>
        <p>
          Thank you, {values.firstName}. A Soft Roots Luxury Consultant will contact you shortly to confirm details and
          answer any questions.
        </p>
        <p className={styles.reference}>Reference: {reference}</p>
        <button
          type="button"
          className={`${ui.btn} ${ui.btnOutline}`}
          onClick={() => {
            reset();
            setStatus("idle");
          }}
        >
          Book Another Test Drive
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-busy={submitting}
      className={`${ui.card} ${styles.form}`}
    >
      <p className={styles.requiredNote}>Fields marked * are required.</p>

      <div className={styles.formGrid}>
        <FormField id="booking-firstName" label="First Name" required error={errors.firstName}>
          {(field) => (
            <input
              {...field}
              name="firstName"
              type="text"
              autoComplete="given-name"
              maxLength={50}
              placeholder="John"
              value={values.firstName}
              onChange={handleChange}
              className={ui.input}
            />
          )}
        </FormField>

        <FormField id="booking-lastName" label="Last Name" required error={errors.lastName}>
          {(field) => (
            <input
              {...field}
              name="lastName"
              type="text"
              autoComplete="family-name"
              maxLength={50}
              placeholder="Doe"
              value={values.lastName}
              onChange={handleChange}
              className={ui.input}
            />
          )}
        </FormField>

        <FormField id="booking-email" label="Email" required error={errors.email}>
          {(field) => (
            <input
              {...field}
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              placeholder="john@example.com"
              value={values.email}
              onChange={handleChange}
              className={ui.input}
            />
          )}
        </FormField>

        <FormField id="booking-phone" label="Phone" required error={errors.phone}>
          {(field) => (
            <input
              {...field}
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={20}
              placeholder="(123) 456-7890"
              value={values.phone}
              onChange={handleChange}
              className={ui.input}
            />
          )}
        </FormField>

        <FormField id="booking-location" label="Preferred Location" required error={errors.location}>
          {(field) => (
            <select {...field} name="location" value={values.location} onChange={handleChange} className={ui.input}>
              <option value="">Select a location</option>
              {LOCATIONS.map((location) => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </select>
          )}
        </FormField>

        <FormField id="booking-model" label="Model Preference" required error={errors.model}>
          {(field) => (
            <select {...field} name="model" value={values.model} onChange={handleChange} className={ui.input}>
              {MODELS.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          )}
        </FormField>

        <FormField id="booking-preferredDate" label="Preferred Date" required error={errors.preferredDate}>
          {(field) => (
            <input
              {...field}
              name="preferredDate"
              type="date"
              min={minDate}
              max={maxDate}
              value={values.preferredDate}
              onChange={handleChange}
              className={ui.input}
            />
          )}
        </FormField>

        <FormField id="booking-preferredTime" label="Preferred Time" required error={errors.preferredTime}>
          {(field) => (
            <select
              {...field}
              name="preferredTime"
              value={values.preferredTime}
              onChange={handleChange}
              className={ui.input}
            >
              <option value="">Select a time</option>
              {TIMES.map((time) => (
                <option key={time.value} value={time.value}>
                  {time.label}
                </option>
              ))}
            </select>
          )}
        </FormField>
      </div>

      <FormField id="booking-message" label="Special Requests" error={errors.message} className={styles.message}>
        {(field) => (
          <textarea
            {...field}
            name="message"
            rows={4}
            maxLength={1000}
            placeholder="Any specific requests or questions about the test drive..."
            value={values.message}
            onChange={handleChange}
            className={ui.input}
          />
        )}
      </FormField>

      <button type="submit" className={`${ui.btn} ${ui.btnPrimary} ${ui.btnBlock}`} disabled={submitting}>
        {submitting ? "Processing…" : "Book Test Drive"}
      </button>
    </form>
  );
}
