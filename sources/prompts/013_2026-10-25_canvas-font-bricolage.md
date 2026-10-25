# Prompt 013: Switch the Design canvas to Bricolage Grotesque

- **Date:** 2026-10-25
- **Input type:** Text prompt (button reply)
- **Tool:** Claude Code (Claude Opus 5.5) · Claude Design canvas
- **Phase:** 3 · Prototype (visual polish)

## Prompt (verbatim)

> Also switch the Claude Design canvas prototype to Bricolage Grotesque.

## What the AI did
- Updated all 16 artboards in `prototype/crew-mobile/project/` (Main + 15 snapshots):
  - the Google Fonts link now loads Bricolage Grotesque
  - the root `font-family` now names it
  - in Main, the two SVG labels in the framing guide now use it too
- Checked that no old font references were left (0 remaining, 16 updated), then republished the canvas in one
  update: <https://claude.ai/artifact/CJucueKqgAgMs9pMcq8Dbz> (version 18).
- The canvas and the React app now share the same typeface.
- Not checked visually: viewing the canvas needs a claude.ai sign-in in the browser pane.

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:

## Follow-up (2026-10-25)
> Commit the working tree changes with a sensible message.

- AI committed the font change for the React app and the Design canvas source, plus the prompt 012–013 logs.
