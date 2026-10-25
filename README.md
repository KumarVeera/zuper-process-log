# Process-log site

A static website for the take-home process log. It is generated from the repository's own files:
- `process-log/PROCESS_LOG.md`, `TOOLS_AND_SKILLS.md`, `SESSION_HANDOFF.md`
- the prompt files in `process-log/prompts/`
- `docs/` and the git history

Nothing in it is written by hand: every prompt is quoted exactly as written in its prompt file. Anything the
files don't record (for example the blank "My notes" sections, screenshots or the deployed prototype URL) is
labelled **Undocumented**.

## What's here

| Path | What it is |
|---|---|
| `index.html` | Overview, chronological log (27 prompts), kept / rejected / AI-error tables, evidence, tools, reflection |
| `evidence/*.html` | `docs/01`–`06` and the session handoff, rendered as pages |
| `assets/site.css`, `assets/site.js` | Styles and small enhancements (filters, search, mobile menu). The pages work without JavaScript. |
| `assets/config.js` | **Edit this** to add the deployed prototype URL (`prototypeUrl`). No rebuild needed. |
| `assets/diagrams/` | Copies of `docs/diagrams/*.svg` |
| `tools/` | Generator (`generate.mjs`). Only needed to refresh the site after the log changes. Not deployed. |

## Test locally

From the repository root:

```bash
cd process-log-site
```

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173. Any static server works, e.g. `npx serve .`

## Refresh after editing the process log

```bash
cd process-log-site/tools
```

```bash
npm install
```

```bash
npm run generate
```

This rewrites `index.html`, `evidence/` and `assets/diagrams/`. It doesn't touch `assets/site.css`,
`assets/site.js` or `assets/config.js`.

## Deploy to Vercel

**Option A: Vercel dashboard** (the repository must be on GitHub, GitLab or Bitbucket)
- **Root Directory:** `process-log-site`
- **Framework Preset:** Other
- **Build Command:** leave empty (turn Override on and clear it)
- **Output Directory:** `.`
- **Install Command:** leave empty (turn Override on and clear it)

**Option B: Vercel CLI**

```bash
cd process-log-site
```

```bash
npx vercel
```

```bash
npx vercel --prod
```

When the CLI asks, choose: no framework, no build command, output directory `./`.

`vercel.json` turns on clean URLs, and `.vercelignore` keeps `tools/` out of the deployment.
