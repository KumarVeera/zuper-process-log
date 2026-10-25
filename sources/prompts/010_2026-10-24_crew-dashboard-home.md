# Prompt 010: Dashboard home for the crew

- **Date:** 2026-10-24
- **Input type:** Text prompt (via `/anthropic-skills:figma-generate-design`), likely dictated by voice
- **Tool:** Claude Code (Claude Opus 5.5) · React app · built-in browser preview
- **Phase:** 3 · Prototype (iteration)

## Prompt (verbatim)

> So from homepage, change the design layout, something like how many jobs he has done for the day or week or month, and how many he completed and how many are left. Let's say pending, completed, ongoing, something like that. It's like a dashboard perspective. Need to create entire layout. Based on that, the particular crew people can open the checklist and take it forward from there. So let's say open the photo checklist and take a photo and doing the process, I mean fixing the roof, whatever damaged, and taking the photo and upload into a particular folder. Then the process will go like something like that. The error, loading, and in the photo checklist, what he has to take. So again, same flow, only you have to create. But only the thing is, the homepage should change as dashboard perspective.

## Decision asked
- **Where should it go?** The Figma skill needs a Figma file, but the prototype lives in the React app and
  the Design canvas. Answer: **React app only**.

## What the AI did
- Noticed the app folder had been **renamed by me** to `app/roofing-crew-mobile/` (checked: identical to
  the commit, a pure rename). Moved the new file there and updated `.claude/launch.json`.
- Replaced "Today's jobs" with a **dashboard home** (`DashboardScreen.jsx`):
  - greeting and offline / last-saved line
  - sync bar
  - Today / This week / This month switch
  - 4 stat cards (Total, Completed, Ongoing, Pending) that filter the list; tap again to clear
  - "Ongoing now" card with live photo progress and *Open photo checklist*
  - job list with status chips
- Sample data: 11 jobs this week and 27 earlier completed jobs this month. Counts are consistent:
  today 3 = 1/1/1, week 11 = 7/1/3, month 38 = 34/1/3.
- HR-2041 is live: saving photos updates the progress, and submitting moves it to Completed (the Ongoing card disappears).
- Loading skeleton redrawn to match the dashboard. Back buttons now say "Back to dashboard".
- The rest of the flow is unchanged.
- **Tested in the browser at 375×812:**
  - loading skeleton and dashboard
  - period counts and filter toggling
  - open checklist → photo → Looks good → save → back, with the dashboard showing 3 of 18
  - finish with a reason → submit → HR-2041 shown as Completed
  - no console errors
- **Fixed:** the sync bar didn't span the full width on the dashboard.

## Output
- [app/roofing-crew-mobile/src/screens/DashboardScreen.jsx](../../app/roofing-crew-mobile/src/screens/DashboardScreen.jsx)

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:

## Follow-up (2026-10-25)
> Commit the working tree changes with a sensible message.

- AI committed the dashboard, the app folder rename and the prompt 010 log. It also stopped tracking macOS `.DS_Store` files.
