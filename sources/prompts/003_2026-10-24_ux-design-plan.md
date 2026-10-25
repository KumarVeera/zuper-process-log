# Prompt 003: Lightweight UX design plan (Define stage)

- **Date:** 2026-10-24
- **Input type:** Text prompt (via `/design:user-research` skill), likely dictated by voice
- **Tool:** Claude Code (Claude Opus 5.5), desktop app · Skill: `design:user-research`
- **Phase:** 1 · Define

## Prompt (verbatim)

> /design:user-research So now based on the roofing documentation assignment, create a UX design plan before coding. I mean, it should be lightweight UX plan so let's say define we have some details you can add it as a bullet points. Let's say problem statement and primary users, jobs to be done, and assumptions. And information architecture, user flows. Screen hierarchy and critical interactions. Empty loading and error states. And keep it accessibility considerations for all the steps. Whichever I'm creating the screens and everything. And create a acceptance criteria also. First, prioritize mobile photo capture for the roofing crew . Second, desktop evidence review for job ID do not write any implementation over here . This is the defined stage which is like we need to define the problem statement and primary users assumptions and information architectures, user flow, and what is the hierarchy and what is the interaction all these things we are going to define here. So maintain that. Plus I have added skill as design research. It is from Anthropic only, default connector from the Claude Code. So that also I can maintain in the repository so that I can explain to the interviewer what process, what research connector I have added to the particular assignment,

## What the AI did
- Wrote `docs/03-ux-design-plan.md`: problem statement + HMW, users, JTBD, key assumptions, then for
  **Part A (mobile capture)** and **Part B (desktop evidence review by job ID)**: IA, user flows,
  screen hierarchy (M1–M6, D1–D5), critical interactions, empty/loading/error states, accessibility per
  step, acceptance criteria (AC-M1–M12, AC-D1–D12).
- No implementation, as instructed.
- Created `process-log/TOOLS_AND_SKILLS.md` documenting the `design:user-research` skill.
  Clarified that it's a **skill** (from Anthropic's Design plugin), not a connector.

## Output
- [docs/03-ux-design-plan.md](../../docs/03-ux-design-plan.md)
- [process-log/TOOLS_AND_SKILLS.md](../TOOLS_AND_SKILLS.md)

## My notes (fill in)
- Kept:
- Changed / overruled:
- Thrown away:

## Follow-up (2026-10-24)
> Commit the working tree changes with a sensible message.

- AI made the first git commit of all docs and the process log so far.
