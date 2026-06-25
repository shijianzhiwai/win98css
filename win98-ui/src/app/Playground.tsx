"use client";

import { useState } from "react";
import {
  Win98Badge,
  Win98Button,
  Win98Checkbox,
  Win98Desktop,
  Win98Dialog,
  Win98FieldRow,
  Win98GroupBox,
  Win98Input,
  Win98OptionButton,
  Win98Progress,
  Win98Select,
  Win98Table,
  Win98TableHeaderCell,
  Win98TableWrap,
  Win98Window,
} from "../components/win98";

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
];

export function Playground() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<string>("exe");
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [osChoice, setOsChoice] = useState("linux");
  const [installProgress] = useState(45);

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
              <Win98Button variant="sm" title="工具栏">🔍</Win98Button>
            </div>
          </Win98GroupBox>
          <Win98GroupBox label="输入框">
            <Win98Input
              type="text"
              placeholder="请输入..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Win98GroupBox>
          <Win98GroupBox label="图标按钮">
            <div className="button-demo-row">
              <Win98Button variant="sm" title="收藏">🦊</Win98Button>
              <Win98Button variant="sm" title="打开链接">🔗</Win98Button>
              <Win98Button variant="toolbar" title="搜索">🔍</Win98Button>
              <Win98Button variant="sm" title="文件夹">📁</Win98Button>
            </div>
            <Win98FieldRow style={{ marginTop: 8, fontSize: 12, color: "var(--border-color-muted)" }}>
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
                {TABLE_ROWS.filter((row) =>
                  row.name.toLowerCase().includes(search.trim().toLowerCase()),
                ).map((row) => (
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
          <div className="view-more">
            <Win98Button>查看更多 ▾</Win98Button>
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
