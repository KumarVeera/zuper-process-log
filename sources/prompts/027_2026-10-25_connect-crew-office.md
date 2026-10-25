# Prompt 027: Connect crew capture and office review into one prototype

- **Date:** 2026-10-25
- **Input type:** Text prompt
- **Tool:** Claude Code (Claude Opus 5.5) · React app
- **Phase:** 3 · Prototype
- **Status:** NOT BUILT YET. The session hit its usage limit after reading the code. No code was changed.

## Prompt (verbatim)

> Connect the mobile photo-capture and desktop office-review experiences into one coherent prototype. Use a shared data model and persistent local or in-memory state appropriate for the existing architecture. When a crew member saves a photo, update the job's photo checklist and make the new evidence visible in the review screen. Support retakes, notes, missing-photo warnings, approval, and rejection. If persistence is local-only, explain that limitation. Add a simple way to switch between crew and office views for demonstration. Do not build a backend or authentication system unless the assignment requires it.

## Plan for the next session (from reading the code)
1. **Shared store** `src/store/jobStore.js`:
   - Saved in localStorage under the key `zuper-proto:HR-2041:v1`.
   - Crew-owned fields: `shots` (status, time, note, tags, quality, demo, `src` as a downscaled JPEG data URL, reason, `rev`) and `uploaded` (id → time received).
   - Office-owned fields: `reviews` (id → status, reason, note, at, `rev`), `jobReviewed`, `links`, `lastSeen`.
   - Each side writes only its own fields (read, then merge, then write).
   - Other tabs and iframes update through the browser's `storage` event.
   - Two demo starting points: start of day (the crew app's current preset) and end of day (the current office snapshot in `office/evidence.js`).
2. **Crew app** (`App.jsx`, `state.js`):
   - Load `shots` and `uploaded` from the store when there is no `?state=` preset, and write changes back.
   - Make `uploaded` hold the time received instead of `true`.
   - In `takePhoto`, keep a downscaled data URL so photos survive a reload.
   - Retakes: when the office rejects a photo, the crew checklist row shows "Retake requested" with the reason. "For my review" (`QuickScreen` `REVIEW_ITEMS`) lists the rejections.
   - Re-saving a shot raises its `rev`, which marks the office review as stale, so the photo shows as "To review · retaken".
3. **Office**:
   - Replace the static `EVIDENCE`, `trustSummary`, `phaseSummary` and `counterpart` with values worked out from the store, and pass them down as props.
   - Statuses become received / on crew phone (not uploaded) / skipped / **missing**, and missing shots get warnings.
   - Move `reviews`, `jobReviewed` and `links` out of `OfficeApp` state into the store.
   - Show real photos with `<img>`, and draw demo photos with `DemoScene` (add a dark filter).
   - Use `DemoScene` in the crew `PhotoView` too, so both sides show the same picture.
4. **Demo switcher:**
   - A bar with Crew phone, Office and Side by side. Side by side is `?view=split`: two iframes, kept in sync through `storage` events.
   - The bar also has "Reset demo" with start-of-day and end-of-day options.
   - The bar is hidden inside iframes and on phones; on phones, a Profile row links to the office view.
5. **Limitation to explain:** data lives only in this browser's localStorage. Share links and the office view only show what this browser saved. Different devices don't sync, because there is no backend.

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
