#!/usr/bin/env python3
"""Generate learning-center/courses.json from mkdocs.yml's nav.

This is the single source of truth bridge: the MkDocs `nav` drives the course
structure consumed by jeffliulab.com's Learning Center. Re-run after editing
`nav` in mkdocs.yml so the manifest stays in sync.

    python3 learning-center/build_manifest.py

Output: learning-center/courses.json
"""

import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MKDOCS = os.path.join(ROOT, "mkdocs.yml")
OUT = os.path.join(ROOT, "learning-center", "courses.json")

# Titles that mark an "overview" page rather than a normal lesson.
OVERVIEW_TITLES = {"考纲总览", "单元总览"}


def load_mkdocs():
    try:
        import yaml
    except ImportError:
        raise SystemExit("PyYAML required: pip install pyyaml")

    # MkDocs uses a few `!!python/name:` tags; we don't need them, so use a
    # loader that ignores unknown tags.
    class _Loader(yaml.SafeLoader):
        pass

    def _ignore(loader, suffix, node):
        return None

    _Loader.add_multi_constructor("tag:yaml.org,2002:python/name:", _ignore)
    _Loader.add_multi_constructor("!!python/name:", _ignore)
    with open(MKDOCS, encoding="utf-8") as f:
        return yaml.load(f, Loader=_Loader)


def slugify(text):
    text = (text or "").strip().lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")


def stem(path):
    return os.path.splitext(os.path.basename(path))[0]


def en_for(title, translations):
    return translations.get(title, title)


def lesson_entry(title, path, translations, with_problems):
    e = {
        "id": stem(path),
        "title": title,
        "title_en": en_for(title, translations),
        "content": f"docs/{path}",
    }
    if with_problems:
        # Reserved hook for the future Judge0 / LeetCode-style problem set.
        # Each entry will become {"id","title","judge","testdata","difficulty"}.
        e["problems"] = []
    return e


def section_id(title, lessons, translations):
    # Prefer a stable id from a shared subfolder (e.g. AP_CSA/unit1 -> unit1).
    dirs = {os.path.dirname(l["content"]) for l in lessons}
    if len(dirs) == 1:
        d = next(iter(dirs))
        leaf = os.path.basename(d)
        if leaf and leaf not in ("docs",) and not leaf.isupper():
            return leaf
    return slugify(en_for(title, translations)) or "section"


def parse_course(title, items, translations):
    is_usaco = title.strip().lower().startswith("usaco")
    course = {
        "id": slugify(title),
        "title": title,
        "title_en": en_for(title, translations),
        "kind": "competition" if is_usaco else "exam-prep",
        "supportsProblems": is_usaco,
        "overview": None,
        "lessons": [],   # section-less lessons (rendered before sections)
        "sections": [],
    }
    for item in items:
        (label, value), = item.items()
        if isinstance(value, str):
            if label in OVERVIEW_TITLES:
                course["overview"] = f"docs/{value}"
            else:
                course["lessons"].append(
                    lesson_entry(label, value, translations, is_usaco)
                )
        else:  # a section (list of lessons)
            sec = {"id": None, "title": label,
                   "title_en": en_for(label, translations),
                   "overview": None, "lessons": []}
            for sub in value:
                (sl, sv), = sub.items()
                if sl in OVERVIEW_TITLES:
                    sec["overview"] = f"docs/{sv}"
                else:
                    sec["lessons"].append(
                        lesson_entry(sl, sv, translations, is_usaco)
                    )
            sec["id"] = section_id(label, sec["lessons"], translations)
            course["sections"].append(sec)
    return course


def main():
    cfg = load_mkdocs()
    nav = cfg["nav"]
    i18n = next(p["i18n"] for p in cfg["plugins"] if isinstance(p, dict) and "i18n" in p)
    en = next(l for l in i18n["languages"] if l.get("locale") == "en")
    translations = en.get("nav_translations", {})

    courses = []
    for entry in nav:
        (title, value), = entry.items()
        if isinstance(value, list):  # a course (skip the scalar 首页)
            courses.append(parse_course(title, value, translations))

    manifest = {
        "schemaVersion": 1,
        "title": cfg.get("site_name"),
        "title_en": en.get("site_name"),
        "author": cfg.get("site_author"),
        "sourceRepo": "jeffliulab/high-school-cs-notes",
        "sourceSite": cfg.get("site_url"),
        "contentRoot": "docs",
        "defaultLang": "zh",
        "languages": ["zh", "en"],
        "hasEnglishContent": False,  # en pages fall back to zh for now
        "conventions": "See learning-center/INTEGRATION.md",
        "courses": courses,
    }

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
        f.write("\n")

    n_lessons = sum(
        len(c["lessons"]) + sum(len(s["lessons"]) for s in c["sections"])
        for c in courses
    )
    print(f"Wrote {OUT}")
    print(f"  {len(courses)} courses, {n_lessons} lessons")


if __name__ == "__main__":
    main()
