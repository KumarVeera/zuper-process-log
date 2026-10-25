# Prompt 040: Clean up the job card and Required photos

- **Date:** 2026-10-25
- **Input type:** Text prompt with two screenshots (the job card and the Required photos card), likely dictated by voice
- **Tool:** Claude Code (Claude Opus 5.5) · React app · built-in browser preview · axe-core (loaded only for the re-scan)
- **Phase:** 4 · Test & refine (office web app)

## Prompt (verbatim)

> These two sections reviewing the particular job card, and after require photos are there before, during, after. So these two are sections are unclear now. So let's say we can take first card. There are some details needs to review, and title is there, and there are two buttons are there. Then below we have some option. The information, jobs, date, crew, photos, review progress, and below that some 0 of 15 decided, 0 approved, 0 registered. So something it's looking messy now. So can you clear that messy into cleaner interface? It should be clean and neat. Make it as in a row, 2 or 3 information.

## What the AI did
- **Job card** (`JobEvidenceScreen.jsx`, `office.css`):
  - **Header:** "Job HR-2041" with a small status chip beside it, then the address as the title and the job type ("Full re-roof · asphalt shingles · 2 storeys") as a muted subtitle. The two buttons stay on the right.
  - **Facts:** **three** facts in one row, each with an icon and a label:
    - Date: Sat 24 Oct · 8:00 AM – 4:00 PM
    - Crew: Crew 3 · lead Ravi Menon
    - Photos: 15 of 18 received

    Thin dividers sit above and below the row. The previous "Job" fact moved into the subtitle; the uploading and skipped counts live in the banner and in Required photos.
  - **Review progress:** one line ("Review progress … 0 of 15 decided") above a slim bar. The approved / rejected legend, with coloured dots, appears only after the first decision.
  - **Screen readers:** the facts are a plain list with an accessible name, not a definition list.
- **Required photos:**
  - **Phase rows:** one row per phase: name · progress bar · "6/7".
  - **Gaps only:** under each row, only the shots still missing (e.g. "Existing damage · Skipped", "Driveway cleanup · Uploading"), or "All received".
  - **Full list:** all 18 shots, clickable as before, are behind **"Show all 18 shots"**.
- **Clean-up:** removed old, unused job-table CSS.
- **Tested:**
  - **Desktop (1366px):** the cleaner layout is right.
  - **1024px:** facts in one row.
  - **Phones (375 and 320px):** facts stack, with no overflow.
  - **Interactions:** "Show all" opens the 18 shots; a shot opens its photo; the legend appears after Approve.
  - **Accessibility:** axe finds **0 violations** on the page. axe-core was served temporarily and deleted afterwards.

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
