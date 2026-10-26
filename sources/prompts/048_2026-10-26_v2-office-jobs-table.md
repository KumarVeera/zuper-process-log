# Prompt 048: v2, rethink the office review inbox

- **Date:** 2026-10-26
- **Input type:** Text prompt (sent with the `figma-generate-design` skill)
- **Tool:** Claude Code (Claude Opus 5.5) · desktop app
- **Phase:** 4 · Test & refine (v2)

## Prompt (verbatim)

> Now I can see review inbox after the sidebar. So it's a kind of side panel for beside the sidebar. So can you change the review inbox something different perspective or change the style or structure so it will be easy to scan also. Now it's like as a user perspective, it's little bit confusing, so can you change the design style or structure of the office view?

## How the AI read it
- **The problem:** the inbox column next to the icon rail read as a second sidebar, so the page had two navigation-like columns before any content. The job rows were also hard to compare, because each row was a small card with the facts in different places.
- **The skill:** the `figma-generate-design` skill builds Figma screens, but there is no Figma file. As in earlier prompts, the change was made in the v2 React app.

## What the AI did
- **Removed the inbox column** (`JobInbox.jsx` deleted). The office is now the slim icon rail plus one page.
- **New overview structure** (`DashboardScreen.jsx`, new `JobsTable.jsx`, `office.css`), top to bottom:
  1. The dark **"Next up for you"** card (unchanged).
  2. **Jobs this week:** four tiles (Needs review · Ongoing · Completed · Total jobs) that are now **real filter tabs**, with arrow keys and Home / End. The active tile has a dark outline and a "Showing" label, so it doesn't rely on colour alone. This also closes the docs/07 finding that the metric tiles looked tappable but weren't.
  3. **The jobs table** those tiles filter, in fixed columns: **Job** (ID and address) · **Type** · **Date** · **Photos** (bar, "15 / 18" and a note such as "15 to review") · **Status** · **Action** (*Review* for HR-2041, "Not in demo" for the others). Search sits in the table header; Enter opens an exact job ID.
- **Responsive:**
  - below 1100px the Type column is hidden
  - below 860px each row becomes a labelled card with a full-width Review button, and the rail becomes the slide-in menu
- **Job page:** the back link now reads "All jobs". The job page, photo panel and shortcuts are unchanged.

## Tested
- **1440px** (headless capture): the overview reads top to bottom with no second column.
- **1024px:**
  - the Needs review filter shows 2 jobs, and Completed shows 6
  - the right arrow moves to Total jobs (13)
  - searching "cedar" finds HR-2038
  - "HR-2041" plus Enter opens the job
  - no overflow
- **320px:** rows show as cards, with no overflow.
- **axe-core 4.10.2:**
  - **First pass:** 41 screens, 0 violations, but the "14 Elm Street" address button was only 22px tall on phones.
  - **Fix:** 44px on touch screens, 28px on desktop.
  - **Re-scan:** 0 violations in 41 scans, with no targets under 44px. axe was served from a temporary folder and deleted afterwards.

## Where the AI got it wrong
- **The prompt 047 inbox column itself:** putting a list column beside the rail read as a second sidebar. You flagged it, and this prompt replaces it.
- **The address button** in the new table was 22px tall on phones; axe caught it, and it's fixed.

## Follow-up: commit (text prompt, verbatim)

> Commit v2 and the log for prompt 048, regenerate the process-log site, and commit that too.

- Committed v2 and the log for prompt 048, then regenerated the process-log site, checked it and committed it separately.

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
