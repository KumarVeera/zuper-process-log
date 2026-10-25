# Prompt 037: Slimmer search bar; a better title than "Jobs"

- **Date:** 2026-10-25
- **Input type:** Text prompt
- **Tool:** Claude Code (Claude Opus 5.5) · React app · built-in browser preview
- **Phase:** 4 · Test & refine (office web app)

## Prompt (verbatim)

> in web portal, reduce the search bar height and change the title from jobs to any other suggested title. It's related to the particular code.

## How the AI read it
- "Related to the particular code" was read as "related to that card": the title should describe the card's content.

## What the AI did
- **Search bar** (`office.css`):
  - **Desktop:** 48px → **40px** tall, with a 1px border and a slightly smaller corner radius.
  - **Phones:** kept at **44px** so it stays easy to tap.
- **Title** (`DashboardScreen.jsx`): "Jobs" → **"Jobs by status"**, because the card is organised by the Ongoing / Completed / Needs review / Total jobs tabs. The tab list's hidden screen-reader label changed to "Job status" so it doesn't repeat the heading.
  - **Other titles considered:** "Job board", "Job tracker".
- **Measured:** search height 40px at 1366px and 44px at 375px; no overflow.
- **App README:** updated.

## Follow-up: approve and commit (text prompt, verbatim)

> Keep Jobs by status. Commit the change and log, regenerate the process-log site, and commit that too.

- "Jobs by status" confirmed. Committed the app change and the log, then regenerated the process-log site and committed it separately.

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
