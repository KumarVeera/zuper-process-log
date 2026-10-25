# Prompt 039: Heuristic evaluation and accessibility check of both apps

- **Date:** 2026-10-25
- **Input type:** Text prompt, likely dictated by voice
- **Tool:** Claude Code (Claude Opus 5.5) · React app · built-in browser preview · axe-core 4.10.2 (loaded only during the audit)
- **Phase:** 4 · Test & refine

## Prompt (verbatim)

> For both flows, crew for mobile application and office team for web application, both apps should be easy to use. And check the heuristic evaluation, then ten tub rules are working or not. Then accessibility should be usable for across all the users. Check that also.

## How the AI read it
- "ten tub rules" was read as Nielsen's 10 usability heuristics.
- "Usable for across all the users" was read as WCAG 2.1 AA, plus 44px touch targets for gloved, outdoor use.

## What the AI did
- **Automated:** ran axe-core in the browser on every screen.
  - **Scope:** 24 crew screens at 375px, the crew desktop view, 7 office and customer pages at 1366px (including the photo panel, compare and share dialogs, and the expired link), and 3 office pages at 375px. **35 scans.**
  - **Result:** 5 violations: Approve button contrast (serious), an unreachable scrollable upload list (serious), a loading screen with no heading, and a link outside a landmark.
- **Touch targets:** WCAG 2.2 at 24px passed everywhere. The stricter 44px check found 13 kinds of small targets (crew job tabs, period switch and filter chips; office close, back, chips and phase filters).
- **Keyboard:** the page behind the open office menu could still be focused.
- **Fixed all of the above:**
  - **Contrast:** Approve is now `#13693A`, 6.75:1, up from 4.4:1.
  - **Upload list:** focusable and labelled.
  - **Loading screen:** hidden heading.
  - **Office view link:** now inside a `nav`.
  - **Tap targets:** 44px.
  - **Office menu:** page and top bar are `inert` while it's open.

  The re-scan shows **0 violations in 35 scans** and no targets under 44px (inline text links excepted).
- **Heuristics:** walked both flows through all 10.
  - **Crew app:** passes all 10, with one severity-1 note (no explicit "Undo skip").
  - **Office app:** 7 pass. Severity notes: metric tiles look tappable but aren't (1), no bulk approve (2), no help for the review workflow (1), and no "Reopen review" (1).

  These are recommendations, not built.
- **Report:** [docs/07-heuristic-and-accessibility-review.md](../../docs/07-heuristic-and-accessibility-review.md).
- **Clean-up:** axe-core was served from a temporary `public/__audit/` folder and deleted afterwards. It isn't part of the app.

## Limits (stated in the report)
- No real users were involved.
- No hands-on screen-reader session; the screen-reader findings come from axe and code inspection.

## Follow-up: commit (text prompt, verbatim)

> Commit the accessibility fixes, docs/07 and the log, regenerate the process-log site, and commit that too.

- Committed the fixes, docs/07 and the log, then regenerated the process-log site (which now includes docs/07 as an evidence page) and committed it separately.

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
