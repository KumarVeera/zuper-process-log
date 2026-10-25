# Prompt 038: Review now above key metrics

- **Date:** 2026-10-25
- **Input type:** Text prompt
- **Tool:** Claude Code (Claude Opus 5.5) · React app · built-in browser preview
- **Phase:** 4 · Test & refine (office web app)

## Prompt (verbatim)

> Review Now section should be above the key metrics card.

## What the AI did
- **New order** (`DashboardScreen.jsx`): the "HR-2041 has 15 photos waiting for your review · Review now" card moved above the Key metrics card. The dashboard now reads: heading → Review now → Key metrics → Jobs by status.
- **Comment:** the one at the top of the component is updated to match.
- **When nothing is waiting:** once the job is marked reviewed, the card disappears as before, and Key metrics comes first.
- **Measured** at 1366 and 375px: the order is right, Review now → Key metrics is 24px, and nothing overflows.
- **App README and handoff:** updated.

## Follow-up: commit (text prompt, verbatim)

> Commit the Review now change and log, regenerate the process-log site, and commit that too.

- Committed the app change and the log, then regenerated the process-log site and committed it separately.

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
