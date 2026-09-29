import ui from "@/components/ui/ui.module.css";

/**
 * Label, control and error message wired together for accessibility.
 * `children` is a render function that receives the props to spread onto the control.
 */
export default function FormField({ id, label, error, required = false, className = "", children }) {
  const errorId = `${id}-error`;

  return (
    <div className={`${ui.field} ${className}`}>
      <label htmlFor={id} className={ui.label}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
        "aria-required": required || undefined,
      })}
      {error && (
        <p id={errorId} className={ui.fieldError}>
          {error}
        </p>
      )}
    </div>
  );
}
