"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Win98Badge,
  Win98Button,
  Win98Checkbox,
  Win98DatePicker,
  Win98Desktop,
  Win98Dialog,
  Win98FieldRow,
  Win98GroupBox,
  Win98Input,
  Win98LlmChat,
  type Win98LlmMessage,
  Win98OptionButton,
  Win98Progress,
  Win98Select,
  Win98Table,
  Win98TableHeaderCell,
  Win98TablePagination,
  Win98TableWrap,
  Win98TextArea,
  Win98TextBox,
  Win98Window,
  getPageCount,
  paginateRows,
} from "../components/win98";

const TABLE_PAGE_SIZE = 4;

const LLM_DEMO_REPLY = `Win98 UI 组件库已加载完成。
> 支持 Checkbox、OptionButton、TextBox 与表格分页。
> LLM 回复使用打字机效果，光标为 DOS 粗下划线。`;

const SELECT_OPTIONS = [
  { value: "doc", label: "文档.txt", hint: "12 KB" },
  { value: "bmp", label: "图片.bmp", hint: "256 KB" },
  { value: "exe", label: "程序.exe", hint: "1.4 MB" },
  { value: "mid", label: "音乐.mid", hint: "48 KB" },
  { value: "zip", label: "备份.zip", hint: "2.1 MB" },
  { value: "doc2", label: "readme.doc", hint: "64 KB" },
  { value: "sys", label: "驱动.sys", hint: "18 KB" },
  { value: "wall", label: "壁纸.bmp", hint: "512 KB" },
  { value: "cab", label: "安装包.cab", hint: "3.8 MB" },
  { value: "ini", label: "配置.ini", hint: "2 KB" },
  { value: "dll", label: "库文件.dll", hint: "320 KB" },
  { value: "bat", label: "脚本.bat", hint: "1 KB" },
  { value: "htm", label: "网页.htm", hint: "8 KB" },
  { value: "wav", label: "音效.wav", hint: "96 KB" },
  { value: "avi", label: "视频.avi", hint: "12 MB" },
  { value: "ttf", label: "字体.ttf", hint: "140 KB" },
  { value: "cfg", label: "设置.cfg", hint: "4 KB" },
  { value: "log", label: "日志.log", hint: "22 KB" },
];

const TABLE_ROWS = [
  { name: "文档.txt", type: "文本文档", size: "12 KB", modified: "2026-06-20", status: "正常", hot: false },
  { name: "图片.bmp", type: "位图图像", size: "256 KB", modified: "2026-06-18", status: "正常", hot: true },
  { name: "程序.exe", type: "应用程序", size: "1.4 MB", modified: "2026-06-15", status: "正常", hot: false },
  { name: "音乐.mid", type: "MIDI 音频", size: "48 KB", modified: "2026-06-12", status: "只读", hot: false },
  { name: "备份.zip", type: "压缩文件", size: "2.1 MB", modified: "2026-06-10", status: "正常", hot: false },
  { name: "readme.doc", type: "Word 文档", size: "64 KB", modified: "2026-06-08", status: "正常", hot: false },
  { name: "驱动.sys", type: "系统文件", size: "18 KB", modified: "2026-05-30", status: "隐藏", hot: false },
  { name: "壁纸.bmp", type: "位图图像", size: "512 KB", modified: "2026-05-28", status: "正常", hot: false },
  { name: "安装包.cab", type: "Cabinet", size: "3.8 MB", modified: "2026-05-25", status: "正常", hot: true },
  { name: "配置.ini", type: "配置文件", size: "2 KB", modified: "2026-06-24", status: "正常", hot: false },
  { name: "缓存.tmp", type: "临时文件", size: "8 KB", modified: "2026-06-23", status: "正常", hot: false },
  { name: "数据.dat", type: "数据文件", size: "640 KB", modified: "2026-06-22", status: "只读", hot: false },
  { name: "图标.ico", type: "图标", size: "16 KB", modified: "2026-06-21", status: "正常", hot: false },
  { name: "帮助.hlp", type: "帮助文档", size: "88 KB", modified: "2026-06-19", status: "正常", hot: false },
];

export function Playground() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<string | undefined>("exe");
  const [occupation, setOccupation] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [notes, setNotes] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [tablePage, setTablePage] = useState(1);
  const [osChoice, setOsChoice] = useState("linux");
  const [installProgress] = useState(45);
  const [dateValue, setDateValue] = useState<Date | null>(new Date());
  const [timeValue, setTimeValue] = useState<Date | null>(new Date());
  const [dateTimeValue, setDateTimeValue] = useState<Date | null>(new Date());
  const [rangeStart, setRangeStart] = useState<Date | null>(new Date());
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [monthValue, setMonthValue] = useState<Date | null>(new Date());
  const [llmMessages, setLlmMessages] = useState<Win98LlmMessage[]>([
    { id: "llm-u-1", role: "user", content: "介绍一下这个组件库。" },
    { id: "llm-a-1", role: "assistant", content: LLM_DEMO_REPLY },
  ]);
  const [llmTypingId, setLlmTypingId] = useState<string | null>("llm-a-1");
  const [llmLoading, setLlmLoading] = useState(false);
  const [llmInput, setLlmInput] = useState("");

  const filteredRows = useMemo(
    () => TABLE_ROWS.filter((row) => row.name.toLowerCase().includes(search.trim().toLowerCase())),
    [search],
  );
  const tablePageCount = getPageCount(filteredRows.length, TABLE_PAGE_SIZE);
  const safeTablePage = Math.min(tablePage, tablePageCount);
  const visibleRows = paginateRows(filteredRows, safeTablePage, TABLE_PAGE_SIZE);

  useEffect(() => {
    setTablePage(1);
  }, [search]);

  const sendLlmMessage = () => {
    const text = llmInput.trim();
    if (!text || llmLoading) return;
    const userId = `llm-u-${Date.now()}`;
    const assistantId = `llm-a-${Date.now()}`;
    setLlmMessages((prev) => [...prev, { id: userId, role: "user", content: text }]);
    setLlmInput("");
    setLlmTypingId(null);
    setLlmLoading(true);
    window.setTimeout(() => {
      setLlmMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: LLM_DEMO_REPLY },
      ]);
      setLlmLoading(false);
      setLlmTypingId(assistantId);
    }, 1400);
  };

  return (
    <>
      <header className="topbar">
        <div className="logo">
          <div className="logo-icon">⛽</div>
          <span>Win98 UI · Playground</span>
        </div>
        <div className="topbar-actions">
          <Win98Button onClick={() => setDialogOpen(true)}>打开对话框</Win98Button>
          <button className="btn-icon" type="button" title="菜单">
            ☰
          </button>
        </div>
      </header>

      <Win98Desktop>
        <Win98Window title="基础控件.exe">
          <Win98GroupBox label="按钮">
            <div className="button-demo-row">
              <Win98Button className="btn-md">默认</Win98Button>
              <Win98Button variant="md">中等</Win98Button>
              <Win98Button variant="md" className="btn-send-demo">强调</Win98Button>
              <Win98Button variant="link">简约</Win98Button>
              <Win98Button variant="sm" title="工具栏">🔍</Win98Button>
            </div>
          </Win98GroupBox>
          <Win98GroupBox label="图标按钮">
            <div className="button-demo-row">
              <Win98Button variant="sm" title="收藏">🦊</Win98Button>
              <Win98Button variant="sm" title="打开链接">🔗</Win98Button>
              <Win98Button variant="toolbar" title="搜索">🔍</Win98Button>
              <Win98Button variant="sm" title="文件夹">📁</Win98Button>
            </div>
            <Win98FieldRow style={{ marginTop: 8, fontSize: "var(--fs-caption)", color: "var(--border-color-muted)" }}>
              下拉框内置 ▲▼ · 清除 ✕ · 对话框标题栏 ✕
            </Win98FieldRow>
          </Win98GroupBox>
          <Win98GroupBox label="下拉选择">
            <Win98Select
              options={SELECT_OPTIONS}
              value={selected}
              onValueChange={setSelected}
            />
          </Win98GroupBox>
          <Win98GroupBox label="日期时间选择">
            <div className="datepicker-demo-grid">
              <div className="datepicker-demo-field">
                <span>日期(可清除/年月下拉)</span>
                <Win98DatePicker
                  selected={dateValue}
                  onChange={setDateValue}
                  dateFormat="yyyy-MM-dd"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  isClearable
                  placeholderText="选择日期"
                />
              </div>
              <div className="datepicker-demo-field">
                <span>时间(15 分钟间隔)</span>
                <Win98DatePicker
                  selected={timeValue}
                  onChange={setTimeValue}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="时间"
                  dateFormat="HH:mm"
                  placeholderText="选择时间"
                />
              </div>
              <div className="datepicker-demo-field">
                <span>日期 + 时间</span>
                <Win98DatePicker
                  selected={dateTimeValue}
                  onChange={setDateTimeValue}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  timeCaption="时间"
                  dateFormat="yyyy-MM-dd HH:mm"
                  placeholderText="选择日期时间"
                />
              </div>
              <div className="datepicker-demo-field">
                <span>日期范围</span>
                <Win98DatePicker
                  selectsRange
                  startDate={rangeStart}
                  endDate={rangeEnd}
                  onChange={(dates) => {
                    const [start, end] = dates;
                    setRangeStart(start);
                    setRangeEnd(end);
                  }}
                  dateFormat="yyyy-MM-dd"
                  isClearable
                  placeholderText="开始 — 结束"
                />
              </div>
              <div className="datepicker-demo-field">
                <span>月份选择</span>
                <Win98DatePicker
                  selected={monthValue}
                  onChange={setMonthValue}
                  showMonthYearPicker
                  dateFormat="yyyy-MM"
                  placeholderText="选择月份"
                />
              </div>
            </div>
          </Win98GroupBox>
        </Win98Window>

        <Win98Window title="表格.exe">
          <div className="search-row">
            <Win98Input
              type="text"
              placeholder="搜索..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Win98Button variant="toolbar" title="搜索">
              🔍
            </Win98Button>
          </div>
          <Win98TableWrap>
            <Win98Table>
              <thead>
                <tr>
                  <Win98TableHeaderCell empty aria-label="全选" />
                  <Win98TableHeaderCell>名称</Win98TableHeaderCell>
                  <Win98TableHeaderCell className="col-meta">类型</Win98TableHeaderCell>
                  <Win98TableHeaderCell align="center" className="col-narrow">
                    大小
                  </Win98TableHeaderCell>
                  <Win98TableHeaderCell align="center" className="col-date">
                    修改日期
                  </Win98TableHeaderCell>
                  <Win98TableHeaderCell align="center" className="col-narrow">
                    状态
                  </Win98TableHeaderCell>
                  <Win98TableHeaderCell align="center">收藏</Win98TableHeaderCell>
                  <Win98TableHeaderCell align="center">链接</Win98TableHeaderCell>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row) => (
                  <tr key={row.name}>
                    <td>
                      <div className="cell-check">
                        <Win98Checkbox aria-label={`选择 ${row.name}`} />
                      </div>
                    </td>
                    <td>
                      <div className="chain-cell">
                        <div className="chain-name">
                          <span className="chain-icon" />
                          {row.name}
                          {row.hot && <Win98Badge>HOT</Win98Badge>}
                        </div>
                      </div>
                    </td>
                    <td className="col-meta">{row.type}</td>
                    <td className="col-action col-narrow">{row.size}</td>
                    <td className="col-action col-date">{row.modified}</td>
                    <td className="col-action col-narrow">{row.status}</td>
                    <td className="col-action">
                      <div className="cell-action">
                        <Win98Button variant="sm" title={`收藏 ${row.name}`}>
                          🦊
                        </Win98Button>
                      </div>
                    </td>
                    <td className="col-action">
                      <div className="cell-action">
                        <Win98Button variant="sm" title={`打开 ${row.name}`}>
                          🔗
                        </Win98Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Win98Table>
          </Win98TableWrap>
          <Win98TablePagination
            page={safeTablePage}
            pageSize={TABLE_PAGE_SIZE}
            total={filteredRows.length}
            onPageChange={setTablePage}
          />
        </Win98Window>

        <Win98Window title="TextBox.exe" fullWidth>
          <div className="textbox-demo-grid">
            <Win98GroupBox label="单行 · 标签在左">
              <Win98TextBox
                id="demo-occupation"
                label="职业"
                placeholder="请输入职业..."
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />
            </Win98GroupBox>
            <Win98GroupBox label="单行 · 标签在上">
              <Win98TextBox
                id="demo-address1"
                label="地址（第一行）"
                stacked
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
              <Win98TextBox
                id="demo-address2"
                label="地址（第二行）"
                stacked
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </Win98GroupBox>
            <Win98GroupBox label="多行 TextArea">
              <Win98TextArea
                id="demo-notes"
                label="备注"
                rows={5}
                placeholder="多行输入..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Win98GroupBox>
            <Win98GroupBox label="类型与状态">
              <Win98TextBox
                id="demo-password"
                label="密码"
                type="password"
                stacked
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Win98TextBox
                id="demo-email"
                label="邮箱"
                type="email"
                stacked
                placeholder="name@example.com"
              />
              <Win98TextBox id="demo-tel" label="电话" type="tel" stacked placeholder="010-12345678" />
              <Win98TextBox id="demo-url" label="网址" type="url" stacked placeholder="https://example.com" />
              <Win98TextBox id="demo-number" label="数量" type="number" stacked defaultValue={1} min={0} />
              <Win98TextBox
                id="demo-disabled"
                label="禁用"
                value="Windows Green"
                disabled
              />
              <Win98TextBox
                id="demo-readonly"
                label="只读"
                stacked
                readOnly
                value="只读内容"
              />
            </Win98GroupBox>
          </div>
        </Win98Window>

        <Win98Window title="控件预览.exe" fullWidth>
          <div className="controls-demo-grid">
            <Win98GroupBox label="Checkbox">
              <Win98FieldRow>
                <Win98Checkbox id="demo-cb-1" label="启用通知" defaultChecked />
              </Win98FieldRow>
              <Win98FieldRow>
                <Win98Checkbox id="demo-cb-2" label="记住设置" />
              </Win98FieldRow>
              <Win98FieldRow>
                <Win98Checkbox id="demo-cb-3" label="已禁用选项" disabled defaultChecked />
              </Win98FieldRow>
            </Win98GroupBox>

            <Win98GroupBox label="OptionButton">
              <Win98FieldRow>选择操作系统：</Win98FieldRow>
              <Win98FieldRow>
                <Win98OptionButton
                  id="demo-os-win"
                  name="demo-os"
                  label="Windows 98"
                  checked={osChoice === "win"}
                  onChange={() => setOsChoice("win")}
                />
              </Win98FieldRow>
              <Win98FieldRow>
                <Win98OptionButton
                  id="demo-os-mac"
                  name="demo-os"
                  label="Mac OS 9"
                  checked={osChoice === "mac"}
                  onChange={() => setOsChoice("mac")}
                />
              </Win98FieldRow>
              <Win98FieldRow>
                <Win98OptionButton
                  id="demo-os-linux"
                  name="demo-os"
                  label="Linux"
                  checked={osChoice === "linux"}
                  onChange={() => setOsChoice("linux")}
                />
              </Win98FieldRow>
              <Win98FieldRow>
                <Win98OptionButton
                  id="demo-os-disabled"
                  name="demo-os"
                  label="已禁用选项"
                  disabled
                />
              </Win98FieldRow>
            </Win98GroupBox>

            <Win98GroupBox label="Progress Indicator">
              <Win98FieldRow>实心进度条</Win98FieldRow>
              <Win98Progress value={installProgress} />
              <Win98FieldRow>分段进度条</Win98FieldRow>
              <Win98Progress value={installProgress} segmented />
              <Win98FieldRow>{installProgress}% 完成</Win98FieldRow>
            </Win98GroupBox>
          </div>
        </Win98Window>

        <Win98Window title="LLM 对话.exe" fullWidth>
          <Win98LlmChat
            messages={llmMessages}
            typingMessageId={llmTypingId}
            loading={llmLoading}
            onTypewriterComplete={() => setLlmTypingId(null)}
            inputValue={llmInput}
            onInputChange={setLlmInput}
            onSend={sendLlmMessage}
          />
        </Win98Window>

        <Win98Window title="字体预览.exe" fullWidth>
          <p className="font-preset-note">
            组件库默认字体栈：JetBrains Mono + Sarasa Mono SC + 宋体 fallback
          </p>
          <div className="font-samples">
            <div className="font-sample-row">
              <div className="font-sample-label">Sarasa Mono SC</div>
              <div className="font-sample-text font-cjk-sarasa size-14">
                14px · 复选框 · 分组框 · 进度条
              </div>
            </div>
            <div className="font-sample-row">
              <div className="font-sample-label">JetBrains Mono</div>
              <div className="font-sample-text font-mono size-14">
                14px · Win98Button · Win98Select
              </div>
            </div>
          </div>
        </Win98Window>
      </Win98Desktop>

      <p className="demo-note">
        <code>@win98/ui</code> · 组件库 Playground
      </p>

      <Win98Dialog
        open={dialogOpen}
        title="确认.exe"
        onClose={() => setDialogOpen(false)}
        onConfirm={() => setDialogOpen(false)}
      >
        <div className="modal-icon-row">
          <div className="modal-icon">⚠️</div>
          <div className="modal-message">
            <strong>确定要执行此操作吗？</strong>
          </div>
        </div>
      </Win98Dialog>
    </>
  );
}
