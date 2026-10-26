# Prompt 047: Redesign both apps with a new, modern design pattern

- **Date:** 2026-10-26
- **Input type:** Text prompt
- **Tool:** Claude Code (Claude Opus 5.5) · desktop app
- **Phase:** 2 · Explore (v2 redesign)

## Prompt (verbatim)

> Change entire design as a different perspective, latest, modern, and intuitive, seamless experience for the user. The design should change in office view plus crew mobile view also. But change the entire design pattern, but it should be again easy to use for the user also.

## Decisions asked
- **Direction:** three options with sketches: *Task-first, bold* · *Soft and calm* · *Dark, field-ready*. Answer: **Task-first, bold.**
- **Where:** answer: **in v2**, in place. The previous v2 is in git (commit aecdb44).

## What the AI did
- **New visual system** (`v2/src/styles.css` tokens and a new "v2 redesign" layer; `index.html`):
  - Inter replaces Manrope.
  - **Colours:** near-black ink `#0B0B0C` for text, primary buttons and hero cards, and one blue accent `#3B5BFD` for progress, links and focus.
  - **Surfaces:** flat bordered cards with no shadow, and a tighter radius scale.
  - **Unchanged:** status colours (ok, warn, error) keep their text and icon.
- **Crew phone, new pattern:**
  - **Home is task-first:**
    - an **"On site now" job card** in ink: address, photo progress bar, the **one next step** (an office retake first, then the next missing shot, or "Review and finish"), and Checklist and uploads buttons
    - **Needs you**: missing photos, uploads, office requests
    - **Today**: a compact list with status pills
  - **Removed from Home:** the quick-action tiles, the progress ring, the schedule card and the separate sync bar (Needs you covers uploads).
  - **Tab bar:** a central **Camera** button that opens the next shot owed (`BottomNav.jsx`, `App.jsx`).
  - **Other screens:** they pick up the new system unchanged in structure (checklist, camera, quality check, notes, saved, uploads, finish, job detail). The loading skeleton matches the new Home.
- **Office, new pattern** (`JobInbox.jsx` new, `DashboardScreen.jsx` rewritten, `OfficeApp.jsx`, `office.css`):
  - **Layout:** icon rail → **review inbox column** (search, status filter pills, compact job rows; the open job is highlighted) → job.
  - **Overview:** a dark "Next up for you" card, then "This week" numbers as flat tiles.
  - **Photo panel shortcuts:** **A** approve, **R** reject, **J / K** next and previous (arrows still work), **Esc** close. The buttons carry `aria-keyshortcuts`, and a hint shows on desktop.
  - **Responsive:**
    - below 1600px the inbox column folds away while a photo is open, so the job keeps its width
    - below 1100px the inbox moves into the overview
    - below 860px the rail becomes the slide-in menu
- **Kept working:** the live crew ↔ office store, retakes, uploads, share links and `?view=split`.

## Tested (browser preview and headless captures)
- **Office:**
  - **1440px:** overview, and the job page with HR-2041 highlighted in the inbox.
  - **1366px:** with a photo open, the inbox folds away and the job is 842px wide. J moved to the next photo, A approved it (with a toast), K moved back, and R opened the reject form.
  - **1024px:** the inbox moves into the overview.
  - **375px:** no sideways overflow, and the only target under 44px (search) was fixed.
- **Crew:**
  - **375 and 320px:** no overflow. The camera button opened "Driveway & plants", the next shot.
  - **Visual pass:** job detail, camera, quality check, notes, saved, uploads and finish.
- **Build:** `npm run build` passes.
- **Accessibility:** an axe re-scan came afterwards (see the follow-up below). A screen-reader pass was not done.

## Where the AI got it wrong
- **Fixed in the browser check:**
  - The office main area stopped short of the window bottom on the overview.
  - The raised camera button crowded the checklist's Finish job button.
  - The Needs you action label squeezed the text at 320px.
  - The inbox search was 40px tall on phones.

## Follow-up (text prompt, verbatim)

> Run an axe accessibility re-scan of the v2 redesign, fix anything it finds, then commit v2 and the log for prompts 046 and 047 and regenerate the process-log site.

- **Scan:** axe-core 4.10.2 (WCAG 2.0 / 2.1 A and AA plus best practice), run in headless Chrome on **41 screens**:
  - every crew state at 375px, the live crew Home and the crew desktop view
  - office overview, job, photo panel, reject form, compare and share dialog at 1366px
  - office overview at 1024px
  - office overview, open menu, job and photo panel at 375px
  - the customer page (live and expired)
  - the side-by-side demo at 1440 and 375px

  Tap targets under 44px were checked on every phone-size screen.
- **First run:** 2 violations, both on the new `?view=split` page (no `main` landmark, no level-one heading), and one 42px target (the office "Skip to content" link, which shows only on keyboard focus).
- **Fixed:**
  - the split page title is now an `h1`
  - the frames and the narrow-screen message sit inside a `main`
  - the skip link is 44px tall
- **Re-scan:** **0 violations in 41 scans**, and no targets under 44px.
- **Checked by hand:** axe could not decide contrast for text over photos (the white "Demo" chips) and for selects with an arrow image. Both are dark text on near-white, and they pass.
- **Clean-up:** axe-core was served from a temporary `v2/public/__audit/` folder and deleted afterwards.
- **Commit:** committed v2 with the log for prompts 046 and 047, then regenerated the process-log site, checked it and committed it separately.

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
