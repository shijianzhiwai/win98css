"use client";

import {
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";

export type Win98MenuProps = HTMLAttributes<HTMLElement> & {
  /** 菜单标题栏文字；省略则不渲染标题栏 */
  title?: string;
  children: ReactNode;
};

export function Win98Menu({ title, children, className, ...props }: Win98MenuProps) {
  return (
    <nav className={cn("menu", "card-border", className)} aria-label={title ?? "导航菜单"} {...props}>
      {title && <div className="menu-title">{title}</div>}
      <div className="menu-list">{children}</div>
    </nav>
  );
}

export type Win98MenuGroupProps = {
  label: string;
  children: ReactNode;
  /** 非受控默认展开状态 */
  defaultOpen?: boolean;
  /** 受控展开状态 */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
};

export function Win98MenuGroup({
  label,
  children,
  defaultOpen = true,
  open,
  onOpenChange,
  className,
}: Win98MenuGroupProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open != null;
  const isOpen = isControlled ? open : internalOpen;

  const toggle = () => {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div className={cn("menu-group", className)}>
      <button
        type="button"
        className="menu-group-title"
        aria-expanded={isOpen}
        onClick={toggle}
      >
        <span className="menu-group-caret" aria-hidden>
          {isOpen ? "▾" : "▸"}
        </span>
        <span className="menu-group-label">{label}</span>
      </button>
      {isOpen && <div className="menu-group-items">{children}</div>}
    </div>
  );
}

export type Win98MenuItemProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onSelect"> & {
  /** 选中（当前页）态高亮 */
  active?: boolean;
  /** 左侧图标（emoji / 字符 / 节点） */
  icon?: ReactNode;
  /** 右侧徽标（数字提示等） */
  badge?: ReactNode;
  onSelect?: () => void;
};

export function Win98MenuItem({
  active,
  icon,
  badge,
  children,
  className,
  disabled,
  onSelect,
  onClick,
  ...props
}: Win98MenuItemProps) {
  return (
    <button
      type="button"
      className={cn("menu-item", active && "is-active", className)}
      aria-current={active ? "page" : undefined}
      disabled={disabled}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) onSelect?.();
      }}
      {...props}
    >
      {icon != null && <span className="menu-item-icon" aria-hidden>{icon}</span>}
      <span className="menu-item-label">{children}</span>
      {badge != null && <span className="menu-item-badge">{badge}</span>}
    </button>
  );
}
