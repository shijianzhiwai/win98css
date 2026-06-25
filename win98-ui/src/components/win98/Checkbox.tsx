import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type Win98CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export const Win98Checkbox = forwardRef<HTMLInputElement, Win98CheckboxProps>(
  function Win98Checkbox({ className, ...props }, ref) {
    return (
      <label className={cn("checkbox-label", className)}>
        <input ref={ref} type="checkbox" className="checkbox-input" {...props} />
        <span className="checkbox-box" aria-hidden="true" />
      </label>
    );
  },
);
