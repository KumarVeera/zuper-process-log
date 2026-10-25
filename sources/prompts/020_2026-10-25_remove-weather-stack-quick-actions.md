# Prompt 020: Remove weather, one quick action per row, plain quick-action pages

- **Date:** 2026-10-25
- **Input type:** Text prompt
- **Tool:** Claude Code (Claude Opus 5.5) · React app · built-in browser preview
- **Phase:** 3 · Prototype (iteration)

## Prompt (verbatim)

> Remove cloudy option from the design. No need to add the cloudy options, and the quick actions are there, right? Make it as single card in a row. Now it's showing in a row two cards are there. Make it in a row single cards, so totally four cards should be there, one after one. And once we click on today's card, it will go to the particular page. In that particular page, again we are showing the card. No need to show the card over there, just show the title and today's details. Like that for my schedule also, once you click the my schedule, it will go to the particular page. Again, the design is showing my schedule card also. Remove that, only show the heading and other details. Like that, it will go for action record for my review also.

## What the AI did
- **Removed the weather card** from Home, along with its data and styles. Home is now greeting → Today's progress → Quick actions → My schedule.
- **Quick actions are one per row:** four stacked rows, each with icon, label, count and chevron, keeping the green / orange / red / blue tints.
- **Quick-action pages:** removed the tinted summary card. Each page now shows only the **heading** (with a small count line, e.g. "3 · Today's jobs in order") and then the details.
- **Tested in the browser:**
  - no weather on Home; the quick actions grid is a single column
  - all four pages: correct title, no summary card, and the content starts straight after the heading

## Bug the AI introduced and fixed
- When deleting the weather and banner styles, the AI used a pattern that cut lines wherever `.weather` or
  `.quick-banner` appeared **mid-line**, not only at the start. That wiped the four quick-action colour rules
  and fused the My schedule card's spacing rule into a dead selector.
- **Caught by the AI's own check:** a scan of the stylesheet plus a read-back of computed styles in the browser.
  The colour rules and the spacing were restored and verified (all four tints and borders correct; schedule card margin 12px 16px).
- **Lesson:** delete CSS rules by exact selector, not by a loose pattern.

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
