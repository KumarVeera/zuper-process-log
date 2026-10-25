# Prompt 012: Switch the typeface to Bricolage Grotesque

- **Date:** 2026-10-25
- **Input type:** Text prompt (via `/anthropic-skills:figma-generate-design`)
- **Tool:** Claude Code (Claude Opus 5.5) · React app · built-in browser preview
- **Phase:** 3 · Prototype (visual polish)

## Prompt (verbatim)

> Add this font to all the places Bricolage Grotesque

## What the AI did
- Found that the font is set in exactly two places: the Google Fonts link in `index.html` and the `--font`
  token in `styles.css`. Everything else inherits it (buttons, inputs, the framing-guide SVG text).
- Replaced Plus Jakarta Sans with **Bricolage Grotesque** (variable, weights 400–800, optical size 12–96) in both.
- **Checked in the browser at 375×812:**
  - the font loaded (400 and 800 in use), and the computed `font-family` on the title, buttons, cards and nav is Bricolage Grotesque
  - Home, Checklist and the camera guide have no overflow or wrapping problems
- Added the typeface to the README's design rules.
- **Not changed:** the Claude Design canvas from Prompt 008 still uses Plus Jakarta Sans. Only the React app was updated.

## Output
- [app/roofing-crew-mobile/index.html](../../app/roofing-crew-mobile/index.html), [src/styles.css](../../app/roofing-crew-mobile/src/styles.css)

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
