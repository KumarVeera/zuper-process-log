# Prompt 006: Proper crew user flow diagram

- **Date:** 2026-10-24
- **Input type:** Text prompt (interrupted the previous turn)
- **Tool:** Claude Code (Claude Opus 5.5), desktop app
- **Phase:** 1 · Define

## Prompt (verbatim)

> create a proper user flow diagram for crew user persona. From start to end, let's take review required photo checklist. To how he can preview the quality of the particular photo, and how he's sending to the how he's saving the file to the particular folder. Till that, you can create as a user flow diagram. It's not explanation.

## Context
- The previous turn (Prompt 005, office flow) was interrupted right after it finished.
- Doc 04 already had Mermaid diagrams plus a lot of explanation. The user wanted a **standalone visual
  diagram**, not text.

## What the AI did
- Drew a hand-laid-out SVG flow diagram with standard notation (start/end, screen, crew action, system,
  decision, saved file, flagged/recovery) in 5 phase bands:
  1 Review checklist → 2 Capture → 3 Preview quality → 4 Save to folder → 5 Finish & send.
- Added a **job folder** concept (`HR-2041 / Before / Front elevation`) with an inset showing the folder
  structure, which is the same on the phone and in the office.
- Rendered it, found and fixed a subtitle overlapping the start node and lost folder-tree indentation.
- Embedded it at the top of doc 04.

## Output
- [docs/diagrams/crew-user-flow.svg](../../docs/diagrams/crew-user-flow.svg)

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
