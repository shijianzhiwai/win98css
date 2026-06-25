import type { FieldsetHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export type Win98GroupBoxProps = FieldsetHTMLAttributes<HTMLFieldSetElement> & {
  label: string;
  children: ReactNode;
};

export function Win98GroupBox({ label, children, className, ...props }: Win98GroupBoxProps) {
  return (
    <fieldset className={cn("group-box", className)} {...props}>
      <legend className="group-box-label">{label}</legend>
      {children}
    </fieldset>
  );
}
