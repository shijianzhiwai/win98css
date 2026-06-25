# Win98 UI

基于 [gas.zip](https://www.gas.zip/) Win98 视觉规范提取的 **Next.js / React 组件库**（MVP）。

设计规范见上级目录 [`gas-zip-win98-design.md`](../gas-zip-win98-design.md)。

## 组件一览

| 组件 | 说明 |
|------|------|
| `Win98Button` | 凸起按钮（`connect` / `send` / `sm` / `minmax` 等 variant） |
| `Win98Input` | 凹陷输入框 |
| `Win98Checkbox` | Win98 风格复选框 |
| `Win98Window` | 窗口（标题栏 + 内容区） |
| `Win98GroupBox` | 分组框 |
| `Win98Select` | 可搜索下拉 |
| `Win98Dialog` | 模态对话框 |
| `Win98Table` / `Win98TableWrap` / `Win98TableHeaderCell` | 表格 |
| `Win98Desktop` | 桌面双列网格布局 |
| `Win98Badge` | HOT 标签 |

## 开发

```bash
cd ~/Doc/gas-zip-win98/win98-ui
npm install
npm run dev
# http://localhost:3000
```

## 在 Next.js 项目中使用

```tsx
// app/layout.tsx
import "@/styles/win98.css";
// 并加载 /fonts/sarasa-mono-sc.css + JetBrains Mono

import { Win98Button, Win98Window } from "@/components/win98";

export default function Page() {
  return (
    <Win98Window title="主网列表.exe">
      <Win98Button variant="connect">连接钱包</Win98Button>
    </Win98Window>
  );
}
```

## 目录

```
win98-ui/
├── public/fonts/          # Sarasa Mono SC woff2
├── src/styles/win98.css   # 设计 Token + 组件样式（来自 Demo 提取）
├── src/components/win98/  # React 组件
└── src/app/Playground.tsx # 与 HTML Demo 等价的 Playground
```

## 路线图

- [ ] 拆分为独立 npm 包 `@win98/ui`
- [ ] Radix UI 无障碍增强（Select / Dialog）
- [ ] TypeScript 主题 Token API
- [ ] Storybook 文档站
