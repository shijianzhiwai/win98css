"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="zh-CN">
      <body className="win98-app">
        <section className="window card-border" style={{ maxWidth: 480, margin: "40px auto" }}>
          <div className="title-bar">运行时错误.exe</div>
          <div className="window-body container-border">
            <p style={{ marginBottom: 12, fontSize: 14 }}>
              页面渲染失败。若刚改过代码，多半是 Turbopack 缓存问题。
            </p>
            <p style={{ marginBottom: 16, fontSize: 12, wordBreak: "break-word" }}>
              {error.message}
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <button type="button" className="border-btn" onClick={() => reset()}>
                重试
              </button>
              <button type="button" className="border-btn" onClick={() => window.location.reload()}>
                刷新页面
              </button>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
