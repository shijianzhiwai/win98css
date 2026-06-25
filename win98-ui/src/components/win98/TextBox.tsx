import { forwardRef, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Win98NumberBox } from "./NumberBox";

export type Win98TextBoxType =
  | "text"
  | "password"
  | "email"
  | "search"
  | "tel"
  | "url"
  | "number";

export type Win98TextBoxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  /** 标签文字；配合 field-row / field-row-stacked 布局（参考 98.css TextBox） */
  label?: ReactNode;
  /** true：标签在上；false：标签在左 */
  stacked?: boolean;
  type?: Win98TextBoxType;
};

export type Win98TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: ReactNode;
  stacked?: boolean;
};

function TextBoxField({
  label,
  stacked,
  htmlFor,
  children,
  className,
}: {
  label: ReactNode;
  stacked?: boolean;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("textbox-field", stacked ? "field-row-stacked" : "field-row", className)}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
}

export const Win98TextBox = forwardRef<HTMLInputElement, Win98TextBoxProps>(
  function Win98TextBox({ className, label, stacked, id, type = "text", ...props }, ref) {
    const input =
      type === "number" ? (
        <Win98NumberBox ref={ref} id={id} className={className} {...props} />
      ) : (
        <input
          ref={ref}
          id={id}
          type={type}
          className={cn("border-inverted", "textbox-input", className)}
          {...props}
        />
      );

    if (label == null) return input;

    return (
      <TextBoxField label={label} stacked={stacked} htmlFor={id}>
        {input}
      </TextBoxField>
    );
  },
);

export const Win98TextArea = forwardRef<HTMLTextAreaElement, Win98TextAreaProps>(
  function Win98TextArea({ className, label, stacked, id, rows = 6, ...props }, ref) {
    const textarea = (
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        className={cn("border-inverted", "textbox-textarea", className)}
        {...props}
      />
    );

    if (label == null) return textarea;

    return (
      <TextBoxField label={label} stacked={stacked ?? true} htmlFor={id}>
        {textarea}
      </TextBoxField>
    );
  },
);
