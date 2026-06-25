"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type MouseEvent as ReactMouseEvent } from "react";
import { cn } from "../../lib/cn";
import { Win98Input } from "./Input";

export type Win98SelectOption = {
  value: string;
  label: string;
  hint?: string;
};

export type Win98SelectProps = {
  options: Win98SelectOption[];
  value?: string;
  placeholder?: string;
  searchable?: boolean;
  clearable?: boolean;
  clearLabel?: string;
  onValueChange?: (value: string | undefined) => void;
  className?: string;
};

export function Win98Select({
  options,
  value,
  placeholder = "请选择...",
  searchable = true,
  clearable = true,
  clearLabel = "清除",
  onValueChange,
  className,
}: Win98SelectProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);

  const selected = options.find((o) => o.value === value);
  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase()),
  );

  const finishClose = () => {
    setOpen(false);
    setClosing(false);
    setQuery("");
  };

  const close = () => {
    if (closing) return;
    setClosing(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishClose();
    }
  };

  const onDrawerAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.animationName === "select-drawer-out") finishClose();
  };

  const openDropdown = () => {
    setClosing(false);
    setOpen(true);
    setHighlight(showClear ? 1 : 0);
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!open) return;
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [open]);

  const pick = (opt: Win98SelectOption) => {
    onValueChange?.(opt.value);
    close();
  };

  const clearValue = (e?: ReactMouseEvent) => {
    e?.stopPropagation();
    onValueChange?.(undefined);
    close();
  };

  const showClear = clearable && value != null && value !== "";
  const optionOffset = showClear ? 1 : 0;

  const onKeyDown = (e: KeyboardEvent) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openDropdown();
      }
      return;
    }
    if (e.key === "Escape") close();
    if (e.key === "Delete" && showClear) clearValue();
    if (e.key === "ArrowDown") setHighlight((i) => Math.min(i + 1, filtered.length - 1 + optionOffset));
    if (e.key === "ArrowUp") setHighlight((i) => Math.max(i - 1, 0));
    if (e.key === "Enter") {
      if (showClear && highlight === 0) clearValue();
      else if (filtered[highlight - optionOffset]) pick(filtered[highlight - optionOffset]);
    }
  };

  return (
    <div
      ref={rootRef}
      className={cn("select-box", className)}
      tabIndex={0}
      role="combobox"
      aria-expanded={open && !closing}
      aria-controls={listId}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        e.stopPropagation();
        if (open && !closing) close();
        else openDropdown();
      }}
    >
      <span
        className="select-box-value"
        style={{ color: selected ? "var(--muted-foreground)" : undefined }}
      >
        {selected?.label ?? placeholder}
      </span>
      {showClear && (
        <button
          type="button"
          className="select-box-clear border-btn"
          title={clearLabel}
          aria-label={clearLabel}
          onClick={clearValue}
        >
          ✕
        </button>
      )}
      <span className="select-box-icon" aria-hidden>
        ▲
        <br />
        ▼
      </span>
      {open && (
        <div
          className={cn("select-dropdown-clip", open && "open", closing && "closing")}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            id={listId}
            role="listbox"
            className="select-dropdown"
            onAnimationEnd={onDrawerAnimationEnd}
          >
          {searchable && (
            <div className="select-search">
              <Win98Input
                value={query}
                placeholder="搜索..."
                onChange={(e) => {
                  setQuery(e.target.value);
                  setHighlight(0);
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          {showClear && (
            <div
              role="option"
              aria-selected={false}
              className={cn("select-option", "select-option-clear", highlight === 0 && "highlighted")}
              onMouseEnter={() => setHighlight(0)}
              onClick={clearValue}
            >
              {clearLabel}
            </div>
          )}
          {filtered.map((opt, i) => (
            <div
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className={cn("select-option", i + optionOffset === highlight && "highlighted")}
              onMouseEnter={() => setHighlight(i + optionOffset)}
              onClick={() => pick(opt)}
            >
              <span>{opt.label}</span>
              {opt.hint && <span>{opt.hint}</span>}
            </div>
          ))}
          </div>
        </div>
      )}
    </div>
  );
}
