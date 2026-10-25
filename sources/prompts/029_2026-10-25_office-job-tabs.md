# Prompt 029: Job tabs on the office dashboard, Needs review first

- **Date:** 2026-10-25
- **Input type:** Text prompt (via `/figma-generate-design`), likely dictated by voice
- **Tool:** Claude Code (Claude Opus 5.5) · React app · built-in browser preview · pptxgenjs + Keynote for the deck
- **Phase:** 4 · Test & refine (office view)

## Prompt (verbatim)

> after review, after review cut, there are all jobs cuts are there. So can you change into tab format, ongoing, completed, needs to review, total job. So can you make it as a tab, and needs to review should be active stage, and others are once you click the particular tab, then only it will show. So again, it should be card format only. And these changes reflect in process log, UX case study, and prototype.

## How the AI read it
- `/figma-generate-design` was invoked, but there is no Figma file, so the change went into the React office portal, as before.
- "Reflect in process log, UX case study and prototype" meant three updates:
  1. this log entry
  2. regenerating the process-log website
  3. rebuilding the case-study deck with a new dashboard screenshot

## What the AI did
- **Prototype:** below the Review now card, "All jobs" became **Jobs** with four tabs in the key-metrics order:
  - **Tabs:** Ongoing · Completed · **Needs review** · Total jobs, each with a count. Needs review is selected when the page opens.
  - **Cards:** each tab shows only its own jobs, as cards.
  - **Keyboard:** the tabs follow the ARIA tab pattern (← / →, Home / End).
  - **Search:** searches all jobs, so a job ID is never hidden behind the wrong tab, and the count says "found across all tabs".
  - **Phones:** at narrow widths the tabs turn into a 2 × 2 grid. A scrolling row hid the active tab off-screen at 320px; this was caught in the browser and fixed.
- **Process log:** this file, a timeline entry and a regenerated process-log site.
- **Case study:** recaptured the office dashboard screenshot and updated slide 11. The deck now reads its prompt, commit and AI-error counts from the repository instead of hard-coding them.

## Where the AI got it wrong
- The first version of the tabs scrolled sideways on phones and hid the active tab. Found at 320px and fixed with the 2 × 2 grid.

## Follow-up: commit (text prompt, verbatim)

> Commit the job tabs, process log, regenerated site and the case-study folder together.

- Committed in one commit, including the case-study deck, its build script and screenshots, which were committed for the first time.

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
