# Prompt 015: Show only the phone mockup on desktop

- **Date:** 2026-10-25
- **Input type:** Text prompt with a screenshot and the pasted intro text
- **Tool:** Claude Code (Claude Opus 5.5) · React app · built-in browser preview
- **Phase:** 3 · Prototype (presentation)

## Prompt (verbatim)

> It is showing in the browser remove this and only show the mobile mockup prototype

Pasted (the panel to remove):
> Photo proof, from the roof. Interactive prototype of the crew's phone. Sample data, simulated camera and uploads. · Dashboard and job schedule · Job detail: diary, work order, assets · Guided capture with quality check · Saves to the job folder, uploads later

## What the AI did
- Removed the desktop intro panel (added in Prompt 014) from `App.jsx`, along with its styles and the unused icon import.
- Centred the phone and its background glow. On phones the app still fills the screen.
- My first cleanup broke a media query (it left a nested `@media`). Caught it on reading the CSS back and fixed it before testing.
- **Checked in the browser:** at 1280×900 there is no intro and the phone is centred (445px either side); at 375×812 the app is full screen with no frame.

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:

## Follow-up (2026-10-25)
> Commit the working tree changes with a sensible message.

- AI committed the Manrope redesign (Prompt 014) and the desktop intro removal (Prompt 015) together.
