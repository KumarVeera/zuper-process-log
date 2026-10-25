# Prompt 005: Map the office user flow

- **Date:** 2026-10-24
- **Input type:** Text prompt
- **Tool:** Claude Code (Claude Opus 5.5), desktop app
- **Phase:** 1 · Define

## Prompt (verbatim)

> Map the office user flow

## What the AI did
- Wrote `docs/05-office-user-flow.md` from Part B of the UX plan:
  - Overview flow (question → lookup → review → verify → share → recipient views)
  - Detailed Mermaid flowchart for **Sean's gutter dispute** (lookup by job ID, sync banner, filters,
    skipped-with-reason, trust badges, before/after compare, share with pre-share warnings)
  - Detailed flowchart for **Priya's insurer evidence pack** (confirm/correct AI tags, completeness gate,
    export failure)
  - Share-link lifecycle state diagram (active → viewed → revoked / expired)
  - Step table with a11y + AC links, decision rules, AI vs person, crew-to-office mapping, open questions

## Output
- [docs/05-office-user-flow.md](../../docs/05-office-user-flow.md)

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
