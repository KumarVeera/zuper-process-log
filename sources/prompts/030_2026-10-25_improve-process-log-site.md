# Prompt 030: Improve the process-log website

- **Date:** 2026-10-25
- **Input type:** Text prompt (pasted)
- **Tool:** Claude Code (Claude Opus 5.5) · plan mode · static site generator (Node + marked) · built-in browser preview
- **Phase:** 5 · Submit

## Prompt (verbatim)

> Improve my existing Zuper process-log website for a senior AI-native product designer take-home assignment. Inspect the current website and its source documentation first.
>
> 1. Keep all 29 original prompt records and preserve their verbatim wording.
> 2. Add an executive summary near the top with the most important design decisions, discarded ideas, and actual AI mistakes, using only documented evidence.
> 3. Fix the prototype button using the actual deployed prototype URL found in the repository or ask me for it if unavailable. Do not invent a URL.
> 4. Identify blank personal-notes sections and unresolved placeholders. Do not fabricate my personal reflections. Create a short list of the 5–7 most important entries that need my input.
> 5. Make the key decisions and before/after evidence easier to find before the full prompt archive.
> 6. Preserve links to the original prompt files, diagrams, and screenshots; verify that asset paths work in the deployed site.
> 7. Make the page responsive, accessible, and easy to navigate.
> 8. Check the complete site for broken links, misleading statuses, and placeholder content.
>
> Do not change the prototype application. Summarize the changes and list any information you still need from me before deployment.

## Decisions asked (plan mode)
- **Prototype URL:** none in the repository. Answer: **leave it marked missing**; I add it to `assets/config.js` before deploying.
- **Superseded rows in "Prompts that mattered"** (012, 016, 018): answer: **add a site-only "Later replaced" label**, keeping the log text unchanged.

## What the AI did
- **Executive summary:** 6 key decisions quoted from the timeline, cut ideas credited to their real source ("My idea" / "AI added" / "Design"), and 5 real AI mistakes from the log.
- **Needs your input:** 7 entries, each linked. The site counts 29 of 29 notes blank, 5 timeline placeholders and 1 AI-errors row still awaiting confirmation.
- **Key decisions and before / after:** all 22 recorded decisions, the usability Before / After table, and 15 prototype screenshots from `case-study/screens/`. The site says plainly that these show the current state, with no visual "before".
- **Labels:** "Later replaced" on rows 012, 016 and 018; "Unresolved" on the 6 placeholders, with the wording unchanged.
- **Original files:** all 38 source `.md` files are copied into `sources/` and linked from every prompt card and evidence page.
- **Navigation:** the menu now follows the new sections and highlights the one in view; a Back to top button was added.
- **Checker:** a new `npm run check` covers links and assets, exact prompt text and leftover placeholder text.
- **Results:** 350 links resolve; 29 of 29 prompts exact.
- **Prototype app:** not changed.

## Where the AI got it wrong
- **Reflection:** the site's reflection (written by the AI in an earlier session) said the AI added the weather card and the Cards/Table switch. Prompts 016 and 018 show those were my requests. Corrected.
- **Out-of-date claims:** the site still said "no screenshots exist" after the case-study captures were committed, and the commit list didn't say when it was generated. Both fixed.

## Follow-up (text prompt, verbatim)

> Log this request as prompt 030, regenerate the site, and commit the process-log-site changes.

- Logged here, the site regenerated and checked, and the changes committed.

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
