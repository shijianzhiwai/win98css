"use client";

import {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type InputHTMLAttributes,
  type KeyboardEvent,
} from "react";
import { cn } from "../../lib/cn";

export type Win98DosPromptInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  prefix?: string;
  /** AI 输出中：显示 [block]，允许输入但延迟发送 */
  blocked?: boolean;
  onSubmit?: () => void;
};

function snapCaretToEnd(input: HTMLInputElement | null) {
  if (!input) return;
  const len = input.value.length;
  input.setSelectionRange(len, len);
}

export const Win98DosPromptInput = forwardRef<HTMLInputElement, Win98DosPromptInputProps>(
  function Win98DosPromptInput(
    { prefix = "HUMAN:\\>", className, value, onChange, onSubmit, onKeyDown, disabled, blocked, ...props },
    ref,
  ) {
    const innerRef = useRef<HTMLInputElement>(null);
    const measureRef = useRef<HTMLSpanElement>(null);
    const [cursorLeft, setCursorLeft] = useState(0);

    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        innerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    const text = String(value ?? "");

    useLayoutEffect(() => {
      if (!measureRef.current) return;
      measureRef.current.textContent = text;
      setCursorLeft(measureRef.current.offsetWidth);
    }, [text]);

    const handleFocus = useCallback(() => {
      if (!disabled) snapCaretToEnd(innerRef.current);
    }, [disabled]);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (!disabled) onSubmit?.();
        }
        onKeyDown?.(e);
      },
      [disabled, onSubmit, onKeyDown],
    );

    return (
      <div className={cn("llm-dos-prompt-line", blocked && "is-blocked", className)}>
        <span className="llm-dos-prefix">{prefix}</span>
        {blocked && <span className="llm-dos-block-tag">[block]</span>}
        <span className="llm-dos-input-wrap">
          <span ref={measureRef} className="llm-dos-input-measure" aria-hidden="true" />
          <input
            ref={setRefs}
            type="text"
            value={value}
            onChange={onChange}
            className="llm-dos-input"
            onFocus={handleFocus}
            onClick={handleFocus}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            {...props}
          />
          {!disabled && (
            <span
              className="llm-dos-cursor llm-dos-cursor-prompt"
              style={{ left: `${cursorLeft}px` }}
              aria-hidden="true"
            />
          )}
        </span>
      </div>
    );
  },
);
