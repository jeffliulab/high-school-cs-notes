# 构建指南 BUILD GUIDE

本文档说明 `high-school-cs-notes` 站点的结构约定、内容写作规范与构建/部署流程。

## 一、站点结构

```
docs/
├── index.md            # 首页（grid cards + 友情链接）
├── AP_CSA/
│   ├── index.md        # 考纲总览
│   ├── unit1/ … unit4/ # 每个单元：index.md（单元总览）+ 各内容页
├── Bronze/  Silver/  Gold/  Platinum/
│   ├── index.md        # 考纲总览
│   └── *.md            # 各模块内容页（扁平，按 nav 分组）
└── site_extra_styles/  # CSS / JS 资源
```

5 个顶级目录顺序固定：**AP CSA → USACO Bronze → Silver → Gold → Platinum**。

## 二、内容来源

- **AP CSA**：College Board《AP Computer Science A Course and Exam Description, Effective Fall 2025》四单元框架。
  - Unit 1 使用对象与方法（15–25%）
  - Unit 2 选择与迭代（25–35%）
  - Unit 3 类的创建（10–18%）
  - Unit 4 数据集合（30–40%）
- **USACO**：[usaco.guide](https://usaco.guide) 各级别（Bronze/Silver/Gold/Platinum）模块结构。

## 三、单页内容模板（完整教程）

```markdown
# 标题

一句话定位（这是什么、在考纲/竞赛中的地位）。

> **难度**：⭐⭐☆☆☆
> **前置知识**：[[相关页]]

## 核心概念
（讲解……）

## 代码实现
（AP 用 Java；USACO 用 C++，可附 Java/Python）

## 复杂度分析

## 常见陷阱 / 例题

## 小结
```

规范：
- **不写 YAML frontmatter**（首页等需要 `hide:` 的除外）。
- 列表缩进 **2 空格**。
- KaTeX：行内 `$...$`，块 `$$...$$`。
- 配图优先内联 `<svg>`，配色只用 `var(--dia-*)`，包 `<div class="diagram">` + `<p class="figure-caption">`。

## 四、中英双语（i18n）

- suffix 模式：中文 `foo.md`（默认语言 zh），英文 `foo.en.md`。
- 当前阶段**只写中文**；英文页缺失时 i18n 自动回退显示中文，站点照常构建。
- 顶层/分组标题的英文翻译在 `mkdocs.yml` 的 `plugins.i18n…nav_translations` 中维护。

## 五、新增内容的标准流程

1. 在对应目录新建 `xxx.md`（中文）。
2. 在 `mkdocs.yml` 的 `nav` 中登记该页（放到正确的级别/章节下）。
3. 运行 `python hooks/generate_dropdown.py` 重新生成顶栏下拉。
4. 如新增了顶层/分组标题，在 `nav_translations` 补英文翻译。
5. `mkdocs build --strict` 验证无坏链。

## 六、构建与部署

```bash
# 安装依赖（首次）
pip install "mkdocs-material[all]" "mkdocs-static-i18n[material]" mdx-truly-sane-lists

# 本地预览
python hooks/generate_dropdown.py
mkdocs serve            # http://127.0.0.1:8000

# 构建检查
mkdocs build --strict

# 部署：push 到 main 后 GitHub Actions 自动 gh-deploy；也可手动
mkdocs gh-deploy --force
```

GitHub 远程仓库约定：`jeffliulab/high-school-cs-notes`，Pages 地址 `https://jeffliulab.github.io/high-school-cs-notes/`。
