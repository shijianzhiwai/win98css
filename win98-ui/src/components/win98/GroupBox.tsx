import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export type Win98GroupBoxProps = HTMLAttributes<HTMLDivElement> & {
  label: string;
  children: ReactNode;
};

export function Win98GroupBox({ label, children, className, ...props }: Win98GroupBoxProps) {
  return (
    <div className={cn("group-box", className)} {...props}>
      <span className="group-box-label">{label}</span>
      {children}
    </div>
  );
}
