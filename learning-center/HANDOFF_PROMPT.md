# Handoff prompt for the jeffliulab.com agent

Paste the block below to the agent that maintains **jeffliulab.com**. It assumes
that agent can clone/read a public GitHub repo and edit the website's codebase.

---

You are integrating an external content repo into the **Learning Center** of
jeffliulab.com as a new **course system** (reading-only for now).

**Source repo:** `https://github.com/jeffliulab/high-school-cs-notes`

**Do this:**

1. Clone (or `git pull`) the repo. Read these three files first — they fully
   specify the job:
   - `learning-center/INTEGRATION.md` — the integration guide (read in full).
   - `learning-center/courses.json` — the course/section/lesson manifest (the
     single source of truth for structure and ordering).
   - `learning-center/diagram-theme.css` — required CSS for the inline-SVG
     figures; import it or fold it into our design system.

2. Build the course system **re-rendered in jeffliulab.com's own design system**
   (NOT an iframe of the original MkDocs site). Content is plain Markdown +
   KaTeX + inline SVG + code fences (C++ / Java); there are no image assets.
   Use route scheme `/learn/<course.id>/<section.id>/<lesson.id>` and preserve
   the manifest's ordering as the teaching order.

3. Follow INTEGRATION.md precisely, especially:
   - Markdown pipeline must allow **raw HTML / inline SVG**, render **KaTeX**
     (`$...$`, `$$...$$`, `\(...\)`, `\[...\]`), highlight `cpp`/`java`, and use
     a 2-space-indent-safe list parser. Import `diagram-theme.css` (map its
     dark-mode block to our dark selector) or diagrams render invisible.
   - **Rewrite the 289 relative `.md` cross-links** to our routes using the
     `{content-path → route}` index built from `courses.json` (§4 of the guide).
   - It's **bilingual**: default `zh`; English bodies don't exist yet, so fall
     back to Chinese (`hasEnglishContent: false`). Course/section nav labels
     have English in `title_en`.
   - **Reading-only:** each competition lesson carries an empty `problems: []`
     hook for a future judge — render it only if non-empty; do NOT build a judge.

4. Spot-check before publishing: a math+diagram lesson
   (`docs/Silver/prefix_sums.md`) and a code-heavy lesson
   (`docs/Gold/knapsack.md`) must render correctly (math, SVG figure, captions,
   highlighted code, working cross-links).

**Scope guardrails:** integrate the 5 courses / 109 lessons as-is. Do not
rewrite lesson content, do not add problems/judging, do not translate. If the
manifest references a `content` path missing on disk (or vice versa), report the
drift instead of guessing.

When done, summarize: routes created, how many lessons rendered, any lessons
whose figures/math/links didn't render cleanly.

---

*Keep this in sync:* if the content updates, the website agent just needs to
`git pull` and (if `mkdocs.yml`'s nav changed) re-run
`python3 learning-center/build_manifest.py` before re-rendering.
