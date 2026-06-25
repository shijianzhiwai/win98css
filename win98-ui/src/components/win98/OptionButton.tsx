import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export type Win98OptionButtonProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: ReactNode;
};

export const Win98OptionButton = forwardRef<HTMLInputElement, Win98OptionButtonProps>(
  function Win98OptionButton({ className, label, id, ...props }, ref) {
    return (
      <label className={cn("option-button-label", className)} htmlFor={id}>
        <input ref={ref} id={id} type="radio" className="option-button-input" {...props} />
        <span className="option-button-box" aria-hidden="true" />
        <span className="option-button-text">{label}</span>
      </label>
    );
  },
);
