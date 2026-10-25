# Prompt 008: Crew mobile screens from the user flow

- **Date:** 2026-10-24
- **Input type:** Text prompt (via `/design`), likely dictated by voice
- **Tool:** Claude Code (Claude Opus 5.5) · `/design` → Claude **Design** artifact type (canvas of live artboards)
- **Phase:** 3 · Prototype

## Prompt (verbatim)

> First, create a mobile roofing crew flow from the user flow diagram . So I will tell what is the visual direction and how it will work . So basically natural background is there, should be there, dark text, choose one primary brand color, let's say blue is the primary brand color, green for verified or approved stage, and amber or red for warnings and errors. Do not use color alone, communicate states. Include Include text labels and icons also. And below the information, for creating the screens, let's say job ID, a missing record photo label, photo framing guidance, a camera image upload interaction, preview and quality check, retake, notes and save, loading, error, success state, realistic sample data also, include all the future into the mobile screen, and create a screen for that. Do not add authority of particular image, GPF verification, original file, unless actually implemented. First, explain the files to create, then implement and run the app. And mobile app should be creative , modern, and easy to access for the users. And it should be intuitive, seamless experience for the users. So based on that, you create a mobile screen for that. And one more thing, I will remember again, so flow should be as per the user flow, what you have generated above, for crew user flow.

## Decisions asked
- **Design system?** Two saved design systems were available. Answer: **none, use my visual direction**.

## What the AI did
- Explained the files first, then built a Design canvas:
  <https://claude.ai/artifact/CJucueKqgAgMs9pMcq8Dbz> (private until shared).
- **`Main.dc.html`: one interactive prototype** following the crew flow diagram:
  jobs → checklist → framing guide → take photo → checking → preview + quality check → retake / use →
  notes + tags → save to job folder → next shot → skip with reason → finish → uploads → submitted.
- **15 snapshot artboards**, each the same prototype opened at a different state (loading, missing
  photo, framing, checking, good, flagged, notes, saved, error, skip, finish, offline, failed, submitted).
- Visual system: neutral ground `#F4F5F1`, dark text `#161A1F`, primary blue `#1F5BD8`, green for
  done/saved/uploaded, amber for missing/warnings, red for errors. Every state has **text + icon**, never
  colour alone. Touch targets 44–62 px. Plus Jakarta Sans.
- **Honesty rule (from the prompt):** no GPS, "verified" or "original file" claims.
  - **Real:** the camera/file picker (`capture="environment"`), the quality check (sharpness via
    Laplacian variance + brightness, computed on the user's own photo), and the timestamp from the phone clock.
  - **Simulated and labelled:** demo photos ("DEMO PHOTO" badge) and upload ("Demo: signal is back").
- Checked the logic outside the canvas with a stub runtime: all 16 states render with every template
  value present; upload → fail → retry → all uploaded, save, and finish-with-reason flows behave as designed.
- Could not visually check it in the in-app browser: the canvas needs a claude.ai sign-in.

## Output
- Canvas: <https://claude.ai/artifact/CJucueKqgAgMs9pMcq8Dbz>
- Source in repo: [prototype/crew-mobile/project/](../../prototype/crew-mobile/project/)

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
