import type { Metadata } from "next";
import "../styles/win98.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Win98 UI — Gas.zip 风格组件库",
  description: "Next.js React 组件库，复刻 gas.zip Win98 视觉系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="preload"
          href="/fonts/SarasaMonoSC-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@200;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/fonts/sarasa-mono-sc.css" />
      </head>
      <body className="win98-app">{children}</body>
    </html>
  );
}
