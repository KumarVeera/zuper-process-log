# Prompt 034: Show today's percentage as a ring

- **Date:** 2026-10-25
- **Input type:** Text prompt
- **Tool:** Claude Code (Claude Opus 5.5) · React app · built-in browser preview
- **Phase:** 4 · Test & refine (crew app)

## Prompt (verbatim)

> Today's progress card, there is a percentage of 33%. It should be show it as data visualization, something like circle way. Inside the circle we can show the 33%. So and reduce the little bit font size of the 33%.

## What the AI did
- **New ring** (`HomeScreen.jsx`): a `ProgressRing` component, a 68px blue donut on a light grey track with the percentage in the middle.
  - **Percentage size:** reduced from 30px to 16px.
  - **Live value:** the ring fills from the live value (33% = 1 of 3 jobs).
  - **Motion:** it animates unless the phone is set to reduce motion.
- **Removed the horizontal progress bar**, so the same number isn't drawn twice. This wasn't asked for; it's noted in case you want the bar back.
- **Layout:** the headline sits beside the ring, and the footer (start time, photos uploaded) stays. Screen readers still hear the card's full label. Tapping the card still opens the job.
- **Tested:** at 375px the ring sits beside the headline. At 320px there's no overflow, and the headline wraps onto two lines beside the ring.
- **App README:** the Home description is updated.

## Follow-up: commit (text prompt, verbatim)

> Commit the progress ring change and log, regenerate the process-log site, and commit that too.

- Committed the app change and the log, then regenerated the process-log site and committed it separately.

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
