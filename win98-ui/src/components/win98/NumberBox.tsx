"use client";

import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  type InputHTMLAttributes,
  type MouseEvent,
} from "react";
import { cn } from "../../lib/cn";

export type Win98NumberBoxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

function readNumericValue(input: HTMLInputElement): number {
  const parsed = Number(input.value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function writeValue(
  input: HTMLInputElement,
  next: number,
  min?: number | string,
  max?: number | string,
) {
  const minNum = min != null ? Number(min) : undefined;
  const maxNum = max != null ? Number(max) : undefined;
  let value = next;
  if (minNum != null && !Number.isNaN(minNum)) value = Math.max(value, minNum);
  if (maxNum != null && !Number.isNaN(maxNum)) value = Math.min(value, maxNum);

  const valueAsString = String(value);
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value",
  )?.set;
  nativeInputValueSetter?.call(input, valueAsString);

  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
}

export const Win98NumberBox = forwardRef<HTMLInputElement, Win98NumberBoxProps>(
  function Win98NumberBox({ className, disabled, readOnly, step = 1, min, max, ...props }, ref) {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const bump = useCallback(
      (direction: 1 | -1) => {
        const input = inputRef.current;
        if (!input || disabled || readOnly) return;
        const delta = Number(step) || 1;
        writeValue(input, readNumericValue(input) + direction * delta, min, max);
      },
      [disabled, readOnly, step, min, max],
    );

    const onSpinClick = (direction: 1 | -1) => (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      bump(direction);
    };

    return (
      <div className={cn("number-box", disabled && "is-disabled", className)}>
        <input
          ref={inputRef}
          type="number"
          className="number-box-input"
          disabled={disabled}
          readOnly={readOnly}
          step={step}
          min={min}
          max={max}
          {...props}
        />
        <div className="field-affix-column number-box-spin" aria-hidden={disabled || readOnly}>
          <button
            type="button"
            className="number-box-spin-btn"
            tabIndex={-1}
            disabled={disabled || readOnly}
            aria-label="增加"
            onClick={onSpinClick(1)}
          >
            ▲
          </button>
          <button
            type="button"
            className="number-box-spin-btn"
            tabIndex={-1}
            disabled={disabled || readOnly}
            aria-label="减少"
            onClick={onSpinClick(-1)}
          >
            ▼
          </button>
        </div>
      </div>
    );
  },
);
