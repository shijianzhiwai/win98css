import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type Win98ButtonVariant =
  | "default"
  | "connect"
  | "send"
  | "minmax"
  | "sm"
  | "md"
  | "toolbar"
  | "titleBar"
  | "link";

const variantClass: Record<Win98ButtonVariant, string> = {
  default: "",
  connect: "btn-connect",
  send: "btn-send",
  minmax: "btn-minmax",
  sm: "btn-sm",
  md: "btn-md",
  toolbar: "btn-toolbar",
  titleBar: "title-bar-btn",
  link: "btn-link",
};

export type Win98ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Win98ButtonVariant;
};

export const Win98Button = forwardRef<HTMLButtonElement, Win98ButtonProps>(
  function Win98Button({ className, variant = "default", type = "button", ...props }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn("border-btn", variantClass[variant], className)}
        {...props}
      />
    );
  },
);
