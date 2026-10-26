# Session Handoff: where things stand

Read this first in any new session, then `CLAUDE.md` (logging rules) and `process-log/PROCESS_LOG.md`.
Last updated: 2026-10-26, after prompt 048 (v2 office jobs table). **The next prompt file is `049_…`.**

**Version 2:** `v2/` is a copy of the v1 app (prompt 044), with preview config `roofing-crew-mobile-v2`. **New prototype work goes in `v2/`.** Since prompt 045, v2 connects the crew phone and the office through a shared localStorage store (`v2/src/store/jobStore.js`), with a side-by-side demo at `?view=split`. Since prompt 047, v2 has its own design (task-first, bold): Inter, near-black ink, one blue accent; a crew Home with the job on site and the next shot, plus a Camera tab; an office with an icon rail and one page (Next up → filter tiles → jobs table, since prompt 048) and A / R / J / K shortcuts in the photo panel. The "Crew mobile app at a glance" and "Office web app at a glance" sections below describe **v1**; see `v2/README.md` for v2. The case-study deck still shows v1. `app/roofing-crew-mobile/` is v1: frozen, and the version that is deployed. See `v2/README.md`.
Prompt 027 (connect crew and office through a shared store) is still **planned but not built**: see its prompt file.

## The assignment (one line)
Zuper take-home (Senior AI-Native Product Designer): design how a roofing crew takes job photos and how the office
finds and shares them as proof. Deliverables: **prototype link** (crew phone + one office or customer view) and a
**process log** (prompts that mattered, what was thrown away, where the AI got it wrong). Brief: https://spd-take-home.vercel.app/

## Live links (deployed by the user to Vercel)
| What | URL | Local folder |
|---|---|---|
| Prototype (crew phone; office at `?view=office`) | https://zuper-product-designer-role-assignm.vercel.app/ | `app/roofing-crew-mobile/` |
| Process-log website | https://zuper-process-log-nine.vercel.app/ | `process-log-site/` |

- **No Git remote** is set up, so `git push` does nothing. To update a live site, run `npx vercel --prod` inside its folder, or connect the Vercel projects to a GitHub repo.
  - **Prototype Vercel settings:** root `app/roofing-crew-mobile`, Vite, `npm run build`, output `dist`.
  - **Process-log Vercel settings:** root `process-log-site`, Other, no build, output `.`.
- **Live sites lag local commits** until the user redeploys.

## What exists
| Area | Where | State |
|---|---|---|
| Requirements, assumptions, UX plan | `docs/01`–`03` | Done |
| Crew and office flows plus SVG diagrams | `docs/04`, `docs/05`, `docs/diagrams/` | Done |
| Usability check (6 points) | `docs/06-usability-check.md` | Done, all pass |
| Heuristic + accessibility review | `docs/07-heuristic-and-accessibility-review.md` | Done (prompt 039): 0 axe violations in 35 scans; recommendations open (below) |
| **Crew mobile app** | `app/roofing-crew-mobile/` (default view) | Working; tested at 375 / 320px |
| **Office web app + customer page** | same app, `?view=office` / `?view=share` (`src/office/`) | Working; tested at 1366 / 1024 / 375 / 320px |
| Process-log website | `process-log-site/` (generated) | Up to date with prompts 001–041 |
| UX case study deck | `case-study/Zuper-UX-Case-Study.pptx` (22 slides + notes), built by `case-study/build-deck.js` | Up to date with prompts 001–043 (refreshed in prompt 043). After UI changes, recapture `case-study/screens/` and rebuild. |
| Claude Design canvas (earliest prototype) | `prototype/crew-mobile/` · https://claude.ai/artifact/CJucueKqgAgMs9pMcq8Dbz (private) | Old flow; not maintained |
| Process log | `process-log/PROCESS_LOG.md`, `process-log/prompts/001–043`, `TOOLS_AND_SKILLS.md` | Up to date |

## Crew mobile app at a glance
- **Run:** `npm --prefix app/roofing-crew-mobile run dev`, preview config `roofing-crew-mobile` in `.claude/launch.json`. Jump to any screen with `?state=…` (list in the app README).
- **Home:** greeting → Quick actions (2 × 2 coloured tiles, no card) → Today's progress (blue ring with % inside, start time, photos uploaded; tap opens the job) → My schedule (by day, Next up card).
- **Tabs:** Home · Jobs · Photos · Profile. **Capture:** simulated camera, gallery or phone camera → real sharpness / light check → retake or replace → note and tags → save (toast) → simulated uploads with retry.
- **Spacing:** `--card-gap` is **16px** between cards and sections. Profile stats stack below 360px.

## Office web app at a glance
- **Layout:** white **sidebar** with Dashboard · Schedule · Customers, then Crew phone view · Settings · Log out and the user. Schedule, Customers, Settings and Log out aren't built; they say so when tapped. Below 860px the sidebar is a slide-in menu; the page behind it is `inert`.
- **Page:** fills the width, 24px from the sidebar and the right edge (16px on phones). `--card-gap` is **24px**.
- **Dashboard:** Review now card → four read-only Key metrics → **Jobs by status** card: tabs Ongoing · Completed · **Needs review** (open by default) · Total jobs; job cards; search with no button (Enter opens an exact job ID).
- **Job review page:**
  1. **Job card:** ID, status, address, type; Date · Crew · Photos in one row; review progress; Start → Continue review → Mark job reviewed.
  2. **Needs attention:** issues with owner tags (Your decision · Customer · Waiting on crew · For info) and one action each. Updates live.
  3. **Required photos:** one row per phase with only the gaps; all 18 shots behind "Show all".
  4. **Evidence check:** four tiles: Time stamps, Photo quality, Taken by, Location.

  Below them is the photo grid with filters. The side panel has Approve / Reject (with a reason), Undo and Next to review; ← → and Esc work. Compare, and Share (the customer page at `?view=share`).
- **Data:** a fixed end-of-day snapshot of HR-2041 (`src/office/evidence.js`), **not live from the crew phone**.

## Style and rules
- **Type and colour:** Manrope; page `#F5F5F7`; headings `#2B2826`, labels `#3D3A37`, sub text `#514F4D`; blue primary. Status always has text and an icon, never colour alone.
- **Targets:** 44px tap targets on touch screens.
- **Honesty rule:** no GPS, "verified" or original-file claims. Demo photos and simulated uploads are labelled. Unbuilt features say so.

## How each prompt has been handled (keep doing this)
1. Make the change. Test it in the browser preview at the relevant sizes (crew 375 / 320px; office 1366 and 375 / 320px), checking for overflow and that tapping still works.
2. **Log it** per `CLAUDE.md`:
   - a new `process-log/prompts/NNN_…md` with the prompt verbatim
   - a Timeline entry in `PROCESS_LOG.md`
   - the tables (AI mistakes, prompts that mattered) when relevant
   - this file's "next prompt" number

   Update the app README when behaviour changes.
3. Wait for the user to ask before committing. When they do:
   - append their commit message as a "Follow-up (verbatim)" in that prompt file
   - commit app + log, ending with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`
   - run `node process-log-site/tools/generate.mjs && node process-log-site/tools/check.mjs`
   - commit `process-log-site` separately ("Regenerate the process-log site with prompt NNN")
4. **Accessibility re-scans:** copy `axe-core` into `app/roofing-crew-mobile/public/__audit/` only for the scan, then **delete it**. Never commit it.
5. Leave `.claude/launch.json` uncommitted. It holds local preview entries.

## Not done yet / likely next
- **Shared store, crew ↔ office:** built in **v2** (prompt 045). v1 still uses the fixed snapshot. Not done: an axe re-scan of v2's new states, and a test across two separate windows.
- **Recommendations from docs/07:**
  - office "Approve all remaining" with undo
  - metric tiles that look tappable but aren't
  - a short help entry
  - explicit undo for Skip and for Mark job reviewed
- **User's own content** (never write it for them):
  - **My notes:** "My notes" in the prompt files are blank (0 of 42). The site hides the empty blocks.
  - **Reflection:** the final reflection on the process-log site is a draft.
  - **Unconfirmed AI-errors row:** the prompt 001 row in "Where the AI got it wrong" still needs your answer.
  - **Timeline placeholders:** the five "_(review and fill in)_" lines (prompts 003, 004, 005, 007 and 008).
- **Redeploy** both sites after committing, and optionally connect GitHub.

## Working agreements with the user
- Log **every** prompt verbatim. Commit only when asked.
- The user often invokes Figma skills, but the target is the **React app**; no Figma file exists.
- Explain changes in plain language. Say what was tested and what wasn't. Don't invent URLs, notes or results.
