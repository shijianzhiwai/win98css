import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export type Win98WindowProps = HTMLAttributes<HTMLElement> & {
  title: string;
  children: ReactNode;
  fullWidth?: boolean;
};

export function Win98Window({
  title,
  children,
  className,
  fullWidth,
  ...props
}: Win98WindowProps) {
  return (
    <section className={cn("window", "card-border", fullWidth && "font-preview-window", className)} {...props}>
      <div className="title-bar">{title}</div>
      <div className="window-body container-border">{children}</div>
    </section>
  );
}
