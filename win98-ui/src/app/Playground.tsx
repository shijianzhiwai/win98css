"use client";

import { useState } from "react";
import {
  Win98Badge,
  Win98Button,
  Win98Checkbox,
  Win98Desktop,
  Win98Dialog,
  Win98GroupBox,
  Win98Input,
  Win98Select,
  Win98Table,
  Win98TableHeaderCell,
  Win98TableWrap,
  Win98Window,
} from "../components/win98";

const CHAINS = [
  { value: "arb", label: "Arbitrum", hint: "0.00 ETH" },
  { value: "eth", label: "Ethereum", hint: "0.00 ETH" },
  { value: "base", label: "Base", hint: "0.00 ETH" },
  { value: "op", label: "Optimism", hint: "0.00 ETH" },
  { value: "bsc", label: "BSC", hint: "0.00 BNB" },
  { value: "monad", label: "Monad", hint: "0.00 MON" },
  { value: "polygon", label: "Polygon", hint: "0.00 POL" },
  { value: "avax", label: "Avalanche", hint: "0.00 AVAX" },
  { value: "ftm", label: "Fantom", hint: "0.00 FTM" },
  { value: "zksync", label: "zkSync Era", hint: "0.00 ETH" },
  { value: "linea", label: "Linea", hint: "0.00 ETH" },
  { value: "scroll", label: "Scroll", hint: "0.00 ETH" },
  { value: "blast", label: "Blast", hint: "0.00 ETH" },
  { value: "mode", label: "Mode", hint: "0.00 ETH" },
  { value: "mantle", label: "Mantle", hint: "0.00 MNT" },
  { value: "taiko", label: "Taiko", hint: "0.00 ETH" },
  { value: "sonic", label: "Sonic", hint: "0.00 S" },
  { value: "bera", label: "Berachain", hint: "0.00 BERA" },
  { value: "celo", label: "Celo", hint: "0.00 CELO" },
  { value: "gnosis", label: "Gnosis", hint: "0.00 xDAI" },
];

const MAINNETS = [
  { name: "Arbitrum", hot: true },
  { name: "BSC", hot: false },
  { name: "Ethereum", hot: false },
];

export function Playground() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [chain, setChain] = useState<string>();
  const [address, setAddress] = useState("");

  return (
    <>
      <header className="topbar">
        <div className="logo">
          <div className="logo-icon">⛽</div>
          <span>Win98 UI · Playground</span>
        </div>
        <div className="topbar-actions">
          <Win98Button variant="connect" onClick={() => setDialogOpen(true)}>
            连接钱包
          </Win98Button>
          <button className="btn-icon" type="button" title="菜单">
            ☰
          </button>
        </div>
      </header>

      <Win98Desktop>
        <Win98Window title="主网列表.exe">
          <div className="search-row">
            <Win98Input type="text" placeholder="搜索..." />
            <Win98Button variant="toolbar" title="搜索">🔍</Win98Button>
          </div>
          <Win98TableWrap>
            <Win98Table>
              <thead>
                <tr>
                  <Win98TableHeaderCell empty aria-label="全选" />
                  <Win98TableHeaderCell>链</Win98TableHeaderCell>
                  <Win98TableHeaderCell align="center">添加链</Win98TableHeaderCell>
                  <Win98TableHeaderCell align="center">浏览器</Win98TableHeaderCell>
                </tr>
              </thead>
              <tbody>
                {MAINNETS.map((row) => (
                  <tr key={row.name}>
                    <td>
                      <div className="cell-check">
                        <Win98Checkbox aria-label={`Select ${row.name}`} />
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
                    <td className="col-action">
                      <div className="cell-action">
                        <Win98Button variant="sm" title={`Add ${row.name} to wallet`}>
                          🦊
                        </Win98Button>
                      </div>
                    </td>
                    <td className="col-action">
                      <div className="cell-action">
                        <Win98Button variant="sm" title={`Explorer ${row.name}`}>
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
            <Win98Button>查看更多链 ▾</Win98Button>
          </div>
        </Win98Window>

        <Win98Window title="跨链桥.exe">
          <Win98GroupBox label="来源">
            <Win98Select options={CHAINS} value={chain} onValueChange={setChain} />
          </Win98GroupBox>
          <Win98GroupBox label="每链金额">
            <div className="amount-row">
              <Win98Button>$</Win98Button>
              <Win98Input type="text" defaultValue="0.01" />
              <Win98Button variant="minmax">[最小]</Win98Button>
              <Win98Button variant="minmax">[最大]</Win98Button>
            </div>
          </Win98GroupBox>
          <Win98GroupBox label="发送">
            <Win98Input
              className="send-address"
              placeholder="0x..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Win98Button variant="send" disabled={!address.trim()}>
              发送
            </Win98Button>
          </Win98GroupBox>
          <Win98GroupBox label="接收">
            <div className="bridge-grid">
              {["Arbitrum", "Ethereum", "Base", "Optimism"].map((name) => (
                <Win98Button key={name} variant="md">
                  {name}
                </Win98Button>
              ))}
            </div>
          </Win98GroupBox>
        </Win98Window>

        <Win98Window title="字体预览.exe" fullWidth>
          <p className="font-preset-note">
            组件库默认字体栈：JetBrains Mono + Sarasa Mono SC + 宋体 fallback
          </p>
          <div className="font-samples">
            <div className="font-sample-row">
              <div className="font-sample-label">Sarasa Mono SC</div>
              <div className="font-sample-text font-cjk-sarasa size-14">
                14px · 跨链桥接 gas 补给 · 主网列表
              </div>
            </div>
            <div className="font-sample-row">
              <div className="font-sample-label">JetBrains Mono</div>
              <div className="font-sample-text font-mono size-14">
                14px · 0x1234abcd · Mainnets.exe
              </div>
            </div>
          </div>
        </Win98Window>
      </Win98Desktop>

      <p className="demo-note">
        <code>@win98/ui</code> · Next.js 组件库 Playground
      </p>

      <Win98Dialog
        open={dialogOpen}
        title="连接钱包.exe"
        onClose={() => setDialogOpen(false)}
        onConfirm={() => setDialogOpen(false)}
      >
        <div className="modal-icon-row">
          <div className="modal-icon">🦊</div>
          <div className="modal-message">
            <strong>连接你的钱包</strong> 以使用跨链桥与主网列表功能。
            <div className="modal-field">
              <label htmlFor="wallet-name">钱包名称</label>
              <Win98Input id="wallet-name" placeholder="MetaMask" />
            </div>
          </div>
        </div>
      </Win98Dialog>
    </>
  );
}
