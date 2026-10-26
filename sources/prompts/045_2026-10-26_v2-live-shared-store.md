# Prompt 045: v2, connect the crew phone and the office live

- **Date:** 2026-10-26
- **Input type:** Text prompt
- **Tool:** Claude Code (Claude Opus 5.5) · desktop app
- **Phase:** 3 · Prototype (v2)

## Prompt (verbatim)

> In v2, build the live crew ↔ office shared store from the prompt 027 plan.

## How the AI read it
- Build the plan written in prompt 027 (left unbuilt when that session hit its usage limit), in `v2/` only. v1 stays as it is.

## What the AI did
- **Shared store** (`v2/src/store/jobStore.js`): one copy of job HR-2041 in this browser's localStorage, read through a React hook. Other tabs and frames update through `storage` events.
  - **The crew phone writes its part:** shots and uploads.
  - **The office writes its part:** reviews, "job reviewed" and share links.
  - Each side replaces only its own part.
  - **Two starting points:** End of day (the default; v1's office snapshot, now moved into the store) and Start of day.
- **Crew phone** (`App.jsx`, `state.js`, checklist and quick-action screens):
  - **Live by default:** with no `?state=` preset, it loads from the store and writes every save, skip and upload back.
  - **Upload times:** each upload records when the office received it, and when the phone was last online.
  - **Each saved photo also records:** the crew member, the quality result (ok, blurry or dark), the date and a `rev` number.
  - **Real photos:** camera and gallery photos are stored as a small JPEG (longest side 720px).
  - **Office rejections show as "Retake requested · reason":**
    - on the checklist row
    - under Action required
    - in For my review, with the office's note and a *Retake photo* button
- **Office** (`evidence.js`, `OfficeApp.jsx` and the screens):
  - **Source:** evidence comes from the store, not the fixed snapshot.
  - **Statuses:** received, still on the phone, skipped, or **not taken yet**. Untaken shots get grid tiles and a "required photos not taken yet" warning.
  - **Live updates:** approvals, rejections, "job reviewed" and share links are saved to the store, and a "New from the crew" toast appears when a photo arrives.
  - **Retakes:** a decision counts only for the photo it was made on. A retaken photo returns to review as "retaken after your rejection".
  - **Real photos** show as photos, with no "Demo" label.
  - **Removed claims:** "Sending it to the crew app isn't part of this demo" is gone, because it now does send. The gutter comparison item and the dashboard's "gutter photos are in" only show when both photos are in.
- **Demo page `?view=split`:**
  - the crew phone and the office side by side
  - *Reset to: Start of day / End of day* buttons
  - a note that there is no server
  - a message on screens narrower than 1000px
  - links to it from the crew page and the office sidebar
- **Limitation, stated in the README and on the demo page:** with no backend, data lives in one browser's localStorage. Another device, browser or private window has its own copy, and share links only work in the browser that made them.

## Tested (browser preview)
- **Side by side at 1440px:**
  1. Uploading the 2 waiting photos on the phone → office goes from 15 to 17 received, with a toast.
  2. Office rejects Front elevation with a reason and note → the phone shows it in For my review and on the checklist.
  3. The crew retakes it → the office first shows it as "still on Ravi Menon's phone", then after upload as "retaken after your rejection", dated Mon 26 Oct.
  4. A generated JPEG through the gallery input → stored at about 29 KB and shown in the office grid as a real photo.
  5. Reset to Start of day → 13 shots "not taken yet", and the gutter item hidden.
- **Office at 375px:** no horizontal overflow. **Crew at 320px:** checklist with a retake request, no overflow.
- **Presets:** `?state=` presets still open and don't touch the store.
- **Build and console:** `npm run build` passes, and there are no console errors after a fresh load.
- **Not tested:**
  - two separate browser windows (only the frames and tabs of one browser)
  - storage running out
  - a screen reader
  - an axe re-scan of the new states

## Where the AI got it wrong
- **The "Retake requested · reason" chip** ran past the edge of the checklist card at 320px, because chips don't wrap. Caught in the browser check; it now wraps inside the card.

## Follow-up: commit (text prompt, verbatim)

> Commit v2 and the log for prompts 044 and 045, regenerate the process-log site, and commit that too.

- Committed `v2/` and the log for prompts 044 and 045 together, then regenerated the process-log site, checked it and committed it separately.

## Follow-up: question (text prompt, verbatim)

> now if I ask some changes, it should reflect in v2 right?

- Confirmed: from now on, prototype changes go into `v2/` only. v1 (`app/roofing-crew-mobile/`) stays as it is unless asked. The session handoff already records this.

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
