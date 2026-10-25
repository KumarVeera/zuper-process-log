// Checks the generated site before deploying: every internal link and asset resolves, every prompt is still
// quoted word for word, and no template text is left outside the intentional "Unresolved" labels.
// Run: cd process-log-site/tools && npm run check   (exits 1 if anything fails)
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PROMPT_DIR = path.resolve(SITE, '..', 'process-log', 'prompts')
const unesc = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&')

const pages = ['index.html', ...fs.readdirSync(path.join(SITE, 'evidence')).filter((f) => f.endsWith('.html')).map((f) => `evidence/${f}`)]
const ids = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))
const problems = []

// 1 · Links and assets
let checked = 0
for (const page of pages) {
  const html = fs.readFileSync(path.join(SITE, page), 'utf8')
  for (const [, attr, raw] of html.matchAll(/\s(href|src)="([^"]*)"/g)) {
    const url = unesc(raw)
    if (!url || /^(https?:|mailto:|data:)/.test(url)) continue
    checked++
    const [file, hash] = url.split('#')
    const target = file ? path.normalize(path.join(SITE, path.dirname(page), file)) : path.join(SITE, page)
    if (!target.startsWith(SITE) || !fs.existsSync(target)) { problems.push(`${page}: ${attr} "${url}" → missing file`); continue }
    if (hash && target.endsWith('.html') && !ids(fs.readFileSync(target, 'utf8')).has(hash)) problems.push(`${page}: "${url}" → no element with id "${hash}"`)
  }
}

// 2 · Verbatim prompts: every quoted block in each card equals the source file's quoted lines.
const index = fs.readFileSync(path.join(SITE, 'index.html'), 'utf8')
let exact = 0
const files = fs.readdirSync(PROMPT_DIR).filter((f) => /^\d{3}_.*\.md$/.test(f)).sort()
for (const f of files) {
  const n = f.slice(0, 3)
  const sec = fs.readFileSync(path.join(PROMPT_DIR, f), 'utf8').split(/^## /m).find((s) => /^Prompt \(verbatim/.test(s)) || ''
  const groups = []
  let open = false
  for (const l of sec.split('\n')) {
    if (/^>/.test(l)) { if (!open) groups.push([]); groups[groups.length - 1].push(l.replace(/^>\s?/, '')); open = true } else open = false
  }
  const want = groups.map((g) => g.join('\n').trim())
  const card = (index.split(`id="p-${n}"`)[1] || '').split('prompt__log')[0].split('</article>')[0]
  const got = [...card.matchAll(/<blockquote class="verbatim">([\s\S]*?)<\/blockquote>/g)].map((m) => unesc(m[1]).trim())
  if (JSON.stringify(got) === JSON.stringify(want)) exact++
  else problems.push(`prompt ${n}: quoted text differs from ${f}`)
}

// 3 · Leftover template text in visible content (tags and attributes stripped). The "Unresolved" labels and the
// "Needs your input" list name these placeholders on purpose, so they are left out of the scan.
const visible = (html) => html.replace(/<span class="unresolved">[\s\S]*?<\/em><\/span>/g, '')
  .replace(/<section class="section" id="needs-input"[\s\S]*?<\/section>/, '').replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ')
const PATTERNS = [/fill in/i, /\bTODO\b/, /your-prototype/i, /lorem ipsum/i, /\bTBD\b/, /To confirm/]
for (const page of pages) {
  const text = visible(fs.readFileSync(path.join(SITE, page), 'utf8'))
  for (const re of PATTERNS) {
    const m = text.match(new RegExp(`.{0,50}${re.source}.{0,30}`, re.flags.replace('g', '')))
    if (m) problems.push(`${page}: leftover "${re.source}" in "…${m[0].replace(/\s+/g, ' ').trim()}…"`)
  }
}
const unresolved = (index.match(/class="unresolved__tag"/g) || []).length

console.log(`Links and assets: ${checked} checked across ${pages.length} pages`)
console.log(`Verbatim prompts: ${exact} of ${files.length} exact`)
console.log(`Intentional "Unresolved" labels: ${unresolved}`)
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`)
  problems.forEach((p) => console.log(`  - ${p}`))
  process.exit(1)
}
console.log('No problems found.')
