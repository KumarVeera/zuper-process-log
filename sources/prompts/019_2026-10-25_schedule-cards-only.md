# Prompt 019: My schedule as cards only, more intuitive

- **Date:** 2026-10-25
- **Input type:** Text prompt
- **Tool:** Claude Code (Claude Opus 5.5) · React app · built-in browser preview
- **Phase:** 3 · Prototype (iteration)

## Prompt (verbatim)

> Now my schedule there are cards and table views are there, right? Only show the card view and remove the table and cards from the right that's enough. And make it more intuitive for the card view it's looking like plain now. More intuitive, it's easy to access also at the same time. make it more intuitive and seamless experience for the user.

## What the AI did
- Removed the Cards / Table switch and the table view, along with their state, action and CSS.
- **Redesigned the card view:**
  - **Grouped by day** with a header and job count ("Today · 1 job", "Tomorrow · Sun 25 · 2 jobs")
  - **Next up** card: blue tint, "Next up" chip, a large time (1:30 PM), the address, type and photos needed as icons, a "Booked by Sean Doyle" avatar and a clear "View job ›"
  - **Later jobs:** compact rows with a big time and AM/PM, an orange day rail, the address, and type and photo icons
  - header now has "3 jobs booked by the office" and **See all** (opens the My schedule page)
  - "2 jobs waiting for a date" link opens Jobs filtered to Unscheduled
- The whole card is the tap target, with a descriptive label for screen readers and a gentle press state.
- **Tested in the browser:**
  - no switch and no table
  - Next up → 88 Birch Lane; a later row → 3 Larch Road
  - See all → the My schedule page; the waiting link → Jobs with Unscheduled selected
- Swapped a gradient on the Next up card for a flat tint (calmer, matches the rest of the app).

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
