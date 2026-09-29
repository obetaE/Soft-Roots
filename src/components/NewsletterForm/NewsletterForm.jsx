"use client";
import { useId, useState } from "react";
import { EMAIL_PATTERN } from "@/libs/validation";
import ui from "@/components/ui/ui.module.css";
import styles from "./NewsletterForm.module.css";

const MESSAGES = {
  success: "Thanks for subscribing. Watch your inbox for updates.",
  error: "Please enter a valid email address.",
};

// Front-end only: there is no mailing-list service connected yet.
export default function NewsletterForm({ stacked = false }) {
  const id = useId();
  const [status, setStatus] = useState("idle");

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    if (!EMAIL_PATTERN.test(email)) {
      setStatus("error");
      return;
    }
    event.currentTarget.reset();
    setStatus("success");
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`${styles.form} ${stacked ? styles.stacked : ""}`}
    >
      <label htmlFor={`${id}-email`} className="visually-hidden">
        Email address
      </label>
      <div className={styles.row}>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          placeholder="Your email address"
          className={ui.input}
          aria-invalid={status === "error"}
          aria-describedby={`${id}-status`}
          onChange={() => status !== "idle" && setStatus("idle")}
        />
        <button type="submit" className={`${ui.btn} ${ui.btnPrimary}`}>
          Subscribe
        </button>
      </div>
      <p
        id={`${id}-status`}
        role="status"
        className={`${styles.status} ${status === "success" ? styles.success : styles.error}`}
      >
        {MESSAGES[status] ?? ""}
      </p>
    </form>
  );
}
