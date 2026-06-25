"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";

export type Win98TypewriterProps = {
  text: string;
  active?: boolean;
  speed?: number;
  className?: string;
  onComplete?: () => void;
};

export function Win98Typewriter({
  text,
  active = true,
  speed = 32,
  className,
  onComplete,
}: Win98TypewriterProps) {
  const [length, setLength] = useState(active ? 0 : text.length);
  const completedRef = useRef(false);
  const done = !active || length >= text.length;
  const displayed = text.slice(0, length);

  useEffect(() => {
    completedRef.current = false;
    if (!active) {
      setLength(text.length);
      return;
    }
    setLength(0);
  }, [text, active]);

  useEffect(() => {
    if (!active || length < text.length) return;
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete?.();
  }, [active, length, text.length, onComplete]);

  useEffect(() => {
    if (!active || done) return;
    const timer = window.setTimeout(() => setLength((n) => n + 1), speed);
    return () => window.clearTimeout(timer);
  }, [active, done, length, speed]);

  return (
    <span className={cn("llm-typewriter", className)}>
      <span className="llm-typewriter-text">{displayed}</span>
      {active && !done && <span className="llm-dos-cursor" aria-hidden="true" />}
    </span>
  );
}
