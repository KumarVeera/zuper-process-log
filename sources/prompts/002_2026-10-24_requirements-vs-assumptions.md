# Prompt 002: Separate explicit requirements from assumptions

- **Date:** 2026-10-24
- **Input type:** Text prompt (via `/design:user-research` skill)
- **Tool:** Claude Code (Claude Opus 5.5), desktop app
- **Phase:** 1 · Define

## Prompt (verbatim)

> /design:user-research Separate explicit requirements from assumptions. Tell me what I should build first.

## What the AI did
- Re-read the brief and split everything into three buckets: **Explicit** (24 items, quoted from the
  brief), **Inferred** (9 items, implied by persona quotes), **Assumptions** (18 design hypotheses with
  risk + a quick validation method).
- Named the 4 riskiest assumptions: shot-list templates (A7), in-app camera for verified proof (A9),
  visible sync status builds trust (A18), crews won't type (A3).
- Added a light 2-day research plan + 15-min interview guide.
- Restated "build first" with traceability: each screen mapped to the requirement IDs it covers.

## Output
- [docs/02-requirements-vs-assumptions.md](../../docs/02-requirements-vs-assumptions.md)

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:
