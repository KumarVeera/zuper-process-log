# Prompt 033: Consistent spacing between cards and sections

- **Date:** 2026-10-25
- **Input type:** Text prompt, then a correction mid-task
- **Tool:** Claude Code (Claude Opus 5.5) · React app · built-in browser preview
- **Phase:** 4 · Test & refine (crew app + office web app)

## Prompt (verbatim)

> gap between all the codes one after one . It should be 24 pixels. So the consistency should be everywhere, not only home page, it should be all the pages. Including the web app also.

## Correction (verbatim, sent while the work was in progress)

> the gap between section to section and cards, it should be 16 pixel, because 24 pixel is huge, the white space are more, so reduce into 16 pixel. It should be applicable for only the mobile version.

## How the AI read it
- "codes" was read as "cards".
- The correction applies to the crew **mobile** app (16px). The office **web** app keeps the 24px from the first prompt.

## What the AI did
- **Measured first.** A script ran in the browser on every crew screen and the office pages. Card-to-card gaps were 8, 10, 12 or 14px depending on the screen.
- **One token, `--card-gap`:**
  - **16px in the crew app:** quick-action tiles, Home cards, job lists, shot list, uploads, tasks, timeline, job detail, Jobs metrics and crew cards, profile stats, and section headings (which now start 16px below the card above). Also the extra 4px under the Jobs header.
  - **24px in the office web app and customer page** (scoped to `.office, .share`): page sections, the 2 × 2 review cards, key metrics, job cards, photo evidence cards, and customer share groups.
  - **Unchanged:** spacing inside cards (rows, chips, photo thumbnails).
- **Narrow phones:** at 320px the profile stats no longer fitted "completed", so below 360px they now stack one per row with the number beside the label.
- **Re-measured all pages:**
  - **Crew app** (375 and 320px): every card-to-card gap is 16px. The only larger gaps have a section heading in between.
  - **Office** (1366 and 375px): every card-to-card gap is 24px, apart from the photo groups, which have a heading in between.
  - No horizontal overflow anywhere.
- **README and handoff:** both now describe the token.

## Follow-up: commit (text prompt, verbatim)

> Commit the spacing change and log, regenerate the process-log site, and commit that too.

- Committed the app change and the log, then regenerated the process-log site and committed it separately.

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
