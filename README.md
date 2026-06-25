# win98css

Windows 98 风格 UI：设计规范、HTML Demo 与 Next.js 组件库（源自 [gas.zip](https://www.gas.zip/) 视觉提取）。

后续组件实现可参考 [98.css](https://jdan.github.io/98.css/)（见设计文档 §11.1）。

## 目录

| 路径 | 说明 |
|------|------|
| [gas-zip-win98-design.md](./gas-zip-win98-design.md) | 设计规范（色彩、边框、组件、动效） |
| [gas-zip-win98-demo.html](./gas-zip-win98-demo.html) | 单文件 HTML Demo |
| [win98-ui/](./win98-ui/) | Next.js / React 组件库 + Playground |
| [fonts/](./fonts/) | Sarasa Mono SC woff2 自托管字体 |

## 快速预览

```bash
# HTML Demo
python3 -m http.server 8080
# 打开 http://localhost:8080/gas-zip-win98-demo.html

# Next.js Playground
cd win98-ui && npm install && npm run dev
# http://localhost:3000
```

## 组件库

详见 [win98-ui/README.md](./win98-ui/README.md)。
