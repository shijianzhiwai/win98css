import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, ThHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export function Win98Table({ className, ...props }: HTMLAttributes<HTMLTableElement>) {
  return <table className={cn("data-table", className)} {...props} />;
}

export function Win98TableWrap({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("table-wrap", className)} {...props}>
      {children}
    </div>
  );
}

export type Win98TableHeaderCellProps = ThHTMLAttributes<HTMLTableCellElement> & {
  align?: "left" | "center";
  empty?: boolean;
};

export function Win98TableHeaderCell({
  children,
  className,
  align = "left",
  empty,
  ...props
}: Win98TableHeaderCellProps) {
  return (
    <th
      className={cn(
        align === "center" && "col-action",
        empty && "col-check",
        !empty && align === "left" && "col-chain",
        className,
      )}
      scope="col"
      {...props}
    >
      <button
        type="button"
        className={cn(
          "col-header",
          align === "center" && "is-center",
          empty && "is-empty",
        )}
      >
        {children}
      </button>
    </th>
  );
}

export type Win98ColHeaderProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  align?: "left" | "center";
  empty?: boolean;
};

export function Win98ColHeader({ className, align, empty, ...props }: Win98ColHeaderProps) {
  return (
    <button
      type="button"
      className={cn(
        "col-header",
        align === "center" && "is-center",
        empty && "is-empty",
        className,
      )}
      {...props}
    />
  );
}

export function Win98Badge({ children, className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn("badge-hot", className)} {...props}>
      {children}
    </span>
  );
}

export type Win98DesktopProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Win98Desktop({ children, className, ...props }: Win98DesktopProps) {
  return (
    <div className={cn("desktop-grid", className)} {...props}>
      {children}
    </div>
  );
}
