# Prompt 046: v2, quick-action cards styled like the progress card

- **Date:** 2026-10-26
- **Input type:** Text prompt
- **Tool:** Claude Code (Claude Opus 5.5) · desktop app
- **Phase:** 4 · Test & refine (v2)

## Prompt (verbatim)

> From quick action, we have different type of cards are there. Today, my schedule action record for my review. And different background color and stroke are there. Can you change the background same as today's progress card? Plus stroke also. But inside the icon, and other label plus text should be same. Only change the stroke and background color. As same as progress card.

## What the AI did
- **Change** (`v2/src/styles.css`): the four crew Home quick-action tiles (Today, My schedule, Action required, For my review) now have the Today's progress card's white background and `#E7EAE4` 1px stroke. One rule scoped to `.quick-card .qa` does it.
- **Unchanged, as asked:**
  - the coloured icon squares (green, orange, red, blue)
  - labels, numbers, layout, size and corner radius
- **Shadow:** left out at first, because the prompt said to change only the background and stroke; added in the follow-up below.
- **Office Key metrics:** they use the same tile classes but keep their tinted colours, because the rule only applies inside the crew Quick actions section.
- **Tested** (v2 preview):
  - **375px:** the computed background and border of all four tiles match the progress card, and the icon colours are unchanged.
  - **320px:** no sideways scrolling.
  - **Office at 1366px:** the metric tiles are still tinted.
- **README:** the v1 vs v2 table and the Home description are updated. v1 is unchanged.

## Follow-up (text prompt, verbatim)

> Also give the quick-action tiles the same soft shadow as the progress card.

- Added the progress card's shadow (`var(--shadow)`) to the same scoped rule. At 375px the tiles' computed shadow is identical to the progress card's, with no overflow. Office Key metrics are unchanged.

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
