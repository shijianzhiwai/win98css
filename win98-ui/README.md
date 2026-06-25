# Win98 UI

基于 [gas.zip](https://www.gas.zip/) Win98 视觉规范提取的 **Next.js / React 组件库**（MVP）。

设计规范见 [`gas-zip-win98-design.md`](../gas-zip-win98-design.md)。

## 组件一览

| 组件 | 说明 |
|------|------|
| `Win98Button` | 凸起按钮（`connect` / `send` / `sm` / `minmax` 等 variant） |
| `Win98Input` | 凹陷输入框（底层 primitive） |
| `Win98TextBox` / `Win98TextArea` | 文本框（单行 / 多行，参考 98.css TextBox） |
| `Win98Checkbox` | Win98 风格复选框（支持无标签 / 带 `label`） |
| `Win98OptionButton` | 单选按钮（OptionButton / Radio） |
| `Win98FieldRow` | 表单控件行间距（对应 98.css `.field-row`） |
| `Win98Progress` | 进度条（实心 / `segmented` 分段） |
| `Win98Window` | 窗口（标题栏 + 内容区） |
| `Win98GroupBox` | 分组框（`fieldset` + `legend`） |
| `Win98Select` | 可搜索下拉 |
| `Win98Dialog` | 模态对话框 |
| `Win98Table` / `Win98TableWrap` / `Win98TableHeaderCell` | 表格 |
| `Win98TablePagination` | 表格分页（« ‹ › » + 页码信息） |
| `Win98LlmChat` / `Win98Typewriter` / `Win98DosPromptInput` | DOS 黑框 LLM 对话（打字机 + 下划线光标） |
| `Win98Desktop` | 桌面双列网格布局 |
| `Win98Badge` | HOT 标签 |

## 开发

```bash
cd win98-ui
npm install
npm run dev
```

若出现 `Could not find the module ... global-error.js in the React Client Manifest`：

1. 停掉所有 `next dev` 进程
2. 执行 `npm run dev:clean`（清 `.next` 后重启）
3. 仍复现时改用 `npm run dev:webpack`（绕过 Turbopack HMR 问题）

不要在同一目录同时跑 `next build` 和 `next dev`，也不要开两个 dev 端口。

## 在 Next.js 项目中使用

```tsx
// app/layout.tsx
import "@/styles/win98.css";
// 并加载 /fonts/sarasa-mono-sc.css + JetBrains Mono

import { Win98Button, Win98Window } from "@/components/win98";

export default function Page() {
  return (
    <Win98Window title="主网列表.exe">
      <Win98Button>示例按钮</Win98Button>
    </Win98Window>
  );
}
```

## 目录

```
win98-ui/
├── public/fonts/          # Sarasa Mono SC woff2
├── src/styles/win98.css   # 设计 Token + 组件样式（来自设计规范提取）
├── src/components/win98/  # React 组件
└── src/app/Playground.tsx # 组件库 Playground（纯 UI 演示）
```

## 路线图

- [ ] 拆分为独立 npm 包 `@win98/ui`
- [ ] Radix UI 无障碍增强（Select / Dialog）
- [ ] TypeScript 主题 Token API
- [ ] Storybook 文档站
