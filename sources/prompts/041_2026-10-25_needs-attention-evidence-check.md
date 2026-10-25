# Prompt 041: Make the information cards more useful

- **Date:** 2026-10-25
- **Input type:** Text prompt, likely dictated by voice (the request appears twice in the same message)
- **Tool:** Claude Code (Claude Opus 5.5) · React app · built-in browser preview · axe-core (loaded only for the re-scan)
- **Phase:** 4 · Test & refine (office web app)

## Prompt (verbatim)

> Now, missing or questionable can I trust the details? What do next? So these cards are just like an information. So I hope it's like very useful for office team also. Can we do it some other way to show the details?  So still more intuitive way to show the these cards., can I trust the details? What do next? So these cards are, it's just like an information. So I hope it's like very useful for office team also. Can we do it some other way to show the details? Now it's showing something like as a list or something like that. So still more intuitive way to show the these cards.

## How the AI read it
- The three cards ("Missing or questionable", "Can I trust the details?" and "What to do next") read as text to scan, not tools to act with.
- "Missing or questionable" and "What to do next" also repeated the same issues (blurry photo, skipped shot, uploads).

## What the AI did
- **Needs attention** (new, full width, right after the job card): replaces "Missing or questionable" and "What to do next".
  - **Each issue** has a coloured icon, a plain title, a one-line reason, and an **owner tag**: *Your decision*, *Customer*, *Waiting on crew* or *For info*.
  - **Actions:** where there's something to do, there's one button: **Open photo** or **Compare**.
  - **Header count:** "3 items for you".
  - **Live:** approving the blurry photo removes it (3 → 2 items for you), and rejecting a photo adds "Retake requested".
- **Evidence check** (replaces "Can I trust the details?"): four verdict tiles in a 2 × 2 grid, each with a pass, warning or not-recorded mark.
  - **Time stamps:** Consistent
  - **Photo quality:** 14 of 15 sharp (warning)
  - **Taken by:** 2 crew members
  - **Location:** Not recorded
- **Required photos:** unchanged, now beside Evidence check.
- **Removed:**
  - the upload banner, which repeated a Needs attention item
  - the review row from the old "What to do next" (Start / Continue review is in the job card)
  - the old card styles
- **Tested:**
  - **Desktop (1366px):** layout right; Compare and Open photo work.
  - **Phones (375 and 320px):** no overflow, and the button wraps under the text.
  - **Tap targets:** at least 44px.
  - **Accessibility:** axe finds **0 violations** at 1366 and 375px.
- **Docs:** README and docs/07 updated to the new card names.

## Where the AI got it wrong
- On phones the action button first squeezed the issue text into a narrow column. Fixed by letting the text take the full row so the button wraps under it.

## Follow-up: commit (text prompt, verbatim)

> Commit the job card, Needs attention and Evidence check changes with the log for prompts 040 and 041, regenerate the process-log site, and commit that too.

- Committed prompts 040 and 041 together (app, README, docs/07, log), then regenerated the process-log site and committed it separately.

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
