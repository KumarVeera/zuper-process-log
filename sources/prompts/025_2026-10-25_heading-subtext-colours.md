# Prompt 025: Heading and sub-text colours

- **Date:** 2026-10-25
- **Input type:** Text prompt
- **Tool:** Claude Code (Claude Opus 5.5) · React app · built-in browser preview
- **Phase:** 4 · Test & refine (visual)

## Prompt (verbatim)

> Change the heading, title color to #2b2826 and sub text  color should be #514f4d for both mobile and web app

## What the AI did
- Changed two design tokens in `src/styles.css`, which the crew phone app and the office web app share:
  - `--text` changed from `#161A1F` to **`#2B2826`**. This colour is used for headings, titles and dark body text.
  - `--muted` changed from `#5B636E` to **`#514F4D`**. This colour is used for sub text.
- Replaced two hard-coded copies of the old colours:
  - the percentage in the Home progress ring
  - the dropdown arrow in the office filters
- Checked the computed colours in the browser on crew Home and on the office job page: headings and titles are `rgb(43, 40, 38)` and sub text is `rgb(81, 79, 77)`.
- Contrast is still well above WCAG AA on `#F5F5F7` and on white.

## Note
- `--text-2` (`#3A414B`, used for secondary labels in chips and banners) was not changed, because the prompt named only headings and sub text. It is still a cool grey next to the new warm tones, so it may need matching.

## Follow-up (same day, text prompt, verbatim)

> Yes, change --text-2 to a warm grey that matches the new palette.

- `--text-2` changed from `#3A414B` to **`#3D3A37`**, a warm grey between the heading and sub-text colours.
  Checked in the browser on the office banner: `rgb(61, 58, 55)`.

## Follow-up: commit (text prompt, verbatim)

> Commit the office view and colour changes with the log updates.

- Committed the office view (prompt 024), the colour changes and the log updates in one commit.

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
