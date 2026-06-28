# 管理后台 Demo 组件缺口与问题清单

本文档记录在搭建 `/admin` 管理后台 Demo（[`src/app/admin/AdminDemo.tsx`](../src/app/admin/AdminDemo.tsx)）过程中，对照真实后台场景发现的「缺失组件」与「现有组件问题」。

Demo 已用满组件库现有全部导出组件，并新增了第一个布局类组件 `Win98Menu`（侧边栏导航菜单，见 [`src/components/win98/Menu.tsx`](../src/components/win98/Menu.tsx)）。

---

## 1. 本次新增

| 组件 | 说明 |
|------|------|
| `Win98Menu` / `Win98MenuGroup` / `Win98MenuItem` | 侧边栏导航菜单：标题栏、可折叠分组（`▸/▾`）、可选中项（`active` 反色高亮）、左侧图标、右侧徽标、禁用态 |

配套样式：`.admin-shell`（侧栏 + 主区两列布局）、`.status-bar`（底部凹陷分栏状态栏）、`.admin-toolbar`（工具栏条）、`.admin-stat`（统计卡）。

---

## 2. 缺失组件（建议补齐，按优先级）

| 优先级 | 组件 | 场景 | Demo 中的临时替代 |
|--------|------|------|--------------------|
| 高 | **`Win98MenuBar`（顶部菜单栏 + 下拉）** | 经典 Win98 窗口的 文件/编辑/查看 菜单 | 暂用 `.topbar` + 单个按钮替代 |
| 高 | **`Win98Tabs`（标签页）** | 详情页多面板切换（设计文档已列入路线图） | 用侧栏菜单切换整页代替 |
| 高 | **`Win98StatusBar`（状态栏组件）** | 窗口底部状态分栏 | 已在 Demo 用 `.status-bar` + `.container-border` 手写，建议沉淀为正式组件 |
| 高 | **`Win98Toolbar`（工具栏容器）** | 表格上方的按钮组 + 分隔符 | 已用 `.admin-toolbar` + `.admin-toolbar-sep` 手写 |
| 中 | **`Win98TreeView`（树形目录）** | 多级目录/组织架构（路线图已列入） | 侧栏菜单仅两级，无法表达树 |
| 中 | **`Win98Card` / `Win98StatCard`（统计卡）** | 仪表盘指标卡 | 已用 `.admin-stat` + `card-border` 手写 |
| 中 | **`Win98Breadcrumb`（面包屑）** | 顶部层级导航 | 用 `.admin-breadcrumb` 纯文本拼接 |
| 中 | **`Win98Tooltip`（气泡提示）** | 图标按钮悬浮说明 | 仅用原生 `title` 属性 |
| 低 | **`Win98Slider` / `Win98Spinner`（滑块/转圈）** | 配置项、加载态（路线图已列入 Slider） | 无 |
| 低 | **`Win98Tag` / `Win98StatusDot`（状态标签）** | 表格「在线/离线/锁定」状态 | 目前纯文本，建议做带色点的状态标签 |
| 低 | **`Win98Toast` / 通知** | 操作成功/失败反馈 | 用内联文字「✓ 已创建」临时表达 |

---

## 3. 现有组件的问题 / 改进点

1. **缺少受控 `Win98Table` 数据驱动 API**：当前表格需要手写 `<thead>/<tbody>`，行选择、排序、全选逻辑全部由使用方实现（Demo 中自行维护 `selectedIds`、`sortKey`）。建议提供 `columns` + `data` 的数据驱动封装，内置排序/选择。

2. **`Win98TableHeaderCell` 与可排序表头冲突**：`Win98TableHeaderCell` 内部已渲染 `<button class="col-header">`，要做可点击排序时若再嵌套按钮会产生「button 套 button」的非法结构。Demo 中对可排序列改用 `Win98ColHeader` 直接放进 `<th>` 规避。建议给 `Win98TableHeaderCell` 增加 `sortable` / `onSort` / `sortDirection` 属性，统一排序交互。

3. **`Win98Select` 缺少 `label` / 表单整合**：在「新建用户」表单中需手写 `.textbox-field.field-row-stacked > label` 才能与 `Win98TextBox` 的标签布局对齐。建议 `Win98Select` 像 `Win98TextBox` 一样支持 `label` / `stacked`。

4. **`Win98NumberBox` 受控值类型**：`onChange` 回传的是原生事件，需使用方 `Number(e.target.value)` 转换；缺少 `Win98DatePicker` 那样的 `value:number / onValueChange:(n)=>void` 友好签名。

5. **`Win98Progress` 无标签/百分比内显**：仪表盘统计卡需在外部单独写百分比文字。建议增加 `showValue` 选项。

6. **`Win98Dialog` 仅「确定/取消」两键**：删除确认希望「删除」按钮用 `destructive` 红色强调，目前无法区分危险操作。建议 `confirmVariant` 属性。

7. **lint 既有报错（非本次引入）**：`Win98Typewriter`、`Win98Select` 触发 `react-hooks/set-state-in-effect`（Next 16 / React 19 新规则）。本次新增代码已规避该模式（分页重置改在事件处理器内完成），但既有组件建议后续一并整改。

---

## 4. 覆盖核对

`/admin` Demo 直接使用到的组件（对应 [`index.ts`](../src/components/win98/index.ts) 导出）：

Button、Input、TextBox、TextArea、NumberBox、Checkbox、FieldRow、OptionButton、Progress、Window、GroupBox、Select、DatePicker、Dialog、Menu/MenuGroup/MenuItem、Table/TableWrap/TableHeaderCell/ColHeader/Badge/Desktop、TablePagination（含 `getPageCount` / `paginateRows`）、DosPromptInput、LlmChat、Typewriter。
