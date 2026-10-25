# AI Tools, Skills & Connectors Used

Which AI tools, skills and connectors were used on this assignment, and why. Useful for the
"Working with AI" criterion (E23): it shows the setup, not just the output.

> **Terminology:** a **skill** is a packaged set of instructions/method that Claude loads for a task
> (e.g. a research framework). A **connector** (MCP server) gives Claude access to an external tool or
> data source (e.g. Figma, Google Drive). Skills come in **plugins**.

## Core tool
| Tool | What it is | Used for |
|---|---|---|
| **Claude Code** (desktop app, Code tab) · model **Claude Opus 5.5** | Anthropic's AI coding/design agent | All analysis, docs, process log, later the prototype |
| Built-in browser (Claude desktop app) | In-app browser pane | Reading the brief at spd-take-home.vercel.app (Prompt 001) |

## Skills
| Skill | Source | Added by | Used in | What it contributed |
|---|---|---|---|---|
| `design:user-research` | Anthropic **Design** plugin (default plugin available in Claude Code) | Me (Veerakumar) | Prompt 002, Prompt 003 | Research methods table, interview-guide structure (warm-up → context → deep dive → reaction → wrap-up), analysis frameworks (affinity mapping, impact/effort, journey mapping, **jobs to be done**). Shaped the assumptions/validation plan (doc 02) and the JTBD section of the UX plan (doc 03). |

**How I steered it:** the skill is generic (it assumes 2–4 week studies with 5–8 participants). I
scaled it down to a **2-day take-home**: desk research, roofing videos, 2–3 guerrilla chats and a hallway
test, instead of a formal study.

| `/design` → **Design** artifact type | Claude (built-in Artifact type: a canvas of live artboards) | Me | Prompt 008 | Hosted the crew mobile prototype: 1 interactive artboard + 15 state snapshots. Link: https://claude.ai/artifact/CJucueKqgAgMs9pMcq8Dbz |

| `figma-code-connect` | Anthropic skills | Me | Prompt 009 | **Not used as intended:** it maps published Figma components to existing code, and this project had neither. Used the request as a design-to-code conversion instead. |
| React 18 + Vite 5 | Open source | AI (my request) | Prompt 009 | Code version of the crew prototype, `app/crew-mobile/` |
| Built-in browser preview | Claude desktop app | AI | Prompt 009 | Ran and tested the React app at phone size |
| Native `<dialog>` + URL-encoded share links | Web platform | AI | Prompt 024 | Accessible modals (focus trap, Esc) for Compare and Share; share links that really open the customer page without a backend |

**Design systems:** two saved design systems were offered; I chose **none** and gave my own visual
direction (neutral ground, dark text, blue primary, green/amber/red states).

## Other skills available but not (yet) used
From the same Design plugin, candidates for later phases:
- `design:accessibility-review`: WCAG audit of the prototype (Phase 4)
- `design:design-critique`: structured critique of screens (Phase 4)
- `design:ux-copy`: microcopy, error and empty states (Phase 3)
- `design:design-handoff`: build-ready spec, for the "Clarity" criterion (Phase 5)

## Connectors (MCP)
| Connector | Status | Planned use |
|---|---|---|
| Figma | Available, not authorised yet | Possibly for prototype screens |

_Update this file whenever a new tool, skill or connector is used._
