# Prompt 009: Convert the design into React / HTML / CSS code

- **Date:** 2026-10-24
- **Input type:** Text prompt (via `/anthropic-skills:figma-code-connect`; the first attempt was interrupted)
- **Tool:** Claude Code (Claude Opus 5.5) · React 18 + Vite 5 · built-in browser preview for testing
- **Phase:** 3 · Prototype

## Prompt (verbatim)

> create a HTML format what is there in the design, let's say example React.js, CSS, HTML file, and image file, and if needed another file what is required for the particular code. So just convert the design into code language. And it should be stored in the repository also.

## What the AI did
- **Overruled the skill choice:** Code Connect maps *published Figma components* to *existing code*, and
  this project had neither. The real need was design-to-code, so I did that directly.
- Explained the files first, then built `app/crew-mobile/`: a React 18 + Vite app with an HTML entry,
  `App.jsx` flow, 13 screen components plus the skip sheet, shared components, `styles.css` with design
  tokens, the `demo-house.svg` image, sample data, the real quality check, and a README.
- `?state=<name>` opens any of the 15 states, the same as the canvas snapshots.
- Added `.claude/launch.json` so the app runs in the preview pane.
- **Tested in the browser at 375×812:**
  - checklist → framing → demo Blurry → "Check this photo" → Use anyway → tag + note → Save → "Saved to job folder · 3 of 7"
  - **Real photo path:** a generated sharp image showed "Looks good"; a dark flat image showed "Looks blurry / Too dark", with no demo badge
  - non-image file → "That file isn't a photo"
  - skip sheet: focus moves to the title, Mark is disabled until a reason is picked, then the item shows as skipped
  - uploads: 6 waiting → 1 fails → retry → all uploaded
  - finish: 3 missing, Submit disabled until a reason is picked
  - no console errors
- **Bug found and fixed:** the status briefly read "Uploading · 0 left" before "All photos uploaded".

## Output
- [app/crew-mobile/](../../app/crew-mobile/) · run: `npm --prefix app/crew-mobile run dev`

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:

## Follow-up (2026-10-24)
> Commit the working tree changes with a sensible message.

- AI committed the Design canvas source, the React app and prompt logs 008–009.
