# learning-center/

Integration layer that lets **jeffliulab.com** consume this repo as a
**course system** in its Learning Center — re-rendered in the site's own design
(not an iframe), reading-only for now with a reserved hook for a future judge.

| File                  | Purpose |
|-----------------------|---------|
| `courses.json`        | Machine-readable manifest: courses → sections → lessons, with content paths and ordering. **Generated** from `mkdocs.yml`'s `nav`. |
| `build_manifest.py`   | Regenerates `courses.json` from the nav. Run after any nav change: `python3 learning-center/build_manifest.py` (needs PyYAML). |
| `INTEGRATION.md`      | Full integration guide for the website agent: manifest schema, Markdown/KaTeX/SVG conventions, link rewriting, i18n, the problems hook, sync. |
| `diagram-theme.css`   | Portable CSS the inline-SVG figures depend on (`var(--dia-*)` + `.diagram`/`.figure-caption`). Import on lesson pages. |
| `HANDOFF_PROMPT.md`   | Copy-paste prompt to hand to jeffliulab.com's agent so it knows how to pull and integrate. |

**Quick start (website agent):** read `HANDOFF_PROMPT.md` → `INTEGRATION.md` →
`courses.json`. **Content authoring is unchanged** — edit Markdown under `docs/`
and register pages in `mkdocs.yml`; `courses.json` is the derived contract.
