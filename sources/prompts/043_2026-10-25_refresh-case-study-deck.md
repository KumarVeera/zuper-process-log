# Prompt 043: Bring the UX case study deck up to date

- **Date:** 2026-10-25
- **Input type:** Text prompt
- **Tool:** Claude Code (Claude Opus 5.5) · desktop app
- **Phase:** 5 · Submit

## Prompt (verbatim)

> till now, what we have changed that should be reflected in the UX case study also.

## How the AI read it
- The deck (`case-study/`) was built in prompt 029. Everything changed since then (prompts 030–041) should show in it: both the screenshots and the slide text.

## What the AI did
- **Screenshots:** recaptured all 15 in `case-study/screens/` from the running prototype with a headless-Chrome script, at the same sizes as before.
  - **Crew phone screens:** now include the bezel on every side, so they are 824 × 1732 px (was 804).
  - **The office dashboard search box:** captured without its focus ring.
- **Slides changed** (`build-deck.js`):
  - **8 · Timeline:** the office stage is now prompts 024–038, followed by a new "Audit and refine" stage (039 onwards).
  - **9 · Crew Home:** new screenshot and caption: quick actions first, then a progress ring, then the next job (prompts 031–034).
  - **11 · Office dashboard:** sidebar, Review now above Key metrics, "Jobs by status", search with Enter (035–038).
  - **12 · Five review questions:** new screenshot; the answers now point to the job card, Required photos (gaps only), Needs attention (owner tags and one action) and Evidence check (040–041).
  - **13 · Decide and share:** new captures. The Approve button now shows the darker, accessible green.
  - **14 · Honest by design:** adds "Schedule, Customers, Settings: say they aren't built".
  - **17 · How I used AI:** the browser preview row now mentions the axe-core scans.
  - **19 · Where the AI got it wrong:** the Approve contrast error (4.4:1, found by axe) replaces the Profile switch row.
  - **21 · Next:** a new item, "Close the review findings", covering the docs/07 recommendations.
- **New slide 16, heuristic and accessibility review** (prompt 039):
  - **Numbers:** 35 scans; violations 5 → 0; small tap-target kinds 13 → 0; heuristics passed: 10 (crew) and 7 (office).
  - **Lists:** what was fixed, and what is left as recommendations.
- **Speaker notes:** updated on the changed slides.
- **Checked:** rendered all 22 slides through Keynote and looked at each changed slide for overflow and overlap. On the new slide, the bottom cards were too tall for their text, so they were shortened.
- **README:** now says 22 slides.
- **Not changed:** the prototype app.

## Follow-up: commit (text prompt, verbatim)

> Commit the case-study refresh and the log for prompts 042 and 043, regenerate the process-log site, and commit that too.

- Committed the deck, its screenshots and build script, and the log for prompts 042 and 043. Then regenerated the process-log site, checked it and committed it separately.

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
