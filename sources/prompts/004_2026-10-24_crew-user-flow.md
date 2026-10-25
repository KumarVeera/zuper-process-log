# Prompt 004: Map the crew user flow

- **Date:** 2026-10-24
- **Input type:** Text prompt
- **Tool:** Claude Code (Claude Opus 5.5), desktop app
- **Phase:** 1 · Define

## Prompt (verbatim)

> Map the crew user flow.

## What the AI did
- Wrote `docs/04-crew-user-flow.md` from Part A of the UX plan:
  - Overview flow (arrive → Before → During → After → finish → sync)
  - Detailed Mermaid flowchart with every decision point and recovery path (camera permission,
    storage full, no GPS, AI flag, skip with reason, missing shots, offline, upload failure)
  - Upload-queue state diagram (runs in the background)
  - Step-by-step table: screen, crew action, system response, states, accessibility, acceptance criteria
  - Decision rules (who decides what) and where AI vs a person checks
  - Open questions to test in the prototype

## Output
- [docs/04-crew-user-flow.md](../../docs/04-crew-user-flow.md)

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
