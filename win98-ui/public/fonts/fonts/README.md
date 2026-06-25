# Web Fonts

## Sarasa Mono SC

| File | Weight | Size |
|------|--------|------|
| `SarasaMonoSC-Regular.woff2` | 400 | ~4.6 MB |
| `SarasaMonoSC-SemiBold.woff2` | 600 | ~4.6 MB |
| `SarasaMonoSC-Bold.woff2` | 700 | ~4.7 MB |

- **Source**: [be5invis/Sarasa-Gothic](https://github.com/be5invis/Sarasa-Gothic) v1.0.39
- **License**: SIL OFL 1.1 — `Sarasa-OFL.txt`
- **Subset**: CJK 基本汉字区 `U+4E00-9FA5` + CJK 标点/全角符号

### Usage

```html
<link rel="preload" href="/fonts/SarasaMonoSC-Regular.woff2" as="font" type="font/woff2" crossorigin />
<link rel="stylesheet" href="/fonts/sarasa-mono-sc.css" />
```

```css
body {
  font-family: "JetBrains Mono", "Sarasa Mono SC", "SimSun", "Songti SC", monospace;
}
```

- 英文/数字 → JetBrains Mono
- 中文（woff2 已加载）→ Sarasa Mono SC
- 中文（woff2 未加载）→ 宋体 SimSun / Songti SC
