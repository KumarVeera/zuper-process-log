# Prompt 044: Start a version 2 in its own folder

- **Date:** 2026-10-26
- **Input type:** Text prompt
- **Tool:** Claude Code (Claude Opus 5.5) · desktop app
- **Phase:** 2 · Explore (version 2)

## Prompt (verbatim)

> Can I make version 2 for this problem statement and that should save as separate folder in the Zuper main folder?

## Decisions asked
- **What v2 is:** answer: **copy v1, then evolve.** v2 starts as an exact copy of the current app; the open items get built there (the live crew ↔ office link from prompt 027, the docs/07 recommendations). v1 stays untouched.
- **What goes in the folder:** answer: **the prototype only.** The process log, docs and case-study deck stay shared, and logging carries on from prompt 044.

## What the AI did
- **New folder `v2/`** at the top of the project: a copy of `app/roofing-crew-mobile/`, without `node_modules` or `dist`.
  - `package.json` is renamed `crew-mobile-v2`, version 0.2.0.
  - The browser tab title ends in "· v2", so it can't be mistaken for v1.
- **README:** a v2 header explains where v2 came from, what it is for, and how it differs from v1 (nothing yet). Relative links to `docs/` are fixed for the new folder depth.
- **Preview:** a new `roofing-crew-mobile-v2` entry in `.claude/launch.json` (port 5174; it fell back to another free port when 5174 was busy). The file stays uncommitted.
- **Checked:** `npm install` and `npm run build` pass. In the preview, the crew Home and the office job page both load from v2, with no console errors.
- **Not changed:** v1 (`app/roofing-crew-mobile/`) and its deployed site.

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
