# Gas.zip Win98 风格设计提取文档

> 来源：https://www.gas.zip/  
> 提取日期：2026-06-24  
> 最后更新：2026-06-24（备忘 98.css 后续组件参考）  
> 用途：设计参考与复刻，不直接复制其业务代码

---

## 1. 概述

Gas.zip 使用 **Next.js + Tailwind CSS v4 + Radix UI** 构建了一套高度还原 Windows 98 经典 GUI 的视觉系统。

### 核心特征

| 特征 | 说明 |
|------|------|
| 无圆角 | `border-radius: 0`，纯正 Win98 直角 |
| 3D 斜面边框 | 亮/暗四色对模拟凸起与凹陷 |
| 按钮交互 | `:active` 瞬间切换凹陷态，`transition: none` |
| 弹层动效 | 无动画，遮罩 + 窗体即时显示/关闭 |
| 字体 | **JetBrains Mono**（英文）+ **Sarasa Mono SC**（中文 woff2）+ **宋体**（fallback） |
| 语义结构 | 表格列头在 `<thead>` 内；窗口标题为普通文本非按钮 |

### Gas.zip 类名 ↔ win98-ui 类名对照

| Gas.zip (Tailwind) | win98-ui (CSS) | 用途 |
|--------------------|---------------|------|
| `borderBtn` | `.border-btn` | 凸起按钮 |
| `borderBtnInverted` / `active:borderBtnInverted` | `.border-btn:active` | 凹陷/按下态 |
| `borderInverted` | `.border-inverted` | 凹陷输入框 |
| `cardAndTableBorder` | `.card-border` | 窗口外框 |
| `containerBorder` | `.container-border` | 窗口内容区内框 |
| `innerInsetBorder` | `.table-wrap` | 表格外层凹陷容器 |
| `groupBoxBorder` | `.group-box` | 分组框 |
| `groupBoxLabel` | `.group-box-label` | 分组框标签 |
| `selectBox` | `.select-box` | 下拉触发器 |
| `selectBoxIcon` | `.select-box-icon` | 下拉箭头区 |
| `tableShadowLeft` | `thead/tbody tr` box-shadow | 表格行左内阴影 |
| `bg-accent` | `.title-bar` | 紫蓝标题栏 |

---

## 2. 色彩 Token

| Token | 值 | 用途 |
|-------|-----|------|
| `--background` | `#3a6ea5` | 桌面背景 |
| `--primary` / `--card` | `#cfcfcf` | 窗口、按钮、表头灰 |
| `--accent` | `#505bbf` | 标题栏紫蓝 |
| `--foreground` | `#ffffff` | 桌面顶栏文字 |
| `--muted-foreground` | `#202020` | 窗口内正文 |
| `--secondary` | `#ffffff` | 输入框白底 |
| `--destructive` | `#e74c6a` | HOT 标签 |
| `--border-color-dark` | `#050608` | 最深阴影边 |
| `--border-color-light` | `#dfe0e3` | 浅高光边 |
| `--border-color-muted` | `#888c8f` | 中间调 |
| `--box-shadow-light` | `#fefefe` | 内高光 |
| `--box-shadow-muted` | `#888c8f` | 内阴影 |
| `--box-shadow-dark` | `#050608` | 外阴影 |

```css
:root {
  --background: #3a6ea5;
  --primary: #cfcfcf;
  --card: #cfcfcf;
  --accent: #505bbf;
  --foreground: #ffffff;
  --secondary: #ffffff;
  --muted-foreground: #202020;
  --destructive: #e74c6a;

  --border-color-dark: #050608;
  --border-color-light: #dfe0e3;
  --border-color-muted: #888c8f;
  --box-shadow-light: #fefefe;
  --box-shadow-muted: #888c8f;
  --box-shadow-dark: #050608;

  --radius: 0;
}
```

---

## 3. 3D 边框系统

Win98 风格核心是 **outset（凸起）** 与 **inset（凹陷）**。

### 3.1 凸起按钮 `.border-btn`

用于：Connect Wallet、SEND、行内操作按钮、弹窗 OK/Cancel、关闭按钮等。

```css
.border-btn {
  background: var(--primary);
  font-size: 14px;
  font-weight: 400;
  transition: none;
  border-top: 1.75px solid var(--box-shadow-light);
  border-left: 1.75px solid var(--box-shadow-light);
  border-right: 1.75px solid var(--border-color-dark);
  border-bottom: 1.75px solid var(--border-color-dark);
  box-shadow:
    inset 0 1.75px 0 0 var(--border-color-light),
    inset -1.75px 0 0 0 var(--box-shadow-muted),
    inset 0 -1.75px 0 0 var(--box-shadow-muted),
    inset 1.75px 0 0 0 var(--border-color-light);
}

.border-btn:hover:not(:disabled) { background: #c5c6c5; }

.border-btn:active:not(:disabled) {
  border-top: 1.75px solid var(--border-color-dark);
  border-left: 1.75px solid var(--border-color-dark);
  border-right: 1.75px solid var(--box-shadow-light);
  border-bottom: 1.75px solid var(--box-shadow-light);
  box-shadow:
    inset 0 1.75px 0 0 var(--box-shadow-muted),
    inset -1.75px 0 0 0 var(--border-color-light),
    inset 0 -1.75px 0 0 var(--border-color-light),
    inset 1.75px 0 0 0 var(--box-shadow-muted);
}

.border-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: var(--border-color-muted);
  text-shadow: 1px 1px #fff;
}
```

### 3.2 可点击列头 `.col-header`

用于：表格 `<thead>` 内列名（Chain / Add Chain / Explorer）。

> **注意**：列名不是表格外部的工具栏按钮，而是 `<th>` 内的 `<button>`，视觉同凸起按钮，用于排序等交互。

```css
.col-header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 32px;
  padding: 0 8px;
  font-size: 14px;
  font-weight: 400;
  white-space: nowrap;       /* 强制单行，不换行 */
  cursor: pointer;
  transition: none;
  /* 边框同 .border-btn */
}

.col-header.is-center { justify-content: center; }
.col-header.is-empty  { justify-content: center; padding: 0; } /* checkbox 列占位 */

.col-header:active { /* 同 .border-btn:active，松开后恢复凸起 */ }
```

### 3.3 凹陷输入框 `.border-inverted`

```css
.border-inverted {
  background: #fff;
  font-size: 14px;
  font-weight: 400;
  border-top: 2px solid var(--border-color-muted);
  border-left: 2px solid var(--border-color-muted);
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  box-shadow:
    inset 1px 1px 0 1px #0a0a0a,
    inset -1px -1px 0 1px #dfdfdf;
}
```

### 3.4 窗口外框 `.card-border`

```css
.card-border {
  background: var(--card);
  border-top: 1.75px solid var(--border-color-light);
  border-left: 1.75px solid var(--border-color-light);
  border-right: 1.75px solid var(--border-color-dark);
  border-bottom: 1.75px solid var(--border-color-dark);
  box-shadow:
    inset 0 1.75px 0 0 var(--box-shadow-light),
    inset -1.75px 0 0 0 var(--box-shadow-muted),
    inset 0 -1.75px 0 0 var(--box-shadow-muted),
    inset 1.75px 0 0 0 var(--box-shadow-light),
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
}
```

### 3.5 内容区内框 `.container-border`

```css
.container-border {
  border-top: 1.75px solid var(--border-color-dark);
  border-left: 1.75px solid var(--border-color-dark);
  border-right: 1.75px solid var(--border-color-light);
  border-bottom: 1.75px solid var(--border-color-light);
  box-shadow:
    inset 0 1.75px 0 0 var(--box-shadow-dark),
    inset -1.75px 0 0 0 var(--box-shadow-dark),
    inset 0 -1.75px 0 0 var(--box-shadow-light),
    inset 1.75px 0 0 0 var(--box-shadow-light);
}
```

### 3.6 表格外层凹陷 `.table-wrap`（innerInsetBorder）

```css
.table-wrap {
  overflow-x: auto;   /* 列宽不足时横向滚动 */
  overflow-y: auto;
  border: 2px inset;
  border-color: var(--border-color-muted) #fff #fff var(--border-color-muted);
  box-shadow:
    inset 1px 1px 0 1px #0a0a0a,
    inset -1px -1px 0 1px #dfdfdf;
}
```

### 3.7 分组框 `.group-box`

```css
.group-box {
  border-top: 1.75px solid var(--border-color-muted);
  border-left: 1.75px solid var(--border-color-muted);
  border-right: 1.75px solid var(--border-color-light);
  border-bottom: 1.75px solid var(--border-color-light);
  box-shadow:
    inset 0 1.75px 0 0 var(--box-shadow-light),
    inset -1.75px 0 0 0 var(--box-shadow-muted),
    inset 0 -1.75px 0 0 var(--box-shadow-muted),
    inset 1.75px 0 0 0 var(--box-shadow-light);
  position: relative;
  padding: 18px 12px 12px;
}

.group-box-label {
  position: absolute;
  top: -9px;
  left: 8px;
  background: var(--card);
  padding: 0 8px;
  font-size: 14px;
  font-weight: 600;
}
```

---

## 4. 组件规范

### 4.1 按钮字重分级

| 元素 | font-weight | font-size | 类名 |
|------|-------------|-----------|------|
| Connect Wallet | **200** | 14px | `.btn-connect` |
| 普通按钮（OK、行内操作等） | 400 | 14px | `.border-btn` |
| SEND | **500** | 14px | `.btn-send` |
| 列头（Chain 等） | 400 | 14px | `.col-header` |
| [Min] / [Max] | 400 | 11px | `.btn-minmax`（文字链，非凸起按钮） |
| 弹窗 OK / Cancel | 400 | 14px | `.modal-actions .border-btn` |

### 4.2 窗口与标题栏

```
┌─ .card-border ───────────────────────────┐
│ ┌─ .title-bar (#505bbf) ──────────────┐ │
│ │ Mainnets.exe                         │ │
│ └──────────────────────────────────────┘ │
│ ┌─ .window-body.container-border ──────┐ │
│ │  搜索 / 表格 / 表单                   │ │
│ └──────────────────────────────────────┘ │
└──────────────────────────────────────────┘
```

```css
.title-bar {
  background: var(--accent);
  color: #fff;
  padding: 4px 8px;
  margin: 4px;
  width: calc(100% - 8px);
  font-size: 16px;
  font-weight: 400;              /* 非 bold */
  -webkit-font-smoothing: auto;  /* 禁止 antialiased，否则偏细 */
}
```

### 4.3 表格 / 列表

#### 结构（四列）

```
.table-wrap (overflow-x: auto)
└── table.data-table (min-width: 380px)
    ├── thead
    │   └── tr
    │       ├── th.col-check   → button.col-header.is-empty  (50px)
    │       ├── th.col-chain   → button.col-header           (min 120px, 左对齐)
    │       ├── th.col-action  → button.col-header.is-center (min 96px, 居中) "Add Chain"
    │       └── th.col-action  → button.col-header.is-center (min 96px, 居中) "Explorer"
    └── tbody
        └── tr
            ├── td → checkbox
            ├── td → 链图标 + 名称 + HOT
            ├── td.col-action → 添加钱包按钮 (40×32)
            └── td.col-action → 浏览器按钮 (40×32)
```

#### 列宽与滚动

| 列 | 宽度 | 说明 |
|----|------|------|
| Checkbox | `50px` | 固定 |
| Chain | `min-width: 120px` | 弹性，左对齐 |
| Add Chain / Explorer | `min-width: 96px` | 固定，居中，`white-space: nowrap` |

列名文字过长时不换行，由 `.table-wrap { overflow-x: auto }` 提供横向滚动。Playground 中文列名示例：**链 / 添加链 / 浏览器**。

#### 列头 HTML（gas.zip 英文；Playground 可替换为中文列名）

```html
<thead>
  <tr>
    <th class="col-check" scope="col">
      <button type="button" class="col-header is-empty" aria-label="Select all"></button>
    </th>
    <th class="col-chain" scope="col">
      <button type="button" class="col-header">Chain</button>
    </th>
    <th class="col-action" scope="col">
      <button type="button" class="col-header is-center">Add Chain</button>
    </th>
    <th class="col-action" scope="col">
      <button type="button" class="col-header is-center">Explorer</button>
    </th>
  </tr>
</thead>
```

#### 数据行样式

- 行左侧内阴影：`box-shadow: inset 4px 0 4px -4px var(--border-color-dark)`
- 行 hover：浅灰背景 `#f5f5f5`
- 链名单元格：`white-space: nowrap`
- HOT 标签：`#e74c6a` 底，`font-weight: 700`，`12px`
- 行内操作按钮：`40×32px` 凸起 `.border-btn`

### 4.4 输入框

- 白底 + `.border-inverted`
- 高度 `32px`（`h-8`）
- `font-weight: 400`，`font-size: 14px`
- 占位符：`muted-foreground` 60% 透明度

### 4.5 下拉选择 `.select-box`

```css
.select-box {
  display: flex;
  height: 36px;
  background: #fff;
  cursor: pointer;
  border-top: 2px solid var(--border-color-muted);
  border-left: 2px solid var(--border-color-muted);
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  box-shadow: inset 1px 1px 0 1px #0a0a0a22, inset -1px -1px 0 1px #dfdfdf;
}

.select-box-value {
  font-size: 16px;
  font-weight: 400;
}

.select-box-icon {
  width: 30px;
  /* 右侧凸起小按钮，双箭头 ▲▼ */
}
```

下拉面板动画：
- 结构：`.select-dropdown-clip`（固定高度裁切窗）+ `.select-dropdown`（完整面板）
- 打开：仅内层 `translateY(-100%)→0` 整体下移，150ms linear（GPU 合成层，不动画 `max-height`）
- 关闭：反向上移；`animationend` 卸载，非 `setTimeout`
- `prefers-reduced-motion`：跳过动画即时展开/收起
- 选项 hover：经典 Win 蓝底 `#000080` + 白字
- 可清除：`clearable`（默认 true）；有值时触发器显示 `✕`，列表顶行「清除」；`onValueChange(undefined)`

### 4.6 Checkbox

结构：`<label.checkbox-label>` → 隐藏 `<input.checkbox-input>` + 可见 `<span.checkbox-box>`（`input` 是替换元素，不支持 `::after`）。

| 属性 | 值 |
|------|-----|
| 尺寸 | **16×16px**（`--checkbox-size`） |
| 边框 | 1px 凹陷（上/左深，下/右浅 + inset shadow） |
| 选中 | 白底 + **CSS 折线勾**（`border` 旋转 45°，非 Unicode `✓`） |
| 焦点 | `focus-visible` 时虚线框 |

### 4.7 Bridge 表单

| 区域 | 标签字重 | 特殊元素 |
|------|----------|----------|
| Source | 600 / 14px | `.select-box` 下拉 |
| Amount per Chain | 600 / 14px | `$` 按钮 + 输入框 + `[Min]`/`[Max]` 文字链 |
| Send | 600 / 14px | 地址输入 + SEND 按钮（500） |
| Receive | 600 / 14px | 链名按钮网格 |

`[Min]` / `[Max]` 为灰色文字链（`11px / 400 / #6b7280`），**不是**凸起按钮。

### 4.8 弹窗 / 对话框

```
.modal-overlay (rgba(0,0,0,0.55), fixed, z-index: 1000)
└── .modal.card-border
    ├── .title-bar.title-bar-dialog
    │   ├── span#modalTitle  (16px / 400)
    │   └── button.title-bar-btn (✕, 20×20)
    └── .modal-body.container-border
        ├── .modal-icon-row (图标 + 消息 + 表单)
        └── .modal-actions → [Cancel] [OK]
```

| 行为 | 实现 |
|------|------|
| 打开 | 遮罩 + 窗体 **即时** 显示（无动画） |
| 关闭 | **即时** 隐藏 |
| Esc / 点击遮罩 / ✕ / Cancel | 关闭 |
| 打开时 | `body { overflow: hidden }`，焦点移入弹窗 |
| 无障碍 | `role="dialog"` `aria-modal="true"` `aria-labelledby` |

---

## 5. 字体

### 5.1 拉丁字体（gas.zip 原站）

```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@200;400;500;600;700&display=swap" rel="stylesheet" />
```

```css
--font-mono: "JetBrains Mono", "JetBrains Mono Fallback", "Courier New", monospace;
```

用于：英文界面、链名、地址、`0x` 哈希、`.exe` 窗口标题后缀。

### 5.2 中文字体调研

#### Win98 简体中文版系统字体

根据 Microsoft `MS Shell Dlg` 映射与 Windows 内置字体：

| 字体 | 英文名 | Win98 角色 | 特点 |
|------|--------|------------|------|
| **宋体** | SimSun | **简体 UI 默认映射** | 衬线，小字号清晰，最有 Win98 中文感 |
| **黑体** | SimHei | 内置标题/强调 | 无衬线，笔画均匀 |
| 楷体_GB2312 | KaiTi_GB2312 | 内置 | 公文风格，较少用于 UI |
| 仿宋_GB2312 | FangSong_GB2312 | 内置 | 同上 |

> Win98 英文 UI 用 MS Sans Serif；**简体中文 UI 通过 `MS Shell Dlg` 映射到 SimSun（宋体）**。

#### 现代系统 fallback

| 平台 | 宋体替代 | 黑体替代 |
|------|----------|----------|
| Windows | `SimSun`, `NSimSun` | `SimHei` |
| macOS | `Songti SC`, `STSong` | `Heiti SC`, `PingFang SC` |
| Web 开源 | `Noto Serif SC` | `Noto Sans SC`, `Microsoft YaHei` |

#### 正式方案（win98-ui 采用）

仅保留两套中文相关字体：**Sarasa Mono SC**（自托管 woff2）+ **宋体**（系统 fallback）。

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preload" href="/fonts/SarasaMonoSC-Regular.woff2" as="font" type="font/woff2" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@200;400;500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/fonts/sarasa-mono-sc.css" />
```

> 本地目录：`~/Doc/gas-zip-win98/fonts/`；上线部署时改为 `/fonts/`。

```css
:root {
  --font-mono: "JetBrains Mono", "JetBrains Mono Fallback", "Courier New", monospace;
  --font-cjk-sarasa: "Sarasa Mono SC", monospace;
  --font-cjk-song: "SimSun", "Songti SC", "STSong", serif;
}

body {
  font-family: var(--font-mono), var(--font-cjk-sarasa), var(--font-cjk-song), monospace;
}
```

**Fallback 逻辑：**

| 字符 | 优先级 | 说明 |
|------|--------|------|
| 英文/数字/地址 | JetBrains Mono | 与 gas.zip 原站一致 |
| 中文（woff2 已加载） | Sarasa Mono SC | `fonts/` 自托管 |
| 中文（woff2 未加载） | SimSun → Songti SC | Win98 原始宋体系 |

`@font-face` 使用 `unicode-range` 限定 CJK 区段，避免 Sarasa 覆盖英文。

**首屏加载：**

- 可选 `preload` Regular.woff2，缩短首访下载等待
- 全部字重使用 `font-display: swap`（首访可能先 SimSun 再切换；woff2 缓存命中后通常不闪）

#### 自托管字体文件（`fonts/`）

| 文件 | 字重 | 大小 |
|------|------|------|
| `SarasaMonoSC-Regular.woff2` | 400 | ~4.6 MB |
| `SarasaMonoSC-SemiBold.woff2` | 600 | ~4.6 MB |
| `SarasaMonoSC-Bold.woff2` | 700 | ~4.7 MB |
| `sarasa-mono-sc.css` | @font-face | — |
| `Sarasa-OFL.txt` | SIL OFL 1.1 | — |

来源：[be5invis/Sarasa-Gothic](https://github.com/be5invis/Sarasa-Gothic) v1.0.39 `SarasaMonoSC-TTF`，子集化 `U+4E00-9FA5` + CJK 标点。详见 [fonts/README.md](./fonts/README.md)。

#### 为何选 Sarasa Mono SC + 宋体

| 字体 | 角色 | 等宽 | 加载方式 |
|------|------|------|----------|
| **Sarasa Mono SC** | 中文主字体 | ✅ | 自托管 woff2 |
| **宋体 SimSun** | 未加载 / 系统 fallback | ❌ | 系统内置 |
| **JetBrains Mono** | 英文主字体 | ✅ | Google Fonts CDN |

- Sarasa Mono SC：比宋体好看，中英文等宽对齐，适合表格/地址混排
- 宋体：Win98 简体系统映射，woff2 加载失败时自动降级，保证中文可读
- 不再使用文楷、像素、Gothic 等其他备选字体

#### 字号与字重（中文）

| 元素 | font-weight | font-size |
|------|-------------|-----------|
| 正文 | 400 | 16px |
| 列头/按钮 | 400 | 14px |
| 连接钱包 | 200（仅拉丁部分） | 14px |
| 发送 | 500 | 14px |
| 分组标签 | 600 | 14px |
| [最小]/[最大] | 400 | 11px |

> 中文在 `font-weight: 200` 时通常由系统合成或回退到 400，属正常现象。

### 5.3 全元素字重对照表（浏览器实测）

| 元素 | font-weight | font-size |
|------|-------------|-----------|
| 正文 | 400 | 16px |
| 输入框 | 400 | 14px |
| 窗口标题栏（主网列表.exe） | 400 | 16px |
| 表格列头（链 / 添加链） | 400 | 14px |
| 连接钱包 | 200 | 14px |
| 普通凸起按钮 | 400 | 14px |
| 发送 | 500 | 14px |
| Group Box 标签 | 600 | 14px |
| HOT 标签 | 700 | 12px |
| [最小] / [最大] | 400 | 11px |
| 下拉占位 | 400 | 16px |

### 5.4 常见踩坑

1. **不要用 `-webkit-font-smoothing: antialiased`**：中英文字都会偏细。
2. **不要全站只用 JetBrains Mono 显示中文**：缺字会 fallback 到不协调的系统字体。
3. **不要把列名做成表格外工具栏**：必须在 `<thead><th>` 内。
4. **中文列名需 `white-space: nowrap`** + 容器 `overflow-x: auto`（如「添加链」「浏览器」）。
5. **字体 fallback**：中文 Sarasa Mono SC 未加载时自动降级宋体；英文始终 JetBrains Mono。
6. **宋体闪一下（FOUT）**：`font-display: swap` + woff2 约 4.6MB 首访下载慢时，会先用 SimSun 再切换；二次访问缓存命中后一般不再闪。可选 `preload` 缩短首访等待。

---

## 6. 动效规范

| 场景 | 策略 |
|------|------|
| 按钮 / 列头点击 | `transition: none`，`:active` 瞬间凹陷 |
| 列头选中 | 无持久选中态，仅 `:active` 按住时凹陷 |
| 下拉展开 | 裁切窗 + `translateY` 下移（底行先见），仅 transform |
| 下拉收起 | `translateY` 上移，`animationend` 收尾 |
| 弹窗 | 即时显示/关闭，无动画 |
| Hover | 背景微变 `#c5c6c5`，无位移 |

```css
@keyframes select-drawer-in {
  from { transform: translateY(-100%); }
  to   { transform: translateY(0); }
}

@keyframes select-drawer-out {
  from { transform: translateY(0); }
  to   { transform: translateY(-100%); }
}
```

---

## 7. 布局模式（Gas.zip 首页）

```
桌面 (#3a6ea5)
├── 顶栏：Logo + Connect Wallet (200) + 汉堡菜单
├── Mainnets.exe
│   ├── 搜索行
│   ├── 表格（4 列 + 可滚动）
│   └── View More Chains
├── Testnets.exe
├── Bridge.exe
│   ├── Source（下拉）
│   ├── Amount per Chain（$ + 输入 + Min/Max 链）
│   ├── Send（地址 + SEND）
│   └── Receive（链按钮网格）
├── Send.exe
└── Discord 浮动按钮
```

Playground 当前实现：**主网列表.exe** + **跨链桥.exe** + **字体预览.exe** + **连接钱包弹窗**（中文 UI）。

响应式：`.desktop-grid` 大屏 2 列，`<768px` 单列。

---

## 8. 静态资源与预览

### `fonts/`

| 文件 | 说明 |
|------|------|
| `SarasaMonoSC-*.woff2` | Regular / SemiBold / Bold |
| `sarasa-mono-sc.css` | `@font-face`，`font-display: swap` |
| `Sarasa-OFL.txt` | SIL OFL 1.1 授权 |
| `README.md` | 接入说明 |

### 本地预览

**Next.js 组件库 Playground**（`win98-ui/`）：

```bash
cd win98-ui
npm install
npm run dev
# http://localhost:3000
```

组件入口：`win98-ui/src/components/win98/index.ts`

---

## 9. 技术栈对照

| Gas.zip | win98-ui |
|---------|----------|
| Next.js | Next.js |
| Tailwind v4 自定义类 | 手写 CSS class（`win98.css`） |
| Radix Select / Dialog / Checkbox | 自定义 React 组件 + 原生元素 |
| JetBrains Mono (next/font) | Google Fonts CDN |
| 中文 | Sarasa Mono SC woff2（`fonts/`）+ SimSun fallback |

---

## 10. 复刻检查清单

### 视觉

- [x] 桌面背景 `#3a6ea5`
- [x] 全局无圆角
- [x] 3D 凸起 / 凹陷边框
- [x] 标题栏 `#505bbf`，字重 400
- [x] Group Box 标签 600 / 14px，嵌在边框上
- [x] `-webkit-font-smoothing: auto`

### 字体

- [x] JetBrains Mono + Sarasa Mono SC（自托管 woff2）+ 宋体 fallback
- [x] 字体预览窗口（Sarasa / 宋体 / JetBrains 三行对比）
- [x] Connect Wallet = 200，其余按钮 = 400，SEND = 500
- [x] 列头 = 400，不换行

### 表格

- [x] 列名在 `<thead>` 内，非外部工具栏
- [x] 列头为可点击 `<button class="col-header">`
- [x] 四列：Checkbox / Chain / Add Chain / Explorer
- [x] `overflow-x: auto` 横向滚动
- [x] 行内操作按钮 40×32

### 交互

- [x] 按钮 `transition: none`
- [x] 下拉自上向下抽屉动效（`select-drawer-in/out`）
- [x] 弹窗即时显示/关闭（无动画）+ Esc / 点击关闭
- [x] [Min]/[Max] 为文字链非按钮

---

## 11. 参考资源

- 线上站点：https://www.gas.zip/
- 公开 CSS：https://www.gas.zip/_next/static/css/3b4b3f06e5c4e91b.css
- 组件库 Playground：`win98-ui/`（`npm run dev`）
- 字体资源：[fonts/README.md](./fonts/README.md)

### 11.1 后续组件备忘：98.css

> **备忘**：后续新增/补齐组件时，优先对照 [98.css](https://jdan.github.io/98.css/) 的 HTML 结构与样式约定，再适配本项目的色彩变量与 Sarasa 字体栈。

| 链接 | 用途 |
|------|------|
| [98.css 首页](https://jdan.github.io/98.css/) | Win98 纯 CSS 组件库总览 |
| [Tabs 标签页](https://jdan.github.io/98.css/#tabs) | 标签页（待实现时首选参考） |
| [GitHub: jdan/98.css](https://github.com/jdan/98.css) | 源码与 class 命名 |

**适配原则**（_gas.zip / win98-ui 与 98.css 并存时_）：

1. 保留本项目 token：`--border-color-*`、`--card`、``.border-btn` / `.border-inverted` 等已有类名
2. 动效延续现有规范：按钮无 transition；下拉抽屉 `translateY`；弹窗无动画
3. 不直接引入 98.css 全量包，只 **摘取结构与尺寸**，用 `win98.css` 重写以保持一致性

**待参考实现的组件**（按优先级随手记）：Tabs、TreeView、Progress、Slider、Fieldset（已有 GroupBox 可对齐核对）

---

## 12. 迭代记录

| 日期 | 修正项 |
|------|--------|
| 2026-06-24 | 初版提取：色彩、边框、组件、动效 |
| 2026-06-24 | 增补弹窗结构（Connect Wallet.exe） |
| 2026-06-24 | 字体：正文 16px/400，去除 antialiased；标题栏对齐 |
| 2026-06-24 | 按钮字重分级（200/400/500/600/700） |
| 2026-06-24 | 列头点击改为仅 :active 瞬时凹陷，去除 is-active |
| 2026-06-24 | 字体定稿：仅 Sarasa Mono SC + 宋体 fallback；移除文楷/像素/Gothic 预设 |
| 2026-06-24 | Sarasa Mono SC woff2 自托管至 `fonts/`；整体迁至 `~/Doc/gas-zip-win98/` |
| 2026-06-24 | 字体加载：`font-display: swap` + 可选 preload |
| 2026-06-24 | 新增 `win98-ui/` Next.js 组件库（MVP） |
| 2026-06-24 | 备忘：后续组件参考 [98.css](https://jdan.github.io/98.css/)（含 [Tabs](https://jdan.github.io/98.css/#tabs)） |
