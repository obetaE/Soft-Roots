export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE_PATTERN = /^[+()\d\s.-]{7,20}$/;

/**
 * Validates form values against a map of rules.
 * Each rule returns an error message or nothing.
 */
export function validate(values, rules) {
  const errors = {};
  for (const [field, check] of Object.entries(rules)) {
    const message = check(String(values[field] ?? "").trim(), values);
    if (message) errors[field] = message;
  }
  return errors;
}

export const required = (label, maxLength = 200) => (value) => {
  if (!value) return `${label} is required.`;
  if (value.length > maxLength) return `${label} must be ${maxLength} characters or fewer.`;
};
