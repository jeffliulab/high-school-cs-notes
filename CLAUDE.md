# 项目说明

本项目是一个基于 MkDocs + Material 主题的**高中信息学学习笔记**网站，覆盖 AP CSA 与 USACO 竞赛（Bronze/Silver/Gold/Platinum）。

## 技术栈

- MkDocs + mkdocs-material 主题
- mkdocs-static-i18n（suffix 模式）中英双语：中文 `x.md` 默认，英文 `x.en.md`
- KaTeX 数学公式渲染
- GitHub Pages 自动部署（GitHub Actions）
- 自定义顶栏悬停下拉导航（tab_dropdown.js，由 nav 自动生成）

## 关键文件

- `mkdocs.yml` — 站点核心配置，包含导航结构（nav）与 i18n 配置
- `docs/site_extra_styles/javascripts/tab_dropdown.js` — 顶部标签悬停下拉菜单（**生成产物，勿手改**）
- `docs/site_extra_styles/stylesheets/extra.css` — 自定义样式（h2 色带、下拉菜单、diagram 配色变量 `--dia-*`）
- `docs/index.md` — 首页卡片导航
- `hooks/generate_dropdown.py` — 从 nav 生成 tab_dropdown.js

## 目录结构

5 个顶级目录，顺序固定：**AP CSA → USACO Bronze → Silver → Gold → Platinum**。

- AP CSA 按 2025 秋季最新 CED 四单元结构：`docs/AP_CSA/`，第一个子页是「考纲总览」(`index.md`)，其后 unit1~unit4 各有「单元总览」+ 内容页。
- USACO 各级别按 usaco.guide 模块结构：`docs/{Bronze,Silver,Gold,Platinum}/`，第一个子页是「考纲总览」(`index.md`)，其后按章节（入门/完全搜索/图论…）分组挂内容页。

## 开发规范

- 每个级别目录下必须有 `index.md` 作为「考纲总览」导航页；AP CSA 每个 unit 也有 `index.md` 单元总览。
- 笔记**不写 YAML frontmatter**，以 `# 标题` 开头 + 一句定位；进阶页可加 `> **难度** / **前置知识**` 引用块。
- 列表缩进使用 **2 空格**。
- 数学公式使用 KaTeX：行内 `$...$`，独立块 `$$...$$`。
- 配图优先用内联 `<svg>`（Tufte 风格），配色**只能用** `var(--dia-*)` CSS 变量，包在 `<div class="diagram">` 中，配 `<p class="figure-caption">` 字幕。
- 代码示例：AP CSA 用 Java；USACO 用 C++（可附 Java/Python）。
- **添加新内容时必须同步更新三处**：mkdocs.yml 的 nav、运行 `python hooks/generate_dropdown.py`、对应 `index.md` 总览页链接。

## 常用命令

- `mkdocs serve` — 本地预览（http://127.0.0.1:8000）
- `mkdocs build --strict` — 构建并检查坏链
- `python hooks/generate_dropdown.py` — 改 nav 后重新生成下拉菜单
- `mkdocs gh-deploy --force` — 手动部署到 GitHub Pages

## 构建指南

详细的构建规范请参考 `BUILD_GUIDE.md`。
