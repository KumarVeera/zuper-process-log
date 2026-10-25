# Prompt 022: Check six core usability points, build what is missing

- **Date:** 2026-10-25
- **Input type:** Text prompt
- **Tool:** Claude Code (Claude Opus 5.5) · React app · built-in browser preview
- **Phase:** 4 · Test & refine

## Prompt (verbatim)

> Can you select or capture a photo? / Does the preview appear? / Can you retake or replace the image? / Can you add a note? / Does saving produce visible feedback? / Is the interface usable on a narrow mobile screen? From above, I have added some of the usability points. Can you check this is are there as a feature? And if it is not there, can you build that also? If it is there, that is fine, because these are the important things to know for the user. […] So could you please check and add it if it is not there. If it is there, that is fine.

## What the AI did
- **Audited first** in the browser, then built only the gaps:
  1. **Select:** there was no way to pick an existing photo (the only input forced the camera). Added **Gallery**, and kept **Use phone camera instead** next to the simulated shutter.
  2. Preview: already there.
  3. **Replace:**
     - added **Choose a different photo** on the preview
     - a **replace notice** in the camera when the shot already has a photo
     - the Saved screen reads **Photo replaced**
     - a replaced photo re-enters the upload queue
  4. Note: already there.
  5. **Feedback:** added a **toast** on every save, announced politely to screen readers. It also appears when "Next shot after saving" skips the Saved screen, which previously gave no feedback.
  6. **Narrow screens:** swept all 22 states at 320px, with no overflow. Enlarged 3 sub-44px targets (camera chips, switches, tutorial Skip).
- **Re-tested every point** with real image files injected into the inputs. Results are written up in [docs/06-usability-check.md](../../docs/06-usability-check.md).

## Output
- [docs/06-usability-check.md](../../docs/06-usability-check.md)

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:

## Follow-up (2026-10-25)
> Commit the working tree changes with a sensible message.

- AI committed the usability fixes, docs/06 and the prompt 022 log.
