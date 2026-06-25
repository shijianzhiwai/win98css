"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Win98DosPromptInput } from "./DosPromptInput";
import { Win98Typewriter } from "./Typewriter";

export type Win98LlmMessageRole = "user" | "assistant";

export type Win98LlmMessage = {
  id: string;
  role: Win98LlmMessageRole;
  content: string;
};

export type Win98LlmChatProps = {
  messages: Win98LlmMessage[];
  /** 正在打字机输出的助手消息 id */
  typingMessageId?: string | null;
  typewriterSpeed?: number;
  onTypewriterComplete?: (messageId: string) => void;
  /** 用户输入行前缀，默认 HUMAN:\> */
  userPrefix?: string;
  /** 助手输出行前缀，默认 ROBOT:\> */
  assistantPrefix?: string;
  inputValue?: string;
  onInputChange?: (value: string) => void;
  onSend?: () => void;
  inputPlaceholder?: string;
  /** 等待 LLM 响应时显示 ROBOT 加载行并禁用输入 */
  loading?: boolean;
  header?: ReactNode;
  className?: string;
  /** 自定义底部输入区；不传则使用内置 DOS 输入行 */
  children?: ReactNode;
};

function Win98LlmMessageRow({
  message,
  typing,
  typewriterSpeed,
  onTypewriterComplete,
  userPrefix,
  assistantPrefix,
}: {
  message: Win98LlmMessage;
  typing: boolean;
  typewriterSpeed: number;
  onTypewriterComplete?: () => void;
  userPrefix: string;
  assistantPrefix: string;
}) {
  if (message.role === "user") {
    return (
      <div className="llm-dos-line is-user">
        <span className="llm-dos-prefix">{userPrefix}</span>
        <span className="llm-dos-user-text">{message.content}</span>
      </div>
    );
  }

  return (
    <div className="llm-dos-line is-assistant">
      <span className="llm-dos-prefix">{assistantPrefix}</span>
      <Win98Typewriter
        text={message.content}
        active={typing}
        speed={typewriterSpeed}
        onComplete={onTypewriterComplete}
      />
    </div>
  );
}

export function Win98LlmChat({
  messages,
  typingMessageId = null,
  typewriterSpeed = 32,
  onTypewriterComplete,
  userPrefix = "HUMAN:\\>",
  assistantPrefix = "ROBOT:\\>",
  inputValue,
  onInputChange,
  onSend,
  inputPlaceholder,
  loading = false,
  header,
  className,
  children,
}: Win98LlmChatProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, typingMessageId, inputValue, loading]);

  const showBuiltinComposer =
    children == null && inputValue != null && onInputChange != null && onSend != null;

  const handleSubmit = () => {
    if (loading) return;
    onSend?.();
  };

  return (
    <div className={cn("llm-dos-terminal", className)}>
      <div
        ref={scrollRef}
        className="llm-dos-screen"
        role="log"
        aria-live="polite"
        aria-relevant="additions text"
        onClick={() => {
          if (!loading) inputRef.current?.focus();
        }}
      >
        {header ?? (
          <div className="llm-dos-header">
            <div>Microsoft(R) Win98 LLM Shell</div>
            <div>(C) Win98 UI Corp. All rights reserved.</div>
          </div>
        )}
        {messages.map((message) => (
          <Win98LlmMessageRow
            key={message.id}
            message={message}
            typing={message.role === "assistant" && message.id === typingMessageId}
            typewriterSpeed={typewriterSpeed}
            onTypewriterComplete={() => onTypewriterComplete?.(message.id)}
            userPrefix={userPrefix}
            assistantPrefix={assistantPrefix}
          />
        ))}
        {loading && (
          <div className="llm-dos-line is-assistant is-loading" aria-busy="true">
            <span className="llm-dos-prefix">{assistantPrefix}</span>
            <span className="llm-dos-loading-cursor">
              <span className="llm-dos-cursor" aria-hidden="true" />
            </span>
          </div>
        )}
        {children ? (
          <div className="llm-dos-composer">{children}</div>
        ) : showBuiltinComposer ? (
          <div className="llm-dos-composer">
            <Win98DosPromptInput
              ref={inputRef}
              prefix={userPrefix}
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              onSubmit={handleSubmit}
              placeholder={inputPlaceholder}
              disabled={loading}
              aria-label="输入命令"
              aria-busy={loading}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
