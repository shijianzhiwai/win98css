import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type Win98InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Win98Input = forwardRef<HTMLInputElement, Win98InputProps>(
  function Win98Input({ className, ...props }, ref) {
    return <input ref={ref} className={cn("border-inverted", className)} {...props} />;
  },
);
