# Session Handoff: where things stand

Read this first in any new session, then `CLAUDE.md` (logging rules) and `process-log/PROCESS_LOG.md`.
Last updated: 2026-10-25, after prompt 030 (process-log site made review-ready). Prompt 027 (connect crew and office through a shared store) is still **planned but not built**: see its prompt file. The next prompt file is **`031_…`**.

## The assignment (one line)
Zuper take-home (Senior AI-Native Product Designer): design how a roofing crew takes job photos and how the office
finds and shares them as proof. Deliverables: **prototype link** (crew phone + one office or customer view) and a
**process log** (prompts that mattered, what was thrown away, where the AI got it wrong). Brief: https://spd-take-home.vercel.app/

## What exists
| Area | Where | State |
|---|---|---|
| Requirements, assumptions, UX plan | `docs/01`–`03` | Done |
| Crew and office flows plus SVG diagrams | `docs/04`, `docs/05`, `docs/diagrams/` | Done |
| Usability check (6 points, evidence) | `docs/06-usability-check.md` | Done, all pass |
| **React crew app** (main prototype) | `app/roofing-crew-mobile/` | Working, tested at 320/375px |
| **Office portal + customer page** | same app, `?view=office` / `?view=share` (`src/office/`) | Dashboard (4 read-only metrics, Review now card, job tabs with cards, Needs review first) → job review page (job · required photos · missing/questionable · trust · next) → photo panel with approve / reject → compare → share. Prompts 024, 026, 028, 029, tested at 1366/375/320px |
| Claude Design canvas (earlier prototype) | `prototype/crew-mobile/` · https://claude.ai/artifact/CJucueKqgAgMs9pMcq8Dbz (v19, private) | Older flow; Manrope font. Not updated with the later Home/Jobs redesign |
| Process log | `process-log/PROCESS_LOG.md`, `process-log/prompts/001–030`, `TOOLS_AND_SKILLS.md` | Up to date |

## React app at a glance
- Run: `npm --prefix app/roofing-crew-mobile run dev` (preview config: `.claude/launch.json`, name `roofing-crew-mobile`).
  Jump to any screen with `?state=` (list in `app/roofing-crew-mobile/README.md`).
- **Home:** Today's progress (live) → Quick actions (2×2: Today / My schedule / Action required / For my review; each opens its own page) → My schedule (by day, Next up card).
- **Tabs:** Home · Jobs · Photos · Profile (bottom nav; hidden only during full-screen capture).
- **Jobs** → **Job detail** (Overview / Photo diary / Work order / Assets).
- **Capture:** simulated camera + Gallery + phone camera → quality check (real on actual photos) → Retake / Choose a different photo → note and tags → Save to job folder (toast) → uploads (simulated).
- **Style:** Manrope; page bg `#F5F5F7`; headings `#2B2826`, labels `#3D3A37`, sub text `#514F4D`; blue primary; green / orange / red / blue status tints; text plus icon, never colour alone; 44px targets.
- **Honesty rule:** no GPS, "verified" or original-file claims; demo photos and uploads are labelled as simulated.

## Not done yet / likely next
- ~~Office or customer view~~: built (prompt 024). It leaves out the doc 05 GPS map, "Verified" badges and AI tag confirmation (not built in the crew app).
- Deploy the prototype to a shareable link, and share the Design canvas if it's used.
- Fill the "My notes" sections in the prompt files; write the UX case study from the process log.
- Optional: update the Design canvas to match the current React app.

## Working agreements with the user
- Log **every** prompt verbatim (see `CLAUDE.md`). Commit only when asked, ending with the Co-Authored-By line.
- The user often invokes Figma skills, but the target has been the **React app** (no Figma file exists).
- Test changes in the browser preview at phone size before reporting.
