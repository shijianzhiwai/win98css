"use client";

import { useMemo, useState } from "react";
import {
  Win98Badge,
  Win98Button,
  Win98Checkbox,
  Win98ColHeader,
  Win98DatePicker,
  Win98Dialog,
  Win98DosPromptInput,
  Win98FieldRow,
  Win98Form,
  Win98FormActions,
  Win98FormField,
  Win98GroupBox,
  Win98Input,
  Win98LlmChat,
  type Win98LlmMessage,
  Win98Menu,
  Win98MenuGroup,
  Win98MenuItem,
  Win98NumberBox,
  Win98OptionButton,
  Win98Progress,
  Win98Select,
  Win98Table,
  Win98TableHeaderCell,
  Win98TablePagination,
  Win98TableWrap,
  Win98TextArea,
  Win98TextBox,
  Win98Typewriter,
  Win98Window,
  getPageCount,
  paginateRows,
  useWin98Form,
} from "../../components/win98";

type PageKey = "dashboard" | "users" | "newUser" | "assistant" | "console";

const PAGE_TITLES: Record<PageKey, string> = {
  dashboard: "仪表盘",
  users: "用户管理",
  newUser: "新建用户",
  assistant: "AI 助手",
  console: "命令控制台",
};

const USER_PAGE_SIZE = 5;

const ROLE_OPTIONS = [
  { value: "admin", label: "管理员", hint: "全部权限" },
  { value: "editor", label: "编辑", hint: "内容读写" },
  { value: "viewer", label: "访客", hint: "只读" },
  { value: "auditor", label: "审计员", hint: "日志查看" },
  { value: "ops", label: "运维", hint: "系统维护" },
];

type UserRow = {
  id: number;
  name: string;
  role: string;
  email: string;
  lastLogin: string;
  status: "在线" | "离线" | "锁定";
  isNew: boolean;
};

const USER_ROWS: UserRow[] = [
  { id: 1, name: "张伟", role: "管理员", email: "zhangwei@win98.io", lastLogin: "2026-06-27 09:12", status: "在线", isNew: false },
  { id: 2, name: "李娜", role: "编辑", email: "lina@win98.io", lastLogin: "2026-06-27 08:40", status: "在线", isNew: true },
  { id: 3, name: "王芳", role: "访客", email: "wangfang@win98.io", lastLogin: "2026-06-26 21:03", status: "离线", isNew: false },
  { id: 4, name: "刘洋", role: "运维", email: "liuyang@win98.io", lastLogin: "2026-06-26 18:55", status: "在线", isNew: false },
  { id: 5, name: "陈静", role: "审计员", email: "chenjing@win98.io", lastLogin: "2026-06-25 14:21", status: "锁定", isNew: false },
  { id: 6, name: "杨杰", role: "编辑", email: "yangjie@win98.io", lastLogin: "2026-06-25 11:09", status: "离线", isNew: false },
  { id: 7, name: "赵敏", role: "访客", email: "zhaomin@win98.io", lastLogin: "2026-06-24 16:48", status: "离线", isNew: true },
  { id: 8, name: "黄磊", role: "运维", email: "huanglei@win98.io", lastLogin: "2026-06-24 09:30", status: "在线", isNew: false },
  { id: 9, name: "周强", role: "管理员", email: "zhouqiang@win98.io", lastLogin: "2026-06-23 22:15", status: "离线", isNew: false },
  { id: 10, name: "吴婷", role: "编辑", email: "wuting@win98.io", lastLogin: "2026-06-23 13:42", status: "在线", isNew: false },
  { id: 11, name: "孙悦", role: "审计员", email: "sunyue@win98.io", lastLogin: "2026-06-22 19:07", status: "离线", isNew: false },
  { id: 12, name: "马超", role: "访客", email: "machao@win98.io", lastLogin: "2026-06-22 10:33", status: "锁定", isNew: false },
];

const ASSISTANT_REPLY = `已收到指令，正在分析后台数据。
> 本周新增用户 2 名，活跃率 78%。
> 存储占用 6.4 GB / 10 GB，处于健康区间。
> 如需导出报表，请前往「用户管理」页右上角工具栏。`;

type SortKey = "name" | "lastLogin";

export function AdminDemo() {
  const [page, setPage] = useState<PageKey>("dashboard");
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <>
      <header className="topbar">
        <div className="logo">
          <div className="logo-icon">🖥️</div>
          <span>Win98 控制台 · Admin</span>
        </div>
        <div className="topbar-actions">
          <Win98Button variant="connect" onClick={() => setAboutOpen(true)}>
            关于本系统
          </Win98Button>
          <button className="btn-icon" type="button" title="菜单">
            ☰
          </button>
        </div>
      </header>

      <div className="admin-shell">
        <Win98Menu title="导航.exe">
          <Win98MenuGroup label="概览">
            <Win98MenuItem
              icon="📊"
              active={page === "dashboard"}
              onSelect={() => setPage("dashboard")}
            >
              仪表盘
            </Win98MenuItem>
          </Win98MenuGroup>

          <Win98MenuGroup label="内容管理">
            <Win98MenuItem
              icon="👥"
              badge={USER_ROWS.length}
              active={page === "users"}
              onSelect={() => setPage("users")}
            >
              用户管理
            </Win98MenuItem>
            <Win98MenuItem
              icon="➕"
              active={page === "newUser"}
              onSelect={() => setPage("newUser")}
            >
              新建用户
            </Win98MenuItem>
          </Win98MenuGroup>

          <Win98MenuGroup label="工具">
            <Win98MenuItem
              icon="🤖"
              active={page === "assistant"}
              onSelect={() => setPage("assistant")}
            >
              AI 助手
            </Win98MenuItem>
            <Win98MenuItem
              icon="⌨️"
              active={page === "console"}
              onSelect={() => setPage("console")}
            >
              命令控制台
            </Win98MenuItem>
          </Win98MenuGroup>

          <Win98MenuGroup label="系统" defaultOpen={false}>
            <Win98MenuItem icon="⚙️" disabled>
              系统设置（开发中）
            </Win98MenuItem>
          </Win98MenuGroup>
        </Win98Menu>

        <div className="admin-main">
          {page === "dashboard" && <DashboardPage />}
          {page === "users" && <UsersPage />}
          {page === "newUser" && <NewUserPage onCreated={() => setPage("users")} />}
          {page === "assistant" && <AssistantPage />}
          {page === "console" && <ConsolePage />}

          <footer className="status-bar container-border">
            <span className="status-bar-field">当前页：{PAGE_TITLES[page]}</span>
            <span className="status-bar-field">用户：{USER_ROWS.length}</span>
            <span className="status-bar-field is-grow">就绪</span>
            <span className="status-bar-field">Win98 UI v0.1.0</span>
          </footer>
        </div>
      </div>

      <Win98Dialog
        open={aboutOpen}
        title="关于.exe"
        onClose={() => setAboutOpen(false)}
        onConfirm={() => setAboutOpen(false)}
        confirmLabel="知道了"
        cancelLabel="关闭"
      >
        <div className="modal-icon-row">
          <div className="modal-icon">🖥️</div>
          <div className="modal-message">
            <strong>Win98 管理后台 Demo</strong>
            <p style={{ marginTop: 6, fontSize: "var(--fs-caption)" }}>
              基于 @win98/ui 组件库构建，用于演示菜单 + 全部组件的组合使用。
            </p>
          </div>
        </div>
      </Win98Dialog>
    </>
  );
}

function DashboardPage() {
  const [bannerDone, setBannerDone] = useState(false);

  return (
    <>
      <Win98Window title="仪表盘.exe" fullWidth>
        <div className="admin-banner border-inverted">
          <span className="admin-banner-prefix">SYS:\&gt;</span>
          <Win98Typewriter
            text="欢迎回来，管理员。系统运行正常。"
            active={!bannerDone}
            onComplete={() => setBannerDone(true)}
          />
        </div>
        <div className="admin-stat-grid">
          <StatCard label="用户总数" value="12" hint="本周 +2" progress={62} />
          <StatCard label="今日活跃" value="78%" progress={78} />
          <StatCard label="存储占用" value="6.4 GB" hint="10 GB" progress={64} segmented />
          <StatCard label="待处理工单" value="3" hot progress={30} />
        </div>
      </Win98Window>

      <div className="admin-content-grid">
        <Win98Window title="系统资源.exe">
          <Win98GroupBox label="CPU">
            <Win98FieldRow>处理器占用</Win98FieldRow>
            <Win98Progress value={42} />
          </Win98GroupBox>
          <Win98GroupBox label="内存">
            <Win98FieldRow>已用内存（分段）</Win98FieldRow>
            <Win98Progress value={71} segmented />
          </Win98GroupBox>
        </Win98Window>

        <Win98Window title="最近动态.exe">
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
            <li className="admin-stat-label">
              <span>李娜 注册了新账号</span>
              <Win98Badge>NEW</Win98Badge>
            </li>
            <li className="admin-stat-label">
              <span>赵敏 修改了个人资料</span>
              <span>10:24</span>
            </li>
            <li className="admin-stat-label">
              <span>系统完成了每日备份</span>
              <span>03:00</span>
            </li>
            <li className="admin-stat-label">
              <span>陈静 账号被锁定</span>
              <span>昨天</span>
            </li>
          </ul>
        </Win98Window>
      </div>
    </>
  );
}

function StatCard({
  label,
  value,
  hint,
  progress,
  segmented,
  hot,
}: {
  label: string;
  value: string;
  hint?: string;
  progress: number;
  segmented?: boolean;
  hot?: boolean;
}) {
  return (
    <div className="admin-stat">
      <div className="admin-stat-label">
        <span>{label}</span>
        {hot ? <Win98Badge>HOT</Win98Badge> : hint ? <span>{hint}</span> : null}
      </div>
      <div className="admin-stat-value">{value}</div>
      <Win98Progress value={progress} segmented={segmented} />
    </div>
  );
}

function UsersPage() {
  const [search, setSearch] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [roleFilter, setRoleFilter] = useState<string | undefined>(undefined);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortAsc, setSortAsc] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<UserRow | null>(null);
  const [rows, setRows] = useState<UserRow[]>(USER_ROWS);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = rows.filter((r) => {
      const matchQ =
        !q || r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q);
      const matchRole = !roleFilter || r.role === labelForRole(roleFilter);
      return matchQ && matchRole;
    });
    const sorted = [...list].sort((a, b) => {
      const cmp = a[sortKey] < b[sortKey] ? -1 : a[sortKey] > b[sortKey] ? 1 : 0;
      return sortAsc ? cmp : -cmp;
    });
    return sorted;
  }, [rows, search, roleFilter, sortKey, sortAsc]);

  const pageCount = getPageCount(filtered.length, USER_PAGE_SIZE);
  const safePage = Math.min(pageNum, pageCount);
  const visible = paginateRows(filtered, safePage, USER_PAGE_SIZE);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc((v) => !v);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const toggleRow = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allVisibleSelected = visible.length > 0 && visible.every((r) => selectedIds.has(r.id));
  const toggleAllVisible = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allVisibleSelected) visible.forEach((r) => next.delete(r.id));
      else visible.forEach((r) => next.add(r.id));
      return next;
    });
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      setRows((prev) => prev.filter((r) => r.id !== deleteTarget.id));
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(deleteTarget.id);
        return next;
      });
    }
    setDeleteTarget(null);
  };

  return (
    <Win98Window title="用户管理.exe" fullWidth>
      <div className="admin-toolbar container-border">
        <Win98Button variant="md">导出</Win98Button>
        <Win98Button variant="md">刷新</Win98Button>
        <span className="admin-toolbar-sep" />
        <Win98Button variant="md" disabled={selectedIds.size === 0}>
          批量禁用（{selectedIds.size}）
        </Win98Button>
        <div style={{ width: 160 }}>
          <Win98Select
            options={ROLE_OPTIONS}
            value={roleFilter}
            placeholder="按角色筛选"
            onValueChange={(v) => {
              setRoleFilter(v);
              setPageNum(1);
            }}
          />
        </div>
        <span className="admin-breadcrumb">首页 / 内容管理 / 用户管理</span>
      </div>

      <div className="search-row" style={{ margin: "8px 0" }}>
        <Win98Input
          type="text"
          placeholder="搜索姓名或邮箱..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPageNum(1);
          }}
        />
        <Win98Button variant="toolbar" title="搜索">
          🔍
        </Win98Button>
      </div>

      <Win98TableWrap>
        <Win98Table>
          <thead>
            <tr>
              <th className="col-check">
                <div className="cell-check">
                  <Win98Checkbox
                    aria-label="全选当前页"
                    checked={allVisibleSelected}
                    onChange={toggleAllVisible}
                  />
                </div>
              </th>
              <th className="col-chain">
                <Win98ColHeader onClick={() => toggleSort("name")}>
                  姓名 {sortKey === "name" ? (sortAsc ? "▲" : "▼") : ""}
                </Win98ColHeader>
              </th>
              <Win98TableHeaderCell className="col-meta">角色</Win98TableHeaderCell>
              <Win98TableHeaderCell className="col-meta">邮箱</Win98TableHeaderCell>
              <th className="col-date">
                <Win98ColHeader align="center" onClick={() => toggleSort("lastLogin")}>
                  最近登录 {sortKey === "lastLogin" ? (sortAsc ? "▲" : "▼") : ""}
                </Win98ColHeader>
              </th>
              <Win98TableHeaderCell align="center" className="col-narrow">
                状态
              </Win98TableHeaderCell>
              <Win98TableHeaderCell align="center">操作</Win98TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr key={row.id}>
                <td>
                  <div className="cell-check">
                    <Win98Checkbox
                      aria-label={`选择 ${row.name}`}
                      checked={selectedIds.has(row.id)}
                      onChange={() => toggleRow(row.id)}
                    />
                  </div>
                </td>
                <td>
                  <div className="chain-cell">
                    <div className="chain-name">
                      <span className="chain-icon" />
                      {row.name}
                      {row.isNew && <Win98Badge>NEW</Win98Badge>}
                    </div>
                  </div>
                </td>
                <td className="col-meta">{row.role}</td>
                <td className="col-meta">{row.email}</td>
                <td className="col-action col-date">{row.lastLogin}</td>
                <td className="col-action col-narrow">{row.status}</td>
                <td className="col-action">
                  <div className="cell-action">
                    <Win98Button variant="sm" title={`编辑 ${row.name}`}>
                      ✏️
                    </Win98Button>
                    <Win98Button
                      variant="sm"
                      title={`删除 ${row.name}`}
                      onClick={() => setDeleteTarget(row)}
                    >
                      🗑️
                    </Win98Button>
                  </div>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: 16 }}>
                  没有匹配的用户
                </td>
              </tr>
            )}
          </tbody>
        </Win98Table>
      </Win98TableWrap>

      <Win98TablePagination
        page={safePage}
        pageSize={USER_PAGE_SIZE}
        total={filtered.length}
        onPageChange={setPageNum}
      />

      <Win98Dialog
        open={deleteTarget != null}
        title="删除确认.exe"
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        confirmLabel="删除"
        cancelLabel="取消"
      >
        <div className="modal-icon-row">
          <div className="modal-icon">⚠️</div>
          <div className="modal-message">
            <strong>确定删除用户「{deleteTarget?.name}」吗？</strong>
            <p style={{ marginTop: 6, fontSize: "var(--fs-caption)" }}>
              此操作不可撤销。
            </p>
          </div>
        </div>
      </Win98Dialog>
    </Win98Window>
  );
}

function labelForRole(value: string): string {
  return ROLE_OPTIONS.find((o) => o.value === value)?.label ?? "";
}

type NewUserValues = {
  name: string;
  email: string;
  password: string;
  role: string | undefined;
  seats: number;
  joinDate: Date | null;
  status: string;
  notify: boolean;
  bio: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function NewUserPage({ onCreated }: { onCreated: () => void }) {
  const [done, setDone] = useState(false);

  const form = useWin98Form<NewUserValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "editor",
      seats: 1,
      joinDate: new Date(),
      status: "active",
      notify: true,
      bio: "",
    },
    rules: {
      name: { required: "请输入姓名" },
      email: {
        required: "请输入邮箱",
        validate: (v) =>
          typeof v === "string" && v.trim() !== "" && !EMAIL_RE.test(v)
            ? "邮箱格式不正确"
            : undefined,
      },
      password: {
        required: "请输入密码",
        validate: (v) => (typeof v === "string" && v.length < 6 ? "密码至少 6 位" : undefined),
      },
      role: { required: "请选择角色" },
      seats: {
        validate: (v) =>
          typeof v === "number" && (v < 1 || v > 20) ? "席位数需在 1–20 之间" : undefined,
      },
      joinDate: { required: "请选择入职日期" },
    },
    onSubmit: () => setDone(true),
  });

  const { values, isValid, setFieldValue, setFieldTouched, getFieldError, handleSubmit } = form;

  return (
    <Win98Window title="新建用户.exe" fullWidth>
      <Win98Form onSubmit={handleSubmit}>
        <div className="textbox-demo-grid">
          <Win98GroupBox label="账号信息">
            <Win98FormField label="姓名" htmlFor="nu-name" required error={getFieldError("name")}>
              <Win98TextBox
                id="nu-name"
                placeholder="请输入姓名"
                value={values.name}
                onChange={(e) => setFieldValue("name", e.target.value)}
                onBlur={() => setFieldTouched("name")}
              />
            </Win98FormField>
            <Win98FormField label="邮箱" htmlFor="nu-email" required error={getFieldError("email")}>
              <Win98TextBox
                id="nu-email"
                type="email"
                placeholder="name@example.com"
                value={values.email}
                onChange={(e) => setFieldValue("email", e.target.value)}
                onBlur={() => setFieldTouched("email")}
              />
            </Win98FormField>
            <Win98FormField
              label="密码"
              htmlFor="nu-password"
              required
              error={getFieldError("password")}
              hint="至少 6 位字符"
            >
              <Win98TextBox
                id="nu-password"
                type="password"
                value={values.password}
                onChange={(e) => setFieldValue("password", e.target.value)}
                onBlur={() => setFieldTouched("password")}
              />
            </Win98FormField>
          </Win98GroupBox>

          <Win98GroupBox label="权限与配额">
            <Win98FormField label="角色" htmlFor="nu-role" required error={getFieldError("role")}>
              <Win98Select
                options={ROLE_OPTIONS}
                value={values.role}
                onValueChange={(v) => {
                  setFieldValue("role", v);
                  setFieldTouched("role");
                }}
              />
            </Win98FormField>
            <Win98FormField label="席位数" htmlFor="nu-seats" error={getFieldError("seats")}>
              <Win98NumberBox
                id="nu-seats"
                min={1}
                max={20}
                value={values.seats}
                onChange={(e) => setFieldValue("seats", Number(e.target.value) || 0)}
                onBlur={() => setFieldTouched("seats")}
              />
            </Win98FormField>
            <Win98FormField label="入职日期" required error={getFieldError("joinDate")}>
              <Win98DatePicker
                selected={values.joinDate}
                onChange={(d: Date | null) => {
                  setFieldValue("joinDate", d);
                  setFieldTouched("joinDate");
                }}
                dateFormat="yyyy-MM-dd"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                isClearable
                placeholderText="选择日期"
              />
            </Win98FormField>
          </Win98GroupBox>

          <Win98GroupBox label="初始状态">
            <Win98FieldRow>账号状态：</Win98FieldRow>
            <Win98FieldRow>
              <Win98OptionButton
                id="nu-st-active"
                name="nu-status"
                label="启用"
                checked={values.status === "active"}
                onChange={() => setFieldValue("status", "active")}
              />
            </Win98FieldRow>
            <Win98FieldRow>
              <Win98OptionButton
                id="nu-st-pending"
                name="nu-status"
                label="待审核"
                checked={values.status === "pending"}
                onChange={() => setFieldValue("status", "pending")}
              />
            </Win98FieldRow>
            <Win98FieldRow>
              <Win98OptionButton
                id="nu-st-disabled"
                name="nu-status"
                label="禁用"
                checked={values.status === "disabled"}
                onChange={() => setFieldValue("status", "disabled")}
              />
            </Win98FieldRow>
            <Win98FieldRow style={{ marginTop: 8 }}>
              <Win98Checkbox
                id="nu-notify"
                label="发送欢迎邮件"
                checked={values.notify}
                onChange={(e) => setFieldValue("notify", e.target.checked)}
              />
            </Win98FieldRow>
          </Win98GroupBox>

          <Win98GroupBox label="备注">
            <Win98FormField label="简介" htmlFor="nu-bio" hint="选填">
              <Win98TextArea
                id="nu-bio"
                rows={5}
                placeholder="可填写用户简介..."
                value={values.bio}
                onChange={(e) => setFieldValue("bio", e.target.value)}
              />
            </Win98FormField>
          </Win98GroupBox>
        </div>

        <Win98FormActions>
          {done ? (
            <span className="admin-form-status">✓ 已创建（示例）</span>
          ) : !isValid ? (
            <span className="win98-form-error" style={{ marginRight: "auto" }}>
              请修正表单中的错误后再提交
            </span>
          ) : null}
          <Win98Button type="button" className="admin-action-btn" onClick={onCreated}>
            取消
          </Win98Button>
          <Win98Button
            type="submit"
            className="admin-action-btn admin-action-btn-primary"
            disabled={!isValid}
          >
            创建用户
          </Win98Button>
        </Win98FormActions>
      </Win98Form>
    </Win98Window>
  );
}

function AssistantPage() {
  const [messages, setMessages] = useState<Win98LlmMessage[]>([
    { id: "a-u-1", role: "user", content: "帮我看看后台运行情况。" },
    { id: "a-a-1", role: "assistant", content: ASSISTANT_REPLY },
  ]);
  const [typingId, setTypingId] = useState<string | null>("a-a-1");
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const send = () => {
    const text = input.trim();
    if (!text || loading) return;
    const uid = `a-u-${Date.now()}`;
    const aid = `a-a-${Date.now()}`;
    setMessages((prev) => [...prev, { id: uid, role: "user", content: text }]);
    setInput("");
    setTypingId(null);
    setLoading(true);
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { id: aid, role: "assistant", content: ASSISTANT_REPLY }]);
      setLoading(false);
      setTypingId(aid);
    }, 1200);
  };

  return (
    <Win98Window title="AI 助手.exe" fullWidth>
      <Win98LlmChat
        messages={messages}
        typingMessageId={typingId}
        loading={loading}
        onTypewriterComplete={() => setTypingId(null)}
        inputValue={input}
        onInputChange={setInput}
        onSend={send}
        inputPlaceholder="询问后台数据..."
      />
    </Win98Window>
  );
}

function ConsolePage() {
  const [lines, setLines] = useState<string[]>([
    "Microsoft(R) Windows 98 [版本 4.10.1998]",
    "(C) 版权所有 1981-1998 Microsoft Corp.",
    "",
    "输入 help 查看可用命令。",
  ]);
  const [input, setInput] = useState("");

  const run = () => {
    const cmd = input.trim();
    if (!cmd) return;
    const out: string[] = [`C:\\ADMIN>${cmd}`];
    switch (cmd.toLowerCase()) {
      case "help":
        out.push("可用命令: help, dir, whoami, cls, ver");
        break;
      case "dir":
        out.push(" users.db    12 条记录");
        out.push(" logs.txt    2.1 KB");
        break;
      case "whoami":
        out.push("WIN98\\administrator");
        break;
      case "ver":
        out.push("Win98 UI Admin Console v0.1.0");
        break;
      case "cls":
        setLines([]);
        setInput("");
        return;
      default:
        out.push(`'${cmd}' 不是内部或外部命令。`);
    }
    setLines((prev) => [...prev, ...out, ""]);
    setInput("");
  };

  return (
    <Win98Window title="命令控制台.exe" fullWidth>
      <div className="llm-dos-terminal">
        <div className="llm-dos-screen">
          <div className="llm-dos-content">
            {lines.map((line, i) => (
              <div key={i} className="llm-dos-line is-assistant">
                <span className="llm-dos-user-text">{line || "\u00a0"}</span>
              </div>
            ))}
            <div className="llm-dos-composer">
              <Win98DosPromptInput
                prefix="C:\ADMIN>"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onSubmit={run}
                placeholder="输入命令后回车"
              />
            </div>
          </div>
        </div>
      </div>
    </Win98Window>
  );
}
