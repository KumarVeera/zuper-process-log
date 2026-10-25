# Prompt 018: Weather after quick actions, plain progress card, My schedule with Cards/Table switch

- **Date:** 2026-10-25
- **Input type:** Text prompt (via `/anthropic-skills:figma-generate-design`), likely dictated by voice
- **Tool:** Claude Code (Claude Opus 5.5) · React app · built-in browser preview
- **Phase:** 3 · Prototype (iteration)

## Prompt (verbatim)

> Cloudy card details, it should go after quick action. And for today's progress, there will be a green stroke are there only of can you remove that. It should be plain, something like how the background should be there for quick actions. So same like that, you can add it for today's progress card also. And after quick action, you may add my schedule cards also. It should not go to new page. It should be after the quick action. Then user will get to know what is my next schedule. It can be switch between card plus table also. So that could help for the user to understand the things. So need two options. One is table, other one is card options. So default should be card. So after quick action, need to show my schedules.

## How the AI read it
- "Cloudy card" = the weather card.
- Order chosen: **Today's progress → Quick actions → Weather → My schedule.** Both weather and schedule were
  asked to come "after quick action"; weather is compact, so it goes first and the longer schedule list sits at the bottom.

## What the AI did
- Moved weather below Quick actions.
- Today's progress: removed the green top stroke; it is now a plain white card with a light border, like Quick actions.
- **My schedule section on Home** (not a new page):
  - the next jobs booked by the office
  - a **Cards / Table** segmented switch, **Cards by default** (`aria-pressed`)
  - **Cards:** compact card with a date/time block, job ID, address, type and photos needed, "By Sean Doyle, office", and a chevron
  - **Table:** semantic `<table>` with a caption and When / Job / Status columns; the job cell is a button that opens the job
  - "2 jobs not booked yet" link → Jobs, filtered to Unscheduled
- Added grid and table icons for the switch.
- **Tested in the browser:**
  - section order; Cards is the default with 3 items; the progress card border is now neutral
  - Table has 3 rows with the right headers; tapping a row opens the job, and Back keeps the Table choice
  - switching back to Cards works
- **Fixed after the visual check:**
  - the first card version reused full job rows, which were cramped inside the card; replaced with a compact schedule card
  - the table's When column squeezed the Job column; the day now sits over the time

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:

## Follow-up (2026-10-25)
> Put My schedule before the weather card.

- I overruled the AI's ordering choice. Home order is now **progress → quick actions → My schedule → weather**.
- Checked in the browser: section order is correct, with a 12px gap between schedule and weather.
