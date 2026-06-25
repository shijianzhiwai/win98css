import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export type Win98FieldRowProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  stacked?: boolean;
};

export function Win98FieldRow({ children, className, stacked, ...props }: Win98FieldRowProps) {
  return (
    <div className={cn(stacked ? "field-row-stacked" : "field-row", className)} {...props}>
      {children}
    </div>
  );
}
