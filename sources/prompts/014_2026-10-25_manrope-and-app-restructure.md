# Prompt 014: Manrope, lighter style, and restructured Home / Jobs / Job detail / Camera

- **Date:** 2026-10-25
- **Input type:** Text prompt with two pasted feature lists
- **Tool:** Claude Code (Claude Opus 5.5) · React app · Claude Design canvas · built-in browser preview
- **Phase:** 3 · Prototype (visual and structural iteration)

## Prompt (verbatim)

> Change the font into Manrope for all the places and all the screen it is look like bold and more text focus need to change the style and structure and it should be below:

Pasted list 1:
> Modern mobile-first dashboard and job schedule · Active job card with roofing imagery · Streamlined bottom navigation · Interactive photo capture simulation · Retake and save-to-job-folder workflow · Three-step in-app photo tutorial · Responsive phone presentation for mobile and desktop previews · Accessible controls and semantic labels

Pasted list 2:
> Card-based Jobs overview with soft blue gradient · Job metrics, status filters, crew information, and upcoming assignment · Interactive transition into a detailed roofing job screen · Job details, photo diary, work order, assets, and status information · Integrated photo capture, review, retake, and folder-saving flow · Persistent mobile bottom navigation · Responsive mobile and desktop preview styling

## What the AI did
- **Font:** Manrope in the React app and all 16 Design canvas artboards (canvas republished as v19; only its font changed).
- **Less bold, less text:**
  - rewrote `styles.css`: weights 700 / 600 / 500, softer cards with light shadows, more whitespace
  - shortened copy across Home, Jobs and actions
- **Home:**
  - active job card with a new roofing illustration (`roof-hero.svg`)
  - Take next photo / Details buttons
  - compact tiles and a "Today's schedule" timeline
- **Jobs:**
  - soft blue gradient header with metrics and a period switch
  - crew card with avatars
  - "Up next" assignment
  - filter chips and job cards with thumbnails
- **Job detail (new):**
  - slide-in transition
  - hero image and status strip
  - accessible tabs: Overview / Photo diary / Work order / Assets
  - sticky Checklist and Take photo buttons
- **Camera (new):**
  - simulated viewfinder with a framing guide
  - shutter with flash, and scene modes that drive the quality check
  - real phone-camera button; Can't take → skip sheet
- **3-step tutorial (new):** a dialog with focus moved to the title, Esc to close, dots, and Skip / Next / Start. Replay from the camera help button or Profile.
- **Navigation:** the nav is persistent on app screens and hidden only during full-screen capture. Back returns to the job that was open.
- **Desktop:** phone frame plus an intro panel.
- **Tested in the browser:**
  - Home, Jobs, detail tabs (diary 18 tiles / 16 missing), the tutorial's 3 steps, flash
  - Shaky → "Check this photo" → Retake; Steady → "Looks good" → save → "HR-2041 › Before › Left side"
  - the back chain checklist → job → Jobs, with the Jobs badge 16 → 15
  - a fresh load is error-free, Manrope loads, and the desktop intro shows at 1280px
- **Fixed during testing:**
  - the time was duplicated in timeline cards
  - the "In progress" metric wrapped
  - camera title contrast was low on a light sky
  - Back from the checklist skipped the open job

## Output
- [app/roofing-crew-mobile/](../../app/roofing-crew-mobile/) · new: `JobDetailScreen`, `CameraScreen`, `components/Tutorial.jsx`, `assets/roof-hero.svg`

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
