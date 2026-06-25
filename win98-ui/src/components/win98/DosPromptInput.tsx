"use client";

import {
  forwardRef,
  useLayoutEffect,
  useRef,
  useState,
  type InputHTMLAttributes,
  type KeyboardEvent,
} from "react";
import { cn } from "../../lib/cn";

export type Win98DosPromptInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  prefix?: string;
  onSubmit?: () => void;
};

export const Win98DosPromptInput = forwardRef<HTMLInputElement, Win98DosPromptInputProps>(
  function Win98DosPromptInput(
    { prefix = "HUMAN:\\>", className, value, onChange, onSubmit, onKeyDown, disabled, ...props },
    ref,
  ) {
    const innerRef = useRef<HTMLInputElement>(null);
    const measureRef = useRef<HTMLSpanElement>(null);
    const [inputWidth, setInputWidth] = useState(0);

    const setRefs = (node: HTMLInputElement | null) => {
      innerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    const text = String(value ?? "");

    useLayoutEffect(() => {
      if (measureRef.current) {
        measureRef.current.textContent = text;
        setInputWidth(measureRef.current.offsetWidth);
      }
    }, [text]);

    return (
      <div
        className={cn("llm-dos-prompt-line", className)}
        onClick={() => {
          if (!disabled) innerRef.current?.focus();
        }}
      >
        <span className="llm-dos-prefix">{prefix}</span>
        <span className="llm-dos-input-wrap">
          <span ref={measureRef} className="llm-dos-input-measure" aria-hidden="true" />
          <input
            ref={setRefs}
            type="text"
            value={value}
            onChange={onChange}
            className="llm-dos-input"
            style={{ width: inputWidth > 0 ? `${inputWidth}px` : "0.01em" }}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (!disabled) onSubmit?.();
              }
              onKeyDown?.(e);
            }}
            disabled={disabled}
            {...props}
          />
          <span className="llm-dos-cursor llm-dos-cursor-inline" aria-hidden="true" />
        </span>
      </div>
    );
  },
);
