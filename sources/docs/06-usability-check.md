# Usability Check: Crew Photo Capture

Six core usability questions, checked against the React prototype (`app/roofing-crew-mobile`) in the browser on
2026-10-25. Each was **audited first**; gaps were built, then **re-tested**.

| # | Question | Before | After | How it works now |
|---|---|---|---|---|
| 1 | **Can you select or capture a photo?** | ⚠ Capture only (`capture="environment"` forces the camera on phones) | ✅ | **Shutter** (simulated camera) · **Use phone camera instead** (real camera) · **Gallery** (pick an existing photo) · **Can't take** (skip with a reason) |
| 2 | **Does the preview appear?** | ✅ | ✅ | Full preview with "Taken 9:14 AM · HR-2041", a *Demo photo* badge when simulated, and the quality result (Sharpness, Light) |
| 3 | **Can you retake or replace the image?** | ⚠ Retake only | ✅ | **Retake** returns to the camera · **Choose a different photo** swaps from the gallery on the preview · retaking a saved shot shows *"Already taken at 8:15 AM. A new photo will replace it."* and ends on **Photo replaced**. A replaced photo goes back into the upload queue. |
| 4 | **Can you add a note?** | ✅ | ✅ | Labelled *Note for the office (optional)* field plus 5 one-tap tags. The note shows on the Saved screen ("note added") |
| 5 | **Does saving produce visible feedback?** | ⚠ Missing when *Next shot after saving* is on | ✅ | Button changes to *Saving to job folder…* (busy state) → **Saved to job folder** screen with the folder path → plus a **toast** ("Saved · Before › Driveway & plants") on every save, announced to screen readers (`aria-live="polite"`), including when the app jumps to the next shot |
| 6 | **Is it usable on a narrow mobile screen?** | ✅ No overflow · ⚠ 3 small targets | ✅ | All 22 screens tested at **320×640** and 375×812: **no horizontal overflow**. Every tap target is **≥ 44×44** (camera chips, settings switches and the tutorial *Skip* were enlarged) |

## Evidence (browser tests)
- Gallery file → preview shows the real image (`blob:` URL) → "Looks good".
- *Choose a different photo* on the preview → a different image appears, same shot.
- Note typed → Save → "Saved to job folder" · "Taken 2:39 PM · note added · waiting to upload" · toast shown.
- Re-open a saved shot → replace notice → Save → **"Photo replaced"** title and toast.
- *Next shot after saving* on → Save → toast "Saved · Before › Existing damage".
- 320px sweep across every `?state=`: 0 overflowing elements; 0 targets under 44px after the fix.

## Still simulated (say so in the walkthrough)
- Shutter = simulated camera (labelled). The real camera is one tap away.
- Uploads are simulated ("Demo: signal is back").
- Saved photos live in memory until reload.
