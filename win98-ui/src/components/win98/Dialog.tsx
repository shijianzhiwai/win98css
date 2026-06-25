"use client";

import { useEffect, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Win98Button } from "./Button";

export type Win98DialogProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
};

export function Win98Dialog({
  open,
  title,
  children,
  onClose,
  onConfirm,
  cancelLabel = "取消",
  confirmLabel = "确定",
}: Win98DialogProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={cn("modal-overlay", "open")}
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal card-border" role="dialog" aria-modal="true" aria-labelledby="win98-dialog-title">
        <div className="title-bar title-bar-dialog">
          <span id="win98-dialog-title">{title}</span>
          <div className="title-bar-controls">
            <Win98Button variant="titleBar" onClick={onClose} aria-label="关闭" title="关闭">
              ✕
            </Win98Button>
          </div>
        </div>
        <div className="modal-body container-border">
          {children}
          <div className="modal-actions">
            <Win98Button onClick={onClose}>{cancelLabel}</Win98Button>
            <Win98Button onClick={onConfirm ?? onClose}>{confirmLabel}</Win98Button>
          </div>
        </div>
      </div>
    </div>
  );
}
