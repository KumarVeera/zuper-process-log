# Prompt 032: Restyle Today's progress from a reference image

- **Date:** 2026-10-25
- **Input type:** Text prompt with an attached reference image (screenshot of a progress card)
- **Tool:** Claude Code (Claude Opus 5.5) · React app · built-in browser preview
- **Phase:** 4 · Test & refine (crew app)

## Prompt (verbatim)

> Today's progress card in the homepage crew application. Change the structure or style into what I have attached now. Similar to or similar inspiration you can take and design the today's progress card.

## The reference (as attached)
A white rounded card with these parts:
- "TODAY'S PROGRESS" in small grey capitals
- "1 of 3 jobs complete" in bold, with a large blue "33%" on the right
- a slim blue progress bar on a light grey track
- a grey footer with "8:12 AM started" on the left and "5 photos uploaded" on the right

The image is not stored in the repository.

## What the AI did
- **New layout** (`HomeScreen.jsx`): label and headline on the left, a large blue percentage on the right, then a slim progress bar, then a footer with the start time and photos uploaded. All the numbers are still live (jobs complete, %, start time, photos uploaded).
- **Removed:** the old progress ring, the green top stroke, the two tinted stat tiles, and the visible "Continue 14 Elm Street" link.
- **The whole card is now a button** that opens the live job. A full spoken label covers screen readers ("Today's progress: 1 of 3 jobs complete, 33%. Started 8:12 AM, 5 photos uploaded. Open 14 Elm Street.").
- **Motion:** the bar animates its width, except when the phone is set to reduce motion.
- **Tested at 375 and 320px:**
  - the card matches the reference layout
  - nothing scrolls sideways
  - the footer stays on one line
  - tapping the card opens 14 Elm Street
- **App README:** the Home description is updated.

## Follow-up: commit (text prompt, verbatim)

> Commit the progress card change and log, regenerate the process-log site, and commit that too.

- Committed the app change and the log, then regenerated the process-log site and committed it separately.

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
