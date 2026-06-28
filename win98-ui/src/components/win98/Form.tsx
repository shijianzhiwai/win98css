"use client";

import type { FormHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export type Win98FormProps = FormHTMLAttributes<HTMLFormElement>;

/** 表单容器：默认关闭浏览器原生校验气泡，交由组件自行报错 */
export function Win98Form({ className, noValidate = true, ...props }: Win98FormProps) {
  return <form className={cn("win98-form", className)} noValidate={noValidate} {...props} />;
}

export type Win98FormFieldProps = Omit<HTMLAttributes<HTMLDivElement>, "id"> & {
  label?: ReactNode;
  /** 关联控件 id，用于 label htmlFor */
  htmlFor?: string;
  /** 错误文案；非空即进入错误态（红框 + 红字） */
  error?: string;
  /** 必填，显示红色星号 */
  required?: boolean;
  /** 标签在上（默认）或在左 */
  stacked?: boolean;
  /** 辅助说明（无错误时显示） */
  hint?: ReactNode;
  children: ReactNode;
};

export function Win98FormField({
  label,
  htmlFor,
  error,
  required,
  stacked = true,
  hint,
  className,
  children,
  ...props
}: Win98FormFieldProps) {
  const invalid = error != null && error !== "";
  return (
    <div
      className={cn(
        "win98-form-field",
        stacked ? "field-row-stacked" : "field-row",
        invalid && "is-invalid",
        className,
      )}
      {...props}
    >
      {label != null && (
        <label htmlFor={htmlFor} className="win98-form-label">
          {required && <span className="win98-form-required" aria-hidden>* </span>}
          {label}
        </label>
      )}
      {children}
      {invalid ? (
        <span className="win98-form-error" role="alert">
          {error}
        </span>
      ) : hint != null ? (
        <span className="win98-form-hint">{hint}</span>
      ) : null}
    </div>
  );
}

export type Win98FormActionsProps = HTMLAttributes<HTMLDivElement>;

/** 表单底部操作区：按钮右对齐、等宽，可放置状态文字（marginRight:auto） */
export function Win98FormActions({ className, ...props }: Win98FormActionsProps) {
  return <div className={cn("win98-form-actions", className)} {...props} />;
}
