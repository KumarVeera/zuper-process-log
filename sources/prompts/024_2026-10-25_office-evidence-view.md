# Prompt 024: Build the office evidence review view

- **Date:** 2026-10-25
- **Input type:** Text prompt
- **Tool:** Claude Code (Claude Opus 5.5) · React app · built-in browser preview
- **Phase:** 3 · Prototype

## Prompt (verbatim)

> Build the office evidence review view from docs/05 in the React app.

## What the AI did
- Added the office side to the same React app as a second entry point, so one deploy serves both views:
  - `?view=office` is the office desktop.
  - `?view=share` is the page a customer or insurer gets from a share link.
  - Anything else is the crew phone.
  - A small **Office view** pill sits outside the phone frame on desktop. The office top bar links back to **Crew phone**.
- Built the doc 05 screens around Sean's gutter dispute on job HR-2041:
  - **D1 Find a job:** the search field is focused on load. A full job ID plus Enter jumps straight to the job. Partial text filters the list, and the count is announced. A wrong ID gets a plain "No job found" message. Jobs other than HR-2041 are labelled "not in demo".
  - **D2 Job evidence:**
    - **Header:** completeness per phase (Before 6 of 7 · 1 skipped, During 4 of 4, After 5 of 7 · 2 uploading) and the office note to the crew.
    - **Before you share:** lists the skipped shot with its reason, the photo kept despite a blur warning and the retaken photo.
    - **Banner:** says 2 photos are still on Ravi's phone and when the phone was last seen.
    - **Filters:** phase, area and tag, shown as removable chips with a live result count.
    - **Grid:** skipped and still-uploading shots get their own tiles, so a gap explains itself.
  - **D3 Photo detail** (side panel):
    - **Proof facts:** taken time (phone clock), received time, crew member, quality-check result, crew note, crew tags and retake history.
    - **Activity list:** taken, received and shared.
    - **Keyboard:** ← / → step through photos, Esc closes the panel and focus returns to the thumbnail.
  - **Compare:** Before and After of the same area side by side, labelled in text, with **Select both for sharing**.
  - **D4 Share dialog:**
    - **Options:** recipient (Customer / Insurer / Teammate), expiry (1 / 7 / 30 days, default 7) and whether to include crew notes.
    - **Blur warning:** a blurry photo raises a warning **before** the link exists. The PM can remove the photo or tick "Share it anyway".
    - **Link list:** created links appear under "Shared links" with Open and Revoke.
  - **D5 Customer page:** read-only and phone-first. Before and After are paired by area. Shows the link's expiry date, and an expired-link state.
- **Honesty rule kept:** doc 05 shows GPS maps and **Verified** badges, but neither is built in the crew app. The office view leaves them out and says so: "Location: not recorded in this prototype". Photos are drawn as demo illustrations and labelled **Demo**.
- **Tested in the browser** at 1366px, 375px and 320px:
  - lookup → filter Before + Gutters → panel → compare → select both → share with a blur warning → create link → open the customer page
  - no horizontal overflow
  - Esc returns focus to the thumbnail

## Outputs
- `app/roofing-crew-mobile/src/office/`: `OfficeApp`, `LookupScreen`, `JobEvidenceScreen`, `EvidenceCard`, `ProofPanel`,
  `CompareDialog`, `ShareDialog`, `SharePage`, `DemoScene`, `evidence.js`, `useModal.js`, `office.css`
- `src/main.jsx` (view routing), `src/App.jsx` (Office view link), `src/components/Icon.jsx` (9 new icons)

## Where the AI got it wrong
- On short screens the photo in the side panel shrank to zero height (flex shrink inside a scrolling column). Caught at 320px and fixed.
- The mobile top bar wrapped "Halden Roofing" and "Crew phone" onto two lines. Fixed: the link becomes an icon-only button.

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
