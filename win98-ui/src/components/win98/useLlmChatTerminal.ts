"use client";

import { useCallback, useEffect, useRef, type MouseEvent } from "react";

const STICK_TO_BOTTOM_PX = 48;
const DRAG_THRESHOLD_PX = 4;

function hasTextSelection() {
  const sel = window.getSelection();
  return sel != null && sel.toString().length > 0;
}

type UseLlmChatTerminalOptions = {
  loading: boolean;
  blocked: boolean;
  focusEnabled: boolean;
  scrollDeps: unknown[];
};

export function useLlmChatTerminal({
  loading,
  blocked,
  focusEnabled,
  scrollDeps,
}: UseLlmChatTerminalOptions) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const stickToBottomRef = useRef(true);
  const prevLoadingRef = useRef(loading);
  const prevBlockedRef = useRef(blocked);
  const pointerRef = useRef({ active: false, moved: false, x: 0, y: 0 });

  const isInputFocused = useCallback(() => {
    const input = inputRef.current;
    return input != null && document.activeElement === input;
  }, []);

  const focusInputAtEnd = useCallback(() => {
    const input = inputRef.current;
    if (!input || loading) return;
    input.focus();
    const len = input.value.length;
    input.setSelectionRange(len, len);
  }, [loading]);

  const scrollToBottomIfNeeded = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !stickToBottomRef.current) return;
    if (isInputFocused()) return;
    if (hasTextSelection()) return;
    el.scrollTop = el.scrollHeight;
  }, [isInputFocused]);

  useEffect(() => {
    const el = scrollRef.current;
    const content = contentRef.current;
    if (!el || !content) return;

    const onScroll = () => {
      const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
      stickToBottomRef.current = distance <= STICK_TO_BOTTOM_PX;
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const ro = new ResizeObserver(scrollToBottomIfNeeded);
    ro.observe(content);

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [scrollToBottomIfNeeded]);

  useEffect(() => {
    scrollToBottomIfNeeded();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- explicit scroll triggers
  }, scrollDeps);

  useEffect(() => {
    if (prevLoadingRef.current && !loading && focusEnabled) {
      focusInputAtEnd();
    }
    prevLoadingRef.current = loading;
  }, [loading, focusEnabled, focusInputAtEnd]);

  useEffect(() => {
    if (prevBlockedRef.current && !blocked && !loading && focusEnabled) {
      focusInputAtEnd();
    }
    prevBlockedRef.current = blocked;
  }, [blocked, loading, focusEnabled, focusInputAtEnd]);

  const onTerminalMouseDown = useCallback(
    (e: MouseEvent) => {
      if (loading) return;
      pointerRef.current = { active: true, moved: false, x: e.clientX, y: e.clientY };
    },
    [loading],
  );

  const onTerminalMouseMove = useCallback((e: MouseEvent) => {
    if (!pointerRef.current.active) return;
    const dx = Math.abs(e.clientX - pointerRef.current.x);
    const dy = Math.abs(e.clientY - pointerRef.current.y);
    if (dx > DRAG_THRESHOLD_PX || dy > DRAG_THRESHOLD_PX) {
      pointerRef.current.moved = true;
    }
  }, []);

  const onTerminalMouseUp = useCallback(
    (e: MouseEvent) => {
      const ptr = pointerRef.current;
      pointerRef.current.active = false;
      if (!focusEnabled || loading) return;
      if (ptr.moved || hasTextSelection() || isInputFocused()) return;
      if ((e.target as HTMLElement).tagName !== "INPUT") {
        e.preventDefault();
      }
      focusInputAtEnd();
    },
    [focusEnabled, loading, isInputFocused, focusInputAtEnd],
  );

  const terminalPointerHandlers = focusEnabled
    ? {
        onMouseDown: onTerminalMouseDown,
        onMouseMove: onTerminalMouseMove,
        onMouseUp: onTerminalMouseUp,
      }
    : {};

  return {
    scrollRef,
    contentRef,
    inputRef,
    terminalPointerHandlers,
  };
}
