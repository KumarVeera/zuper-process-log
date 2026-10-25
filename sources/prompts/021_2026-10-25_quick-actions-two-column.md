# Prompt 021: Quick actions back to two per row, stacked icon / label / number

- **Date:** 2026-10-25
- **Input type:** Text prompt (via `/anthropic-skills:figma-generate-design`), likely dictated by voice
- **Tool:** Claude Code (Claude Opus 5.5) · React app · built-in browser preview
- **Phase:** 3 · Prototype (iteration)

## Prompt (verbatim)

> make it quick action, change into in a row two cards. Let's say today and my schedule should be in the same row, and inside the card there should be icon, text, and how many are completed or going to complete. There are numbers, right? So how are you going to design? It's something like one after one you can design. First it should come the icon, then text. It should be light gray, something like that. And the number should be bold, increase the font size. And the icon background color, the icon card size should be 28 pixel into 28. I mean, with this 28 and height is also 28. Based on that, you can create all the cards. So again, I'm telling, it should be in a row two columns, not one after one. Remove that and make it as in a row two column.

## What the AI did
- Quick actions in **two columns**: Today + My schedule on row 1, Action required + For my review on row 2.
- Each card stacks **icon (28×28 tinted square, 16px glyph) → label in light grey → count, large and bold** (28px, weight 800).
  The tints and borders stay; the arrow is removed because the whole card is the tap target.
- **Accessibility adjustment:** the first light grey (#8A9099) was only about 3:1 on the tinted cards. Moved to
  **#666D78**, the lightest grey that passes **4.5:1 on all four tints** (lowest 4.71). It still reads as light grey next to the dark numbers.
- **Tested in the browser:**
  - 2×2 positions; icon 28×28; label 13px grey; number 800 / 28px
  - order is icon → label → number
  - all four cards still open their pages

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:

## Follow-up (2026-10-25)
> Commit the working tree changes with a sensible message.

- AI committed the Home iterations from prompts 016–021 in one commit.
