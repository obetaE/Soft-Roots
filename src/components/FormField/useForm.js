"use client";
import { useRef, useState } from "react";
import { validate } from "@/libs/validation";

// Stand-in for a network request until the forms are connected to a backend.
export const simulateRequest = (ms = 1200) => new Promise((resolve) => setTimeout(resolve, ms));

export function useForm(initialValues, rules) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => {
      if (!previous[name]) return previous;
      const next = { ...previous };
      delete next[name];
      return next;
    });
  };

  /** Returns true when valid; otherwise shows errors and focuses the first invalid field. */
  const validateForm = () => {
    const found = validate(values, rules);
    setErrors(found);
    const firstInvalid = Object.keys(rules).find((field) => found[field]);
    if (firstInvalid) formRef.current?.elements.namedItem(firstInvalid)?.focus();
    return !firstInvalid;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, errors, formRef, handleChange, validateForm, reset };
}
