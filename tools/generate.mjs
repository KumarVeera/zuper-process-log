// Builds the static process-log site from the repository's own files. Nothing here is written by hand:
// prompts, log entries and tables are read from process-log/, docs/ and git, so the site can't drift from them.
// Run: cd process-log-site/tools && npm install && npm run generate
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { Marked } from 'marked'

const TOOLS = path.dirname(fileURLToPath(import.meta.url))
const SITE = path.resolve(TOOLS, '..')
const ROOT = path.resolve(SITE, '..')
const LOG_DIR = path.join(ROOT, 'process-log')
const PROMPT_DIR = path.join(LOG_DIR, 'prompts')
const DOCS_DIR = path.join(ROOT, 'docs')

const read = (p) => fs.readFileSync(p, 'utf8')
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const DOCS = fs.readdirSync(DOCS_DIR).filter((f) => /^\d\d-.*\.md$/.test(f)).sort()
const DIAGRAMS = fs.readdirSync(path.join(DOCS_DIR, 'diagrams')).filter((f) => f.endsWith('.svg')).sort()

// ---------- Markdown with repository-aware links ----------
// Links are resolved against the file they appear in, then mapped to the matching place on this site.
// Anything the site doesn't carry (app source files, etc.) is shown as a repository path, not a broken link.
let base = ROOT
function mapLink(href) {
  if (/^(https?:|mailto:)/.test(href)) return { url: href, external: true }
  if (href.startsWith('#')) return { url: href }
  const abs = path.resolve(base, href.split('#')[0])
  const rel = path.relative(ROOT, abs)
  const prompt = rel.match(/^process-log\/prompts\/(\d{3})_/)
  if (prompt) return { url: `index.html#p-${prompt[1]}` }
  if (rel === 'process-log/prompts' || rel === 'process-log/prompts/') return { url: 'index.html#log' }
  if (rel === 'process-log/PROCESS_LOG.md') return { url: 'index.html#outcomes' }
  if (rel === 'process-log/TOOLS_AND_SKILLS.md') return { url: 'index.html#tools' }
  if (rel === 'process-log/SESSION_HANDOFF.md') return { url: 'evidence/session-handoff.html' }
  const doc = rel.match(/^docs\/(\d\d-[^/]+)\.md$/)
  if (doc) return { url: `evidence/${doc[1]}.html` }
  const diagram = rel.match(/^docs\/diagrams\/([^/]+\.svg)$/)
  if (diagram) return { url: `assets/diagrams/${diagram[1]}` }
  return { repo: rel || href }
}

function makeMarked(prefix) {
  const m = new Marked({ gfm: true })
  m.use({
    renderer: {
      link({ href, tokens }) {
        const text = this.parser.parseInline(tokens)
        const t = mapLink(href)
        if (t.repo) return `<span class="repo-path" title="File in the repository: ${esc(t.repo)}">${text}</span>`
        const url = t.external ? t.url : prefix + t.url
        return `<a href="${esc(url)}"${t.external ? ' target="_blank" rel="noopener"' : ''}>${text}</a>`
      },
      image({ href, text }) {
        const t = mapLink(href)
        if (t.url && !t.external) return `<img src="${esc(prefix + t.url)}" alt="${esc(text)}" loading="lazy">`
        if (t.external) return `<img src="${esc(t.url)}" alt="${esc(text)}" loading="lazy">`
        return `<span class="repo-path">${esc(text)}</span>`
      },
      code({ text, lang }) {
        const note = lang === 'mermaid' ? '<p class="code-note">Mermaid diagram source, shown as written in the repository (not rendered here).</p>' : ''
        return `${note}<pre class="code"><code>${esc(text)}</code></pre>`
      },
    },
  })
  return m
}
const mdRoot = makeMarked('')
const mdSub = makeMarked('../')
// Placeholders left in the log ("_(review and fill in)_", "_To confirm._") are flagged, never reworded.
const PLACEHOLDER = /<em>(\([^)]*fill in\)|To confirm\.)<\/em>/g
function md(text, fromDir, sub = false) {
  base = fromDir
  // Wide tables scroll inside their own box on small screens.
  return (sub ? mdSub : mdRoot).parse(text.replace(/<!--[\s\S]*?-->/g, ''))
    .replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>')
    .replace(PLACEHOLDER, '<span class="unresolved"><span class="unresolved__tag">Unresolved</span> <em>$1</em></span>')
}
const mdInline = (text, fromDir) => md(text, fromDir).replace(/^<p>|<\/p>\s*$/g, '')

// Quoted prompts are shown exactly as written: no markdown processing, line breaks kept.
function quoteBlock(lines) {
  const text = lines.map((l) => l.replace(/^>\s?/, '')).join('\n').trim()
  return `<blockquote class="verbatim">${esc(text)}</blockquote>`
}
function mdWithVerbatimQuotes(text, fromDir) {
  const out = []
  let buf = []
  let quote = []
  const flush = () => {
    if (buf.length) { out.push(md(buf.join('\n'), fromDir)); buf = [] }
    if (quote.length) { out.push(quoteBlock(quote)); quote = [] }
  }
  for (const line of text.split('\n')) {
    if (/^>/.test(line)) {
      if (buf.length) { out.push(md(buf.join('\n'), fromDir)); buf = [] }
      quote.push(line)
    } else {
      if (quote.length) { out.push(quoteBlock(quote)); quote = [] }
      buf.push(line)
    }
  }
  flush()
  return out.join('\n')
}

// ---------- Prompt files ----------
function parsePrompt(file) {
  const raw = read(path.join(PROMPT_DIR, file))
  const lines = raw.split('\n')
  const head = lines[0].match(/^# Prompt (\d{3}):\s*(.*)$/)
  const num = head ? head[1] : file.slice(0, 3)
  const title = head ? head[2] : file
  const meta = {}
  const sections = []
  let cur = null
  for (const line of lines.slice(1)) {
    const h = line.match(/^## (.*)$/)
    if (h) { cur = { heading: h[1].trim(), body: [] }; sections.push(cur); continue }
    if (!cur) {
      const mm = line.match(/^- \*\*(.+?):\*\*\s*(.*)$/)
      if (mm) meta[mm[1]] = mm[2].trim()
      continue
    }
    cur.body.push(line)
  }
  sections.forEach((s) => { s.body = s.body.join('\n').trim() })
  const verbatim = sections.find((s) => /^Prompt \(verbatim/i.test(s.heading))
  const notes = sections.find((s) => /^My notes/i.test(s.heading))
  const noteLines = (notes?.body || '').split('\n').map((l) => l.match(/^- (Kept|Changed \/ overruled|Thrown away):\s*(.*)$/)).filter(Boolean)
  const filledNotes = noteLines.filter((m) => m[2].trim())
  const phaseNum = (meta.Phase || '').match(/^(\d)/)?.[1] ?? null
  const rest = sections.filter((s) => s !== verbatim && s !== notes)
  return {
    num, file, title, meta, phaseNum,
    verbatimHeading: verbatim?.heading || null,
    verbatimHtml: verbatim ? mdWithVerbatimQuotes(verbatim.body, PROMPT_DIR) : null,
    rest: rest.map((s) => ({ heading: s.heading, html: mdWithVerbatimQuotes(s.body, PROMPT_DIR) })),
    filledNotes: filledNotes.map((m) => ({ label: m[1], text: m[2] })),
    search: raw.toLowerCase(),
  }
}
const PROMPTS = fs.readdirSync(PROMPT_DIR).filter((f) => /^\d{3}_.*\.md$/.test(f)).sort().map(parsePrompt)

// ---------- PROCESS_LOG.md ----------
const LOG = read(path.join(LOG_DIR, 'PROCESS_LOG.md')).replace(/<!--[\s\S]*?-->/g, '')
function section(text, heading) {
  const re = new RegExp(`^## ${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^\\n]*\\n([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, 'm')
  return text.match(re)?.[1].trim() || ''
}
const timelineText = section(LOG, 'Timeline')
// One labelled bullet ("- **Key decision:** …") from a timeline entry, including its wrapped lines.
function bullet(bodyText, label) {
  const m = bodyText.match(new RegExp(`^- \\*\\*${label}:\\*\\*([\\s\\S]*?)(?=^- \\*\\*|(?![\\s\\S]))`, 'm'))
  return m ? m[1].replace(/\s*\n\s*/g, ' ').trim() : null
}
const ENTRIES = timelineText.split(/^### /m).slice(1).map((chunk) => {
  const [titleLine, ...body] = chunk.split('\n')
  const bodyText = body.join('\n').replace(/^---\s*$/m, '').trim()
  const prompts = [...bodyText.matchAll(/Prompt (\d{3})\]/g)].map((m) => m[1])
  const decision = bullet(bodyText, 'Key decision')
  const overruled = bullet(bodyText, 'AI got wrong / I overruled')
  return {
    title: titleLine.trim(), prompts, html: md(bodyText, LOG_DIR),
    decision, decisionHtml: decision ? mdInline(decision, LOG_DIR) : null,
    placeholder: !!overruled && /fill in/.test(overruled),
  }
})

// Rows of a markdown table, as arrays of raw cell text (header and divider dropped).
const tableRows = (text) => text.split('\n').filter((l) => /^\|/.test(l)).slice(2)
  .map((l) => l.replace(/^\||\|$/g, '').split('|').map((c) => c.trim()))

// "Prompts that mattered" rows whose idea a later prompt replaced. Site-only labels; the log text is untouched.
const REPLACED = {
  '012': { by: '014', what: 'Typeface changed to Manrope' },
  '016': { by: '020', what: 'Weather card removed from Home' },
  '018': { by: '019', what: 'Table view removed; cards only' },
}
function labelReplaced(html) {
  return html.replace(/<tr>\s*<td>(\d{3})<\/td>([\s\S]*?)<\/td>\s*<\/tr>/g, (row, num, rest) => {
    const r = REPLACED[num]
    if (!r) return row
    return `<tr class="row--replaced">\n<td>${num}</td>${rest} <span class="replaced"><span class="replaced__tag">Later replaced</span> ${esc(r.what)} in <a href="#p-${r.by}">prompt ${r.by}</a></span></td>\n</tr>`
  })
}
const TABLES = [
  { id: 'mattered', title: 'Prompts that mattered', html: labelReplaced(md(section(LOG, 'Prompts that mattered'), LOG_DIR)) },
  { id: 'thrown', title: 'What I threw away', html: md(section(LOG, 'What I threw away'), LOG_DIR) },
  { id: 'wrong', title: 'Where the AI got it wrong (and what I did)', html: md(section(LOG, 'Where the AI got it wrong'), LOG_DIR) },
]
const countRows = (name) => section(LOG, name).split('\n').filter((l) => /^\|/.test(l) && !/^\|\s*-/.test(l) && !/^\|\s*\|/.test(l)).length - 1
const WRONG_ROWS = countRows('Where the AI got it wrong')
const WRONG = tableRows(section(LOG, 'Where the AI got it wrong'))
const THROWN = tableRows(section(LOG, 'What I threw away')).filter((r) => r.some(Boolean))
const TO_CONFIRM = WRONG.filter((r) => /To confirm/.test(r[2] || ''))
const LOG_INTRO = md(LOG.split('## Timeline')[0].replace(/^# .*\n/, ''), LOG_DIR)

// Attach each timeline entry to the first prompt it cites.
const entryFor = {}
const looseEntries = []
ENTRIES.forEach((e) => {
  const n = e.prompts.find((p) => PROMPTS.some((x) => x.num === p))
  if (n) (entryFor[n] ||= []).push(e)
  else looseEntries.push(e)
})

const TOOLS_HTML = md(read(path.join(LOG_DIR, 'TOOLS_AND_SKILLS.md')).replace(/^# .*\n/, ''), LOG_DIR)

// ---------- git history ----------
let COMMITS = []
try {
  COMMITS = execSync("git log --reverse --date=format:'%Y-%m-%d %H:%M' --pretty=format:'%h%x09%ad%x09%s'", { cwd: ROOT, encoding: 'utf8' })
    .trim().split('\n').filter(Boolean).map((l) => { const [hash, date, subject] = l.split('\t'); return { hash, date, subject } })
} catch { COMMITS = [] }

// ---------- Brief link and other evidence pulled from the files ----------
const README = read(path.join(ROOT, 'README.md'))
const BRIEF_URL = README.match(/https:\/\/spd-take-home\.vercel\.app\/?/)?.[0] || null
const CANVAS_URL = read(path.join(LOG_DIR, 'SESSION_HANDOFF.md')).match(/https:\/\/claude\.ai\/artifact\/[A-Za-z0-9]+/)?.[0] || null
const HANDOFF = read(path.join(LOG_DIR, 'SESSION_HANDOFF.md'))
// Deployed prototype link, set in assets/config.js (not recorded in the repository's docs).
const PROTOTYPE_URL = read(path.join(SITE, 'assets', 'config.js')).match(/prototypeUrl:\s*'([^']+)'/)?.[1] || null

// Screens captured from the running prototype for the case study (case-study/screens). Captions describe what
// each capture shows; nothing here is a mock-up or a "before" state.
const SCREENS_DIR = path.join(ROOT, 'case-study', 'screens')
const SCREEN_INFO = [
  ['crew', 'crew-dashboard.png', 'Crew Home: today’s progress, quick actions and schedule'],
  ['crew', 'crew-checklist.png', 'Required shots by Before / During / After'],
  ['crew', 'crew-frame.png', 'Camera with framing guide (simulated, labelled demo)'],
  ['crew', 'crew-review-flagged.png', 'Quality check flags a blurry photo'],
  ['crew', 'crew-notes.png', 'Note and one-tap tags before saving'],
  ['crew', 'crew-saved.png', 'Saved to the job folder'],
  ['crew', 'crew-uploads.png', 'Offline upload queue'],
  ['crew', 'crew-finish.png', 'Finish job: missing shots need a photo or a reason'],
  ['crew', 'crew-job-detail.png', 'Job detail'],
  ['office', 'office-dashboard.png', 'Office dashboard: key metrics, Review now, job tabs (after prompt 029)'],
  ['office', 'office-job-top.png', 'Job review page with Start review and review progress (after prompt 028)'],
  ['office', 'office-panel-crop.png', 'Photo panel with Approve and Reject'],
  ['office', 'office-compare.png', 'Before / After comparison'],
  ['office', 'office-share.png', 'Share dialog with a warning before the link is created'],
  ['customer', 'customer-share.png', 'Customer share page (read-only link)'],
].filter(([, f]) => fs.existsSync(path.join(SCREENS_DIR, f)))

// Original source files, copied as-is so every "view original" link works once deployed.
const SOURCES = [
  ...fs.readdirSync(PROMPT_DIR).filter((f) => f.endsWith('.md')).map((f) => [path.join(PROMPT_DIR, f), `sources/prompts/${f}`]),
  ...['PROCESS_LOG.md', 'TOOLS_AND_SKILLS.md', 'SESSION_HANDOFF.md'].map((f) => [path.join(LOG_DIR, f), `sources/process-log/${f}`]),
  ...DOCS.map((f) => [path.join(DOCS_DIR, f), `sources/docs/${f}`]),
]

// ---------- Page shell ----------
const PHASES = [
  ['0', 'Understand'], ['1', 'Define'], ['2', 'Explore'], ['3', 'Prototype'], ['4', 'Test & refine'], ['5', 'Submit'],
]
const generatedAt = new Date().toISOString().slice(0, 10)

function shell({ title, description, body, prefix = '', current = '' }) {
  const nav = [
    ['index.html#summary', 'Summary'], ['index.html#needs-input', 'Needs input'], ['index.html#decisions', 'Decisions'],
    ['index.html#log', 'Prompts'], ['index.html#outcomes', 'Kept & AI errors'], ['index.html#evidence', 'Evidence'],
    ['index.html#tools', 'Tools'], ['index.html#reflection', 'Reflection'],
  ]
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="icon" href="${prefix}assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${prefix}assets/site.css">
</head>
<body${current ? ` data-page="${current}"` : ''}>
<a class="skip" href="#main">Skip to content</a>
<header class="topbar">
  <a class="brand" href="${prefix}index.html"><span class="brand__mark" aria-hidden="true">Z</span><span>Process log<span class="brand__sub"> · Zuper take-home</span></span></a>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
  <nav id="site-nav" class="nav" aria-label="Sections">
    ${nav.map(([href, label]) => `<a href="${prefix}${href}">${label}</a>`).join('\n    ')}
  </nav>
</header>
<main id="main">
${body}
</main>
<footer class="footer">
  <p>Generated on ${generatedAt} from <code>process-log/</code>, <code>docs/</code> and the git history of the take-home repository. Prompts are quoted exactly as written in the prompt files.</p>
  <p><a href="#main">Back to top</a></p>
</footer>
<a class="to-top" href="#main" aria-label="Back to top">↑ Top</a>
<script src="${prefix}assets/config.js"></script>
<script src="${prefix}assets/site.js"></script>
</body>
</html>
`
}

// ---------- Index page ----------
const UNDOC = (what) => `<p class="undoc"><span class="undoc__tag">Undocumented</span> ${what}</p>`
const dates = [...new Set(PROMPTS.map((p) => p.meta.Date).filter(Boolean))].sort()
const notesFilled = PROMPTS.filter((p) => p.filledNotes.length).length
const phaseCounts = Object.fromEntries(PHASES.map(([n]) => [n, PROMPTS.filter((p) => p.phaseNum === n).length]))

function promptCard(p) {
  const entries = entryFor[p.num] || []
  const meta = [
    p.meta.Date && `<span>${esc(p.meta.Date)}</span>`,
    p.meta['Input type'] && `<span>${esc(p.meta['Input type'])}</span>`,
    p.meta.Phase && `<span>Phase ${esc(p.meta.Phase)}</span>`,
  ].filter(Boolean).join('<span aria-hidden="true">·</span>')
  const status = p.meta.Status ? `<p class="status-note"><strong>Status:</strong> ${esc(p.meta.Status.replace(/\*\*/g, ''))}</p>` : ''
  return `<article class="prompt" id="p-${p.num}" data-phase="${p.phaseNum ?? ''}" data-search="${esc(p.search)}">
  <header class="prompt__head">
    <span class="prompt__num">${p.num}</span>
    <div>
      <h3 class="prompt__title">${esc(p.title)}</h3>
      <p class="prompt__meta">${meta}</p>
      ${p.meta.Tool ? `<p class="prompt__tool">${esc(p.meta.Tool.replace(/\*\*/g, ''))}</p>` : ''}
    </div>
  </header>
  ${status}
  <section class="prompt__block">
    <h4 class="label">My prompt${p.verbatimHeading && /abridged/i.test(p.verbatimHeading) ? ' (verbatim, repeated parts abridged in the source file)' : ' (verbatim)'}</h4>
    ${p.verbatimHtml || UNDOC('The prompt text is not recorded in this file.')}
  </section>
  ${entries.map((e) => `<section class="prompt__block prompt__log">
    <h4 class="label">Process-log entry · ${esc(e.title)}</h4>
    ${e.html}
  </section>`).join('\n')}
  <details class="prompt__details">
    <summary>What the AI produced <span class="muted">(recorded in the prompt file${p.rest.length ? `: ${p.rest.map((s) => esc(s.heading)).join(', ')}` : ''})</span></summary>
    ${p.rest.map((s) => `<section class="prompt__sub"><h5>${esc(s.heading)}</h5>${s.html}</section>`).join('\n') || UNDOC('No AI output is recorded for this prompt.')}
  </details>
  <section class="prompt__block" id="p-${p.num}-notes">
    <h4 class="label">My notes: kept · changed / overruled · thrown away</h4>
    ${p.filledNotes.length
      ? `<ul>${p.filledNotes.map((n) => `<li><strong>${esc(n.label)}:</strong> ${esc(n.text)}</li>`).join('')}</ul>`
      : UNDOC('The “My notes” section in this prompt file was left blank.')}
  </section>
  <p class="prompt__source">Source: <a href="sources/prompts/${esc(p.file)}" target="_blank" rel="noopener"><code>process-log/prompts/${esc(p.file)}</code> · view original file</a></p>
</article>`
}

// ---------- Summary, needs-input and decisions data (all drawn from the files above) ----------
const decisionEntries = ENTRIES.filter((e) => e.decision && e.prompts[0])
const SUMMARY_DECISIONS = ['001', '002', '005', '008', '022', '028']
  .map((n) => decisionEntries.find((e) => e.prompts[0] === n)).filter(Boolean)
const placeholderEntries = ENTRIES.filter((e) => e.placeholder && e.prompts[0])

// Discarded ideas, each credited to where it came from, with the prompt where it was dropped.
const DISCARDED = [
  { what: 'Twenty “functional requirements” in the first breakdown', from: 'AI', note: 'mostly the AI’s own ideas; re-sorted into explicit, inferred and assumed', link: '#p-002', label: 'prompt 002' },
  { what: 'Desktop intro panel around the phone', from: 'AI', note: 'marketing copy nobody asked for', link: '#p-015', label: 'prompt 015' },
  { what: 'Cards / Table switch on the phone schedule', from: 'Me', note: 'my idea in prompt 018; cards only from then on', link: '#p-019', label: 'prompt 019' },
  { what: 'Weather card on Home', from: 'Me', note: 'my idea in prompt 016; removed', link: '#p-020', label: 'prompt 020' },
  { what: 'Quick-action pages repeating the tapped card', from: 'AI', note: 'removed; heading and details only', link: '#p-020', label: 'prompt 020' },
  ...THROWN.map((r) => ({ what: r[1], from: 'Design', note: r[2], link: '#thrown', label: 'thrown-away table' })),
]
const SUMMARY_MISTAKES = ['functional requirements', 'regex cleanup', 'desktop marketing', 'Priya', 'Office job tabs scrolled']
  .map((k) => WRONG.find((r) => (r[1] || '').includes(k))).filter(Boolean)

const usabilityDoc = read(path.join(DOCS_DIR, '06-usability-check.md'))
const firstTable = []
for (const l of usabilityDoc.split('\n')) { if (/^\|/.test(l)) firstTable.push(l); else if (firstTable.length) break }

const latestCommit = COMMITS[COMMITS.length - 1]

const evidenceDocs = DOCS.map((f) => {
  const title = read(path.join(DOCS_DIR, f)).match(/^# (.*)$/m)?.[1] || f
  return `<li><a href="evidence/${f.replace(/\.md$/, '.html')}"><strong>${esc(title)}</strong><span class="muted">docs/${esc(f)}</span></a><a class="doc-list__src" href="sources/docs/${esc(f)}" target="_blank" rel="noopener">Original .md</a></li>`
}).join('\n')

const indexBody = `
<section class="hero" id="overview" aria-labelledby="overview-title">
  <p class="eyebrow">Senior AI-Native Product Designer · take-home process log</p>
  <h1 id="overview-title">Photo documentation for a roofing crew, designed with AI</h1>
  <div class="hero__intro">${md(README.split('\n').filter((l) => !l.startsWith('#') && !l.startsWith('|') && !/^Brief:/.test(l)).join('\n'), ROOT)}</div>
  ${LOG_INTRO}
  <div class="hero__links">
    ${BRIEF_URL ? `<a class="btn" href="${esc(BRIEF_URL)}" target="_blank" rel="noopener">Read the brief</a>` : ''}
    ${PROTOTYPE_URL
    ? `<a class="btn btn--primary" data-prototype-link href="${esc(PROTOTYPE_URL)}" target="_blank" rel="noopener">Open the prototype</a>`
    : `<a class="btn btn--primary" data-prototype-link hidden href="#" target="_blank" rel="noopener">Open the prototype</a>
    <span class="undoc" data-prototype-missing><span class="undoc__tag">Undocumented</span> The deployed prototype URL is not recorded in the repository. Add it in <code>assets/config.js</code>.</span>`}
  </div>
  <dl class="stats">
    <div><dt>Prompts logged</dt><dd>${PROMPTS.length}</dd></div>
    <div><dt>Working days</dt><dd>${dates.length}</dd><dd class="stats__sub">${dates.map(esc).join(' – ')}</dd></div>
    <div><dt>Commits</dt><dd>${COMMITS.length}</dd></div>
    <div><dt>AI errors logged</dt><dd>${WRONG_ROWS}</dd></div>
    <div><dt>“My notes” filled</dt><dd>${notesFilled} of ${PROMPTS.length}</dd></div>
  </dl>
</section>

<section class="section" id="goal" aria-labelledby="goal-title">
  <h2 id="goal-title">Assignment goal</h2>
  <p>Design how a roofing crew takes job photos, and how the office finds and shares them as proof. The brief asks for a prototype link (the crew’s phone plus one office or customer view) and a process log covering the prompts that mattered, what was thrown away and where the AI got it wrong.</p>
  <p class="muted small">Source: <code>README.md</code> and <code>CLAUDE.md</code> in the repository, and the requirements breakdown in <a href="evidence/01-assignment-breakdown.html">docs/01</a>.</p>
</section>

<section class="section" id="summary" aria-labelledby="summary-title">
  <h2 id="summary-title">Executive summary</h2>
  <p>The short version, every item linked to where the log records it. Quotes are from <code>PROCESS_LOG.md</code>; nothing here is new text about the work.</p>
  <div class="summary">
    <section class="summary__col" aria-labelledby="sum-decisions">
      <h3 id="sum-decisions">Key decisions</h3>
      <ol class="summary__list">
        ${SUMMARY_DECISIONS.map((e) => `<li><a class="summary__ref" href="#p-${e.prompts[0]}">Prompt ${e.prompts[0]}</a> ${e.decisionHtml}</li>`).join('\n        ')}
      </ol>
      <a class="summary__more" href="#decisions">All ${decisionEntries.length} recorded decisions</a>
    </section>
    <section class="summary__col" aria-labelledby="sum-discarded">
      <h3 id="sum-discarded">What was thrown away</h3>
      <ul class="summary__list">
        ${DISCARDED.map((d) => `<li><span class="source-tag source-tag--${d.from === 'AI' ? 'ai' : d.from === 'Me' ? 'me' : 'design'}">${d.from === 'AI' ? 'AI added' : d.from === 'Me' ? 'My idea' : 'Design'}</span> <strong>${esc(d.what)}</strong>: ${mdInline(d.note, LOG_DIR)} (<a href="${d.link}">${d.label}</a>)</li>`).join('\n        ')}
      </ul>
    </section>
    <section class="summary__col" aria-labelledby="sum-mistakes">
      <h3 id="sum-mistakes">Where the AI got it wrong</h3>
      <ul class="summary__list">
        ${SUMMARY_MISTAKES.map((r) => `<li>${mdInline(r[1], LOG_DIR)} <span class="summary__fix">→ ${mdInline(r[2], LOG_DIR)}</span></li>`).join('\n        ')}
      </ul>
      <a class="summary__more" href="#wrong">All ${WRONG_ROWS} logged AI errors</a>
    </section>
  </div>
</section>

<section class="section" id="needs-input" aria-labelledby="needs-title">
  <h2 id="needs-title">Needs your input before deployment</h2>
  <p>The scan found <strong>${PROMPTS.length - notesFilled} of ${PROMPTS.length}</strong> “My notes” sections blank, <strong>${placeholderEntries.length}</strong> timeline placeholders and <strong>${TO_CONFIRM.length}</strong> row marked “To confirm”. These are the ones that matter most. Nothing below has been filled in for you.</p>
  <ol class="needs">
    ${PROTOTYPE_URL ? '' : `<li><strong>Deployed prototype URL.</strong> Not recorded anywhere in the repository. Add it as <code>prototypeUrl</code> in <code>assets/config.js</code>; until then the prototype button stays hidden.</li>`}
    ${TO_CONFIRM.length ? `<li><strong>Confirm the “record screen” reading.</strong> The AI read “record screen” in the first prompt as “screens to design”, and the AI-errors row is still marked <em>To confirm</em> (<a href="#p-001">prompt 001</a>, <a href="#wrong">AI-errors table</a>).</li>` : ''}
    ${placeholderEntries.length ? `<li><strong>Fill in “AI got wrong / I overruled”</strong> for the define-stage entries still showing a placeholder: ${placeholderEntries.map((e) => `<a href="#p-${e.prompts[0]}">${e.prompts[0]}</a>`).join(', ')}.</li>` : ''}
    <li><strong>Write your own final reflection.</strong> The <a href="#reflection">reflection</a> is drafted from the log only.</li>
    <li><strong>My notes for <a href="#p-002-notes">prompt 002</a></strong>, facts vs guesses: the step that reframed the brief.</li>
    <li><strong>My notes for <a href="#p-008-notes">prompt 008</a> and <a href="#p-024-notes">024</a></strong>, the honesty rule: why GPS and “Verified” were left out.</li>
    <li><strong>My notes for <a href="#p-022-notes">prompt 022</a> and <a href="#p-026-notes">026</a></strong>, the usability audit and the office review workflow.</li>
  </ol>
</section>

<section class="section" id="decisions" aria-labelledby="decisions-title">
  <h2 id="decisions-title">Key decisions and before / after</h2>
  <h3>Every recorded decision</h3>
  <p class="muted small">The “Key decision” line from each timeline entry in <code>PROCESS_LOG.md</code>, in order.</p>
  <div class="table-wrap"><table class="decisions">
    <thead><tr><th scope="col">Prompt</th><th scope="col">Decision</th></tr></thead>
    <tbody>
      ${decisionEntries.map((e) => `<tr><td><a href="#p-${e.prompts[0]}">${e.prompts[0]}</a></td><td>${e.decisionHtml}</td></tr>`).join('\n      ')}
    </tbody>
  </table></div>
  <h3>Before / after: the usability check</h3>
  <p class="muted small">From <a href="evidence/06-usability-check.html">docs/06-usability-check.md</a> (prompt 022). “Before” is the state the audit found; “After” is what was built and re-tested.</p>
  ${md(firstTable.join('\n'), DOCS_DIR)}
  <h3>Screens as built</h3>
  <p class="muted small">Captured from the running prototype on 25 Oct 2026 for the case study (<span class="repo-path">case-study/screens/</span>). These show the current state only; no earlier versions were saved, so no visual “before” is claimed.</p>
  ${['crew', 'office', 'customer'].map((g) => {
    const shots = SCREEN_INFO.filter(([grp]) => grp === g)
    if (!shots.length) return ''
    return `<h4 class="gallery__title">${{ crew: 'Crew phone', office: 'Office portal', customer: 'Customer link' }[g]}</h4>
  <ul class="gallery gallery--${g}">
    ${shots.map(([, f, cap]) => `<li><figure><a href="assets/screens/${f}" target="_blank" rel="noopener"><img src="assets/screens/${f}" alt="${esc(cap)}" loading="lazy"></a><figcaption>${esc(cap)}</figcaption></figure></li>`).join('\n    ')}
  </ul>`
  }).join('\n  ')}
</section>

<section class="section" id="log" aria-labelledby="log-title">
  <h2 id="log-title">Chronological process log</h2>
  <p>Every prompt in order, quoted exactly from its prompt file, with the matching process-log entry. “What the AI produced” is the record kept in each prompt file; it was written during the work with the AI, so treat it as the AI’s account. My own notes are shown where I wrote them.</p>
  <div class="filters" role="group" aria-label="Filter prompts">
    <button type="button" class="chip" aria-pressed="true" data-phase="all">All <span>${PROMPTS.length}</span></button>
    ${PHASES.filter(([n]) => phaseCounts[n]).map(([n, l]) => `<button type="button" class="chip" aria-pressed="false" data-phase="${n}">${n} · ${esc(l)} <span>${phaseCounts[n]}</span></button>`).join('\n    ')}
    <label class="search"><span class="visually-hidden">Search prompts</span><input type="search" placeholder="Search prompts and outputs" data-search-input></label>
    <button type="button" class="link" data-toggle-all>Expand all AI outputs</button>
  </div>
  <p class="count" role="status" aria-live="polite" data-count>${PROMPTS.length} prompts</p>
  <div class="prompts">
    ${dates.map((d) => `<h3 class="day">${esc(d)}</h3>\n${PROMPTS.filter((p) => p.meta.Date === d).map(promptCard).join('\n')}`).join('\n')}
    ${PROMPTS.filter((p) => !dates.includes(p.meta.Date)).map(promptCard).join('\n')}
  </div>
  ${looseEntries.length ? `<h3 class="day">Log entries without a prompt file</h3>${looseEntries.map((e) => `<article class="prompt"><h4 class="label">${esc(e.title)}</h4>${e.html}</article>`).join('')}` : ''}
</section>

<section class="section" id="outcomes" aria-labelledby="outcomes-title">
  <h2 id="outcomes-title">What I kept, what I rejected, where the AI got it wrong</h2>
  <p>These three tables are copied from <code>process-log/PROCESS_LOG.md</code>, row for row. Corrections and outcomes appear only where the log records them.</p>
  ${TABLES.map((t) => `<section class="table-block" id="${t.id}"><h3>${esc(t.title)}</h3>${t.html || UNDOC('This table is empty in the process log.')}</section>`).join('\n')}
  ${UNDOC(`Per-prompt “kept / changed / thrown away” notes: ${PROMPTS.length - notesFilled} of ${PROMPTS.length} prompt files have this section blank, so decisions beyond the tables above are not documented.`)}
</section>

<section class="section" id="evidence" aria-labelledby="evidence-title">
  <h2 id="evidence-title">Evidence</h2>
  <h3>Flow diagrams</h3>
  <div class="diagrams">
    ${DIAGRAMS.map((d) => `<figure><a href="assets/diagrams/${esc(d)}" target="_blank" rel="noopener"><img src="assets/diagrams/${esc(d)}" alt="${esc(d.replace(/-/g, ' ').replace('.svg', ''))} diagram" loading="lazy"></a><figcaption><code>docs/diagrams/${esc(d)}</code> · open full size</figcaption></figure>`).join('\n    ')}
  </div>
  <h3>Screenshots</h3>
  <p>${SCREEN_INFO.length} captures of the running prototype are shown under <a href="#decisions">Key decisions and before / after</a>. They were taken on 25 Oct 2026 for the case study; earlier states were checked in the browser preview but not saved.</p>
  <h3>Design documents</h3>
  <ul class="doc-list">
    ${evidenceDocs}
    <li><a href="evidence/session-handoff.html"><strong>Session handoff</strong><span class="muted">process-log/SESSION_HANDOFF.md</span></a><a class="doc-list__src" href="sources/process-log/SESSION_HANDOFF.md" target="_blank" rel="noopener">Original .md</a></li>
    <li><a href="sources/process-log/PROCESS_LOG.md" target="_blank" rel="noopener"><strong>Process log (raw)</strong><span class="muted">process-log/PROCESS_LOG.md</span></a></li>
    <li><a href="sources/process-log/TOOLS_AND_SKILLS.md" target="_blank" rel="noopener"><strong>Tools and skills (raw)</strong><span class="muted">process-log/TOOLS_AND_SKILLS.md</span></a></li>
  </ul>
  <h3>Prototype and design canvas</h3>
  <ul class="link-list">
    ${PROTOTYPE_URL
    ? `<li><a data-prototype-link href="${esc(PROTOTYPE_URL)}" target="_blank" rel="noopener">Deployed prototype</a> <span class="muted small">crew phone; office portal at <a href="${esc(PROTOTYPE_URL)}?view=office" target="_blank" rel="noopener">?view=office</a></span></li>`
    : `<li><a data-prototype-link hidden href="#" target="_blank" rel="noopener">Deployed prototype</a><span data-prototype-missing>${UNDOC('Deployed prototype URL not recorded in the repository.')}</span></li>`}
    ${CANVAS_URL ? `<li><a href="${esc(CANVAS_URL)}" target="_blank" rel="noopener">Earlier Claude Design canvas</a> <span class="muted small">(private artifact; may need the owner to share it)</span></li>` : ''}
    <li><span class="repo-path">app/roofing-crew-mobile/</span> <span class="muted small">React + Vite source of the prototype, in the repository</span></li>
  </ul>
  <h3>Commit history</h3>
  ${latestCommit ? `<p class="muted small">As of ${esc(latestCommit.date)} (<code>${esc(latestCommit.hash)}</code>), when this site was generated. Later commits are not listed until the site is regenerated.</p>` : ''}
  ${COMMITS.length ? `<ol class="commits">${COMMITS.map((c) => `<li><code>${esc(c.hash)}</code><span class="muted">${esc(c.date)}</span><span>${esc(c.subject)}</span></li>`).join('\n')}</ol>` : UNDOC('Git history was not available when this site was generated.')}
</section>

<section class="section" id="tools" aria-labelledby="tools-title">
  <h2 id="tools-title">Tools, skills and connectors</h2>
  <p class="muted small">From <code>process-log/TOOLS_AND_SKILLS.md</code>.</p>
  ${TOOLS_HTML}
</section>

<section class="section" id="reflection" aria-labelledby="reflection-title">
  <h2 id="reflection-title">Reflection on AI-assisted design</h2>
  ${UNDOC('I have not written my own final reflection yet. The points below are drawn only from what the log records, and each one links to its evidence.')}
  <ol class="reflection">
    <li><strong>The AI over-reached on scope, and separating facts from guesses fixed it.</strong> The first breakdown listed 20 “functional requirements”, most of them the AI’s own ideas. Prompt 002 re-sorted them into explicit, inferred and assumed (<a href="#p-002">Prompt 002</a>, <a href="#wrong">AI-errors table</a>).</li>
    <li><strong>Not every cut idea was the AI’s.</strong> The AI added a desktop intro panel and banners repeating the tapped quick action (removed in <a href="#p-015">015</a> and <a href="#p-020">020</a>). The weather card and the Cards/Table switch came from the prompts themselves (<a href="#p-016">016</a>, <a href="#p-018">018</a>) and were cut in <a href="#p-020">020</a> and <a href="#p-019">019</a>.</li>
    <li><strong>Testing in a real browser caught what reading the code didn’t.</strong> A regex cleanup that deleted CSS rules, a photo panel that shrank to nothing on short screens, keyboard focus lost after a decision. All were found at phone size in the browser preview (<a href="#wrong">AI-errors table</a>).</li>
    <li><strong>An honesty rule set at the start held throughout.</strong> No GPS, “verified” or original-file claims unless they were built. The office view dropped the map and Verified badge from its own design because the crew app doesn’t record them (<a href="#p-008">008</a>, <a href="#p-024">024</a>, <a href="#thrown">thrown-away table</a>).</li>
    <li><strong>Not everything was finished.</strong> Connecting the crew app and office view through shared state was planned but not built (<a href="#p-027">027</a>), and ${PROMPTS.length - notesFilled} of ${PROMPTS.length} prompt files still have blank personal notes.</li>
  </ol>
</section>
`

// ---------- Write output ----------
const out = (rel, content) => { const p = path.join(SITE, rel); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, content) }

out('index.html', shell({
  title: 'Process log · Zuper photo documentation take-home',
  description: 'Chronological, verbatim process log of designing a roofing photo-documentation prototype with AI.',
  body: indexBody,
}))

for (const f of DOCS) {
  const text = read(path.join(DOCS_DIR, f))
  const title = text.match(/^# (.*)$/m)?.[1] || f
  out(`evidence/${f.replace(/\.md$/, '.html')}`, shell({
    title: `${title} · Process log`, description: `Repository document docs/${f}`, prefix: '../', current: 'doc',
    body: `<article class="doc"><p class="eyebrow"><a href="../index.html#evidence">Evidence</a> · <code>docs/${esc(f)}</code> · <a href="../sources/docs/${esc(f)}" target="_blank" rel="noopener">original .md</a></p>${md(text, DOCS_DIR, true)}</article>`,
  }))
}
out('evidence/session-handoff.html', shell({
  title: 'Session handoff · Process log', description: 'process-log/SESSION_HANDOFF.md', prefix: '../', current: 'doc',
  body: `<article class="doc"><p class="eyebrow"><a href="../index.html#evidence">Evidence</a> · <code>process-log/SESSION_HANDOFF.md</code> · <a href="../sources/process-log/SESSION_HANDOFF.md" target="_blank" rel="noopener">original .md</a></p>${md(HANDOFF, LOG_DIR, true)}</article>`,
}))

fs.mkdirSync(path.join(SITE, 'assets/diagrams'), { recursive: true })
DIAGRAMS.forEach((d) => fs.copyFileSync(path.join(DOCS_DIR, 'diagrams', d), path.join(SITE, 'assets/diagrams', d)))
fs.rmSync(path.join(SITE, 'sources'), { recursive: true, force: true })
SOURCES.forEach(([from, to]) => { fs.mkdirSync(path.dirname(path.join(SITE, to)), { recursive: true }); fs.copyFileSync(from, path.join(SITE, to)) })
fs.mkdirSync(path.join(SITE, 'assets/screens'), { recursive: true })
SCREEN_INFO.forEach(([, f]) => fs.copyFileSync(path.join(SCREENS_DIR, f), path.join(SITE, 'assets/screens', f)))

console.log(`Wrote index.html with ${PROMPTS.length} prompts, ${ENTRIES.length} log entries (${looseEntries.length} without a prompt), ${DOCS.length + 1} evidence pages, ${DIAGRAMS.length} diagrams, ${SCREEN_INFO.length} screenshots, ${SOURCES.length} source files, ${COMMITS.length} commits.`)
