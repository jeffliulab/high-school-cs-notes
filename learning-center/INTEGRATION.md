# Learning Center Integration Guide

This document tells the **jeffliulab.com agent** how to pull this repo and turn
it into a **course system** inside the site's Learning Center — re-rendered in
the site's own design system (not embedded as an iframe).

Repo: `github.com/jeffliulab/high-school-cs-notes`
Current standalone site (reference rendering): https://jeffliulab.github.io/high-school-cs-notes/

---

## 1. What you are integrating

A bilingual (zh default / en fallback) high-school CS curriculum, **109 lessons
across 5 courses**:

| Course id        | Title           | Kind        | Code lang | Problems hook |
|------------------|-----------------|-------------|-----------|---------------|
| `ap-csa`         | AP CSA          | exam-prep   | Java      | no            |
| `usaco-bronze`   | USACO Bronze    | competition | C++       | yes (empty)   |
| `usaco-silver`   | USACO Silver    | competition | C++       | yes (empty)   |
| `usaco-gold`     | USACO Gold      | competition | C++       | yes (empty)   |
| `usaco-platinum` | USACO Platinum  | competition | C++       | yes (empty)   |

The content is **plain Markdown + KaTeX math + inline SVG diagrams + code
fences**. There are **no raster image assets** to copy — every figure is an
inline `<svg>`. The original site is MkDocs; you are NOT reusing the MkDocs
theme, only the Markdown content + the structure manifest below.

---

## 2. The course structure: `courses.json`

`learning-center/courses.json` is the machine-readable manifest. It is
**generated from `mkdocs.yml`'s `nav`** by `learning-center/build_manifest.py`
— treat it as the single source of truth for navigation. Re-generate after any
nav change (see §7).

### Top level

```jsonc
{
  "schemaVersion": 1,
  "title": "高中计算机笔记",
  "title_en": "High School CS Notes",
  "contentRoot": "docs",          // all `content` paths are repo-relative under here
  "defaultLang": "zh",
  "languages": ["zh", "en"],
  "hasEnglishContent": false,     // en lesson bodies fall back to zh for now (see §5)
  "courses": [ Course, ... ]
}
```

### Course

```jsonc
{
  "id": "usaco-silver",
  "title": "USACO Silver",
  "title_en": "USACO Silver",
  "kind": "competition",          // "competition" | "exam-prep"
  "supportsProblems": true,       // true ⇒ lessons carry a "problems" array (see §6)
  "overview": "docs/Silver/index.md",   // the syllabus/overview page; may be null
  "lessons": [ Lesson, ... ],     // section-less lessons rendered BEFORE sections
                                  //   (e.g. Bronze's "USACO 竞赛介绍" intro)
  "sections": [ Section, ... ]
}
```

### Section (a unit / topic group)

```jsonc
{
  "id": "prefix-sums",
  "title": "前缀和",
  "title_en": "Prefix Sums",
  "overview": "docs/.../index.md",  // section overview page; may be null
  "lessons": [ Lesson, ... ]
}
```

### Lesson

```jsonc
{
  "id": "prefix_sums",                         // unique within its course
  "title": "前缀和入门",
  "title_en": "前缀和入门",                     // == title until en titles are translated
  "content": "docs/Silver/prefix_sums.md",     // the Markdown file to render
  "problems": []                               // ONLY on competition courses; see §6
}
```

**Recommended route scheme:** `/learn/<course.id>/<section.id>/<lesson.id>`
(and `/learn/<course.id>` for the course overview). Use the ordering in the
manifest verbatim — it is the intended teaching order.

---

## 3. Rendering the Markdown — feature checklist

The content relies on these Markdown features. Configure your renderer
(markdown-it / remark / MDX / etc.) to match, or figures and math will break.

1. **KaTeX math.** Delimiters used in the source:
   - inline: `$...$` and `\(...\)`
   - display: `$$...$$` and `\[...\]`
   Render with KaTeX (the original uses `katex` + `auto-render`). Load KaTeX
   CSS. Do NOT let your Markdown processor eat `$`/`\` before KaTeX runs (use a
   math plugin, or render KaTeX after Markdown on the resulting DOM).

2. **Inline SVG diagrams.** Figures are authored as raw HTML:
   ```html
   <div class="diagram">
     <svg viewBox="..." ...> ... fill="var(--dia-blue)" ... </svg>
   </div>
   <p class="figure-caption">caption text</p>
   ```
   - Your Markdown renderer **must allow raw HTML/inline SVG** (MDX: fine;
     markdown-it: enable `html:true`; remark: `rehype-raw`). Do not sanitize
     `<svg>` away.
   - The SVGs reference `var(--dia-*)` custom properties. **Import
     `learning-center/diagram-theme.css`** (or fold its rules into your design
     system) on lesson pages, and map its dark-mode block to your dark selector.
     Without these variables the diagrams render invisible.

3. **Code fences.** Languages: `cpp` (USACO) and `java` (AP CSA). Apply your
   normal syntax highlighter. ~400 fenced blocks total.

4. **Difficulty / prerequisite header.** Many lessons begin with a blockquote:
   ```markdown
   > **难度**：⭐⭐☆☆☆
   > **前置知识**：[数组](../Bronze/intro_data_structures.md)
   ```
   Renders fine as a normal blockquote. Optionally lift it into a styled
   "lesson meta" chip — the star string is the difficulty, the link is a
   prerequisite lesson.

5. **Other extensions in play:** `attr_list` (e.g. `{ .md-button }` on overview
   pages), `md_in_html`, and "grid cards" markup on `index.md` overview pages
   (`<div class="grid cards" markdown>`). The overview pages are landing pages —
   you may prefer to **render your own course/section landing UI from the
   manifest** instead of the source `index.md`, and use `index.md` only as
   fallback copy. Lesson pages do not use grid cards.

6. **List indent is 2 spaces**, nested lists included. Use a CommonMark-correct
   parser (the original uses `mdx_truly_sane_lists`).

7. **No YAML frontmatter** on lesson pages. Only some `index.md` overview pages
   have a small `---\nhide: ...\n---` block (a MkDocs directive) — strip it.

---

## 4. Internal links — MUST be rewritten

There are **289 relative `.md` cross-links** between lessons, e.g.
`[数组](../Bronze/intro_data_structures.md)` or `[ArrayList](arraylist.md)`.
Left as-is they 404 in your app. Rewrite each link:

1. Resolve the relative target against the **current lesson's directory** under
   `docs/` → an absolute repo path like `docs/Bronze/intro_data_structures.md`.
2. Look that path up in `courses.json` by `content` to find its
   `course.id` / `section.id` / `lesson.id`.
3. Replace the href with your route, e.g.
   `/learn/usaco-bronze/getting-started/intro_data_structures`.

Build a `{ content-path → route }` index from the manifest once, then do a
single pass over each rendered lesson. Anchor fragments (`#section`) on the same
page pass through unchanged. There are **no wikilinks** (`[[...]]`) and **no
image links** to handle.

---

## 5. Bilingual (i18n)

- **Default language is `zh`**; every lesson body is Chinese today.
- `hasEnglishContent: false` — there are **no `*.en.md` files yet**. English
  readers should fall back to the Chinese body. Don't block on translations.
- **Navigation labels** (course + section titles) DO have English in the
  manifest's `title_en`. Per-**lesson** `title_en` currently equals the Chinese
  `title` (lesson titles aren't translated yet) — treat `title_en == title` as
  "untranslated" if you want to badge it.
- When English bodies are added later they will appear as sibling files
  `foo.en.md` next to `foo.md`; re-running the manifest build can be extended to
  surface a `content_en` field. For now, design the UI so a language is a
  per-lesson capability, not a global assumption.

---

## 6. The `problems` hook (future, do not build yet)

Per the current scope this is a **reading-only** course system. But every
lesson in a `competition` course already carries an empty `"problems": []`
array so the schema is forward-compatible with a LeetCode-style judge.

When that phase lands, each entry is intended to look like:

```jsonc
{
  "id": "usaco-1234-haybales",
  "title": "Hay Bales",
  "judge": "judge0",                 // compile+run backend
  "statement": "docs/Silver/problems/haybales.md",
  "testdata": "...",                 // USACO official test data is publicly downloadable
  "difficulty": "⭐⭐☆☆☆",
  "starterCode": { "cpp": "...", "java": "..." }
}
```

For now: **render the `problems` array if non-empty, otherwise ignore it.** Do
not stub a judge. Keeping the field lets you add problems later without a schema
migration. (USACO official test data is downloadable per-problem; CSES data is
not — prefer USACO problems when the judge is built.)

---

## 7. Keeping in sync

1. `git pull` the repo.
2. If `mkdocs.yml`'s `nav` changed, regenerate the manifest:
   ```bash
   python3 learning-center/build_manifest.py   # needs PyYAML
   ```
   This rewrites `learning-center/courses.json` from the nav. Lesson `content`
   files are read straight from `docs/`.
3. Re-run your link-rewrite + render pass.

The author edits content as Markdown under `docs/` and registers pages in
`mkdocs.yml`'s `nav`; `courses.json` is the derived contract you consume. If you
ever see a `content` path in the manifest that doesn't exist on disk (or a
`docs/*.md` not in the manifest), the nav and files drifted — report it rather
than guessing.

---

## 8. Suggested build order for you (the website agent)

1. Read `courses.json`; build the `{content-path → route}` index.
2. Stand up routes + navigation (courses → sections → lessons) from the manifest.
3. Wire a Markdown pipeline with: raw-HTML/SVG passthrough, KaTeX, syntax
   highlighting, 2-space-safe lists. Import `diagram-theme.css`.
4. Run the link-rewrite pass (§4).
5. Render overview/landing pages from the manifest (optionally fold in `index.md`).
6. Leave `problems` unrendered (empty today).
7. Spot-check a math-heavy + diagram-heavy lesson (e.g.
   `docs/Silver/prefix_sums.md`) and a code-heavy one (e.g.
   `docs/Gold/knapsack.md`) before going live.
