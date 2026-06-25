import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export type Win98CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  /** 带文字标签时使用 field-row 布局（参考 98.css） */
  label?: ReactNode;
};

export const Win98Checkbox = forwardRef<HTMLInputElement, Win98CheckboxProps>(
  function Win98Checkbox({ className, label, id, ...props }, ref) {
    if (label != null) {
      return (
        <label className={cn("checkbox-field-label", className)} htmlFor={id}>
          <input ref={ref} id={id} type="checkbox" className="checkbox-input" {...props} />
          <span className="checkbox-box" aria-hidden="true" />
          <span className="checkbox-text">{label}</span>
        </label>
      );
    }

    return (
      <label className={cn("checkbox-label", className)}>
        <input ref={ref} id={id} type="checkbox" className="checkbox-input" {...props} />
        <span className="checkbox-box" aria-hidden="true" />
      </label>
    );
  },
);
