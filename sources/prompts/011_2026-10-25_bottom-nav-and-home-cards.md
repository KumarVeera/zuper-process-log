# Prompt 011: Bottom navigation and Home cards

- **Date:** 2026-10-25
- **Input type:** Text prompt (via `/anthropic-skills:figma-generate-design`), likely dictated by voice
- **Tool:** Claude Code (Claude Opus 5.5) · React app · built-in browser preview
- **Phase:** 3 · Prototype (iteration)

## Prompt (verbatim)

> create a bottom navigation options like home, jobs, profile, and photos. The order could be home, jobs, photos, profile. So these are the order should be there in the bottom navigation bar. So in the home itself, user can navigate to their jobs, what user has to do and what office team has scheduled to the particular work. So that also need to show. Again, it's like a dashboard perspective. We need to create a screens. So let's say one of the example called today, my schedule, action required for my review. So these are the four different cards we needed. And other navigations like all jobs, completed jobs, in progress, unscheduled. So these are the options should be needed.

## What the AI did
- Built it in the React app again (same target as Prompt 010; no Figma file exists).
- **Bottom nav:** Home · Jobs · Photos · Profile.
  - The active tab has a blue icon, a pill behind it, a bold label and `aria-current`.
  - Live badges: Jobs shows missing photos, Photos shows waiting uploads.
  - The nav hides during capture. Back from a job returns to the tab you came from.
- **Home:** four cards (Today / My schedule / Action required / For my review). Tapping a card shows its items below.
  - **My schedule** shows "Scheduled by Sean Doyle · office" and links to unscheduled jobs.
  - **Action required** is live: missing photos, and waiting or failed uploads.
  - **For my review** holds office requests with *Mark as reviewed*.
- **Jobs:** Today / Week / Month plus filter chips **All jobs · In progress · Completed · Unscheduled**, with counts.
- **Photos:** live job-folder grid with Uploaded / Waiting / Missing / Skipped tiles. Tapping a missing tile opens the camera guide.
- **Profile:** crew lead, month numbers, and two settings that really work. I replaced an "upload on mobile data" switch that would have done nothing.
- **Tested in the browser at 375×812:**
  - nav order and active state
  - every Home card's list; mark as reviewed (count 2 → 1)
  - unscheduled link → Jobs filtered
  - period counts (today 5, month 40)
  - Photos missing tile → camera guide → back to Photos
  - both settings, including save going straight to the next shot
  - no console errors
- **Fixed after the visual check:** job IDs wrapped mid-word ("HR-" / "2041").
- **Content fix:** the AI had Priya (the brief's insurance-claims person) scheduling jobs. Changed to Sean (PM).

## Output
- [app/roofing-crew-mobile/src/screens/](../../app/roofing-crew-mobile/src/screens/) · `HomeScreen`, `JobsScreen`, `PhotosScreen`, `ProfileScreen`, `components/BottomNav.jsx`

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:

## Follow-up (2026-10-25)
> Commit the working tree changes with a sensible message.

- AI committed the bottom navigation, the four tabs and the prompt 011 log.
