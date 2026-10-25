# Process Log: Zuper Photo Documentation Take-Home

A running, honest record of how this was designed with AI. It feeds the UX case study and the 60-minute
interview walk-through. The brief asks for three things, which have their own sections at the bottom:
**prompts that mattered · what I threw away · where the AI got it wrong.**

- Every prompt / voice note, verbatim: [`prompts/`](prompts/)
- Requirements breakdown: [`../docs/01-assignment-breakdown.md`](../docs/01-assignment-breakdown.md)

**Phases:** 0 Understand → 1 Define → 2 Explore → 3 Prototype → 4 Test & refine → 5 Submit

---

## Timeline

### 2026-10-24 · Phase 0 Understand: Read and break down the brief
- **Input:** [Prompt 001](prompts/001_2026-10-24_kickoff-read-brief.md) (text)
- **What happened:** AI read the brief and produced a structured breakdown: users (crew lead, PM,
  claims coordinator + external customer/insurer), business goals, 4 journeys, 10 screens, 20 functional
  requirements, feasibility table, edge cases, deliverables.
- **Key decision:** Build the **crew capture loop first** (shot checklist → guided camera → review →
  offline queue), then one office flow told through a single hero story: **the gutter dispute**.
- **Why:** proof is created at capture; all three persona quotes trace back to capture/upload.
- **Intentionally out of scope (proposed):** AI damage assessment, customer accounts, payments, scheduling.
- **Case-study note:** "I started by reframing the problem: it's not a gallery problem, it's a
  *trust-at-capture* problem."

### 2026-10-24 · Phase 1 Define: Explicit requirements vs assumptions
- **Input:** [Prompt 002](prompts/002_2026-10-24_requirements-vs-assumptions.md) (text, `/design:user-research`)
- **What happened:** Split the brief into Explicit (E1–E24), Inferred (I1–I9) and Assumptions (A1–A18)
  in [docs/02](../docs/02-requirements-vs-assumptions.md). Added a light research plan for 2 days.
- **Key decision:** Build order follows evidence: explicit first, then inferred, then the **riskiest**
  assumption. The brief asks for **one** office *or* customer view, so the customer view appears only as
  the end of the share flow.
- **Why:** much of the earlier breakdown (doc 01), such as hashes, PDF packs and 20 FRs, was *my* design,
  not the brief's. Labelling it keeps me honest in the call ("why did you do that?").
- **AI got wrong / I overruled:** Doc 01 presented assumptions (e.g. shot-list templates, in-app-only
  camera) as if they were requirements. Corrected by tagging them as A7 and A9.
- **Case-study note:** "The brief is 3 quotes and 3 questions. My first job was to admit how much I was
  making up, and decide which guesses were worth testing."

### 2026-10-24 · Phase 1 Define: Lightweight UX design plan
- **Input:** [Prompt 003](prompts/003_2026-10-24_ux-design-plan.md) (text, `/design:user-research`)
- **What happened:** Wrote [docs/03](../docs/03-ux-design-plan.md): problem + HMW, users, JTBD,
  assumptions; then IA, flows, screen hierarchy, interactions, states, accessibility and acceptance
  criteria for **A. mobile capture** (M1–M6) and **B. desktop evidence review by job ID** (D1–D5).
  Logged tools/skills in [TOOLS_AND_SKILLS.md](TOOLS_AND_SKILLS.md).
- **Key decision:** Design principle *"Proof is created at capture, not in the office."* Accessibility
  is written into each step, not bolted on. AI is advisory only: it never blocks capture, and its tags
  show as "Suggested" until a person confirms.
- **Why:** crews work with gloves, in sun, on ladders, so accessibility here is the core usability problem,
  not compliance.
- **AI got wrong / I overruled:** _(review the plan and fill in)_
- **Case-study note:** "Defined acceptance criteria before drawing a single screen, so the prototype
  could be tested against them."

### 2026-10-24 · Phase 1 Define: Crew user flow
- **Input:** [Prompt 004](prompts/004_2026-10-24_crew-user-flow.md) (text)
- **What happened:** Mapped the crew flow in [docs/04](../docs/04-crew-user-flow.md): overview, detailed
  decision flowchart, background upload state diagram, step table with a11y + AC links.
- **Key decision:** Upload is a **separate background loop**, so the crew never waits for signal. The
  only way to complete a required shot without a photo is **Skip + reason**.
- **Why:** keeps "done" honest for the office, and removes the "upload at night" step entirely (E8).
- **AI got wrong / I overruled:** _(review and fill in)_
- **Case-study note:** "The flow has more recovery paths than happy-path steps. That's the reality of a roof."

### 2026-10-24 · Phase 1 Define: Office user flow
- **Input:** [Prompt 005](prompts/005_2026-10-24_office-user-flow.md) (text)
- **What happened:** Mapped the office flow in [docs/05](../docs/05-office-user-flow.md): dispute flow
  (Sean), insurer pack flow (Priya), share-link lifecycle, step table, decision rules, crew↔office mapping.
- **Key decision:** The system **shows facts, people judge**: no automatic "fraud" or "safe" verdicts, no
  AI damage judgement. Missing-data warnings come **before** sharing, not after.
- **Why:** proof is a legal/trust question (E12, E13). The office person owns the judgement.
- **AI got wrong / I overruled:** _(review and fill in)_
- **Case-study note:** "Every crew decision shows up somewhere in the office view. The two flows were
  designed as one system."

### 2026-10-24 · Phase 1 Define: Crew flow as a presentation diagram
- **Input:** [Prompt 006](prompts/006_2026-10-24_crew-flow-diagram.md) (text)
- **What happened:** Replaced "explanation + Mermaid" with one clean visual:
  [diagrams/crew-user-flow.svg](../docs/diagrams/crew-user-flow.svg), covering checklist → capture →
  quality preview → save to job folder → upload.
- **Key decision:** Introduced the **job folder** (Job ID / Phase / Shot) as the single structure on the
  phone and in the office. This directly answers "photos everywhere" (E5).
- **AI got wrong / I overruled:** I asked for a *diagram*; the AI's earlier output (doc 04) was mostly
  explanation. The first render also had a subtitle overlapping the start node, which was fixed after a visual check.
- **Case-study note:** "Text docs are for me; diagrams are for the room. I asked for the format the
  interviewers would actually look at."

### 2026-10-24 · Phase 1 Define: Office flow as a presentation diagram
- **Input:** [Prompt 007](prompts/007_2026-10-24_office-flow-diagram.md) (text)
- **What happened:** Drew [diagrams/office-evidence-review-flow.svg](../docs/diagrams/office-evidence-review-flow.svg)
  to match the crew diagram: find job by ID → review job folder → verify photo → share → recipient views.
- **Key decision:** Every crew-side state has a matching office-side state (skipped → "explain the gap",
  offline → "still uploading" banner, no GPS → badge + warning before sharing).
- **AI got wrong / I overruled:** _(review and fill in)_
- **Case-study note:** "Two diagrams, one visual language. The interviewers can read crew and office side by side."

### 2026-10-24 · Phase 3 Prototype: Crew mobile screens
- **Input:** [Prompt 008](prompts/008_2026-10-24_crew-mobile-prototype.md) (text, `/design`)
- **What happened:** Built the crew prototype on a Claude Design canvas
  (<https://claude.ai/artifact/CJucueKqgAgMs9pMcq8Dbz>): 1 interactive prototype + 15 state snapshots,
  following the crew flow diagram step for step. Source kept in `prototype/crew-mobile/`.
- **Key decision:** **Only claim what is built.** The quality check is real (sharpness + light measured
  on the photo). Demo photos and uploads are simulated and labelled as such. No GPS, verified or
  original-file badges.
- **Why:** the brief judges proof and trust; a prototype that fakes proof undermines the whole argument.
- **AI got wrong / I overruled:** _(review and fill in)_
- **Case-study note:** "The colour system has a rule: no state relies on colour. Every status has a
  word and an icon, because the crew reads it in full sun."

### 2026-10-24 · Phase 3 Prototype: Design converted to React code
- **Input:** [Prompt 009](prompts/009_2026-10-24_design-to-react-code.md) (text, via the Code Connect skill)
- **What happened:** Rebuilt the crew prototype as a real React + Vite app in `app/crew-mobile/`, kept
  in the repo, and tested it end to end in the browser, including the real photo-quality check.
- **Key decision:** Code Connect was the wrong tool (no Figma library, no existing components), so I did
  a straight design-to-code conversion instead.
- **AI got wrong / I overruled:** The AI's own first pass had a small status bug ("Uploading · 0 left"),
  caught in browser testing and fixed.
- **Case-study note:** "The prototype became code that someone could build from. That's the Clarity
  criterion, made literal."

### 2026-10-24 · Phase 3 Prototype: Dashboard home for the crew
- **Input:** [Prompt 010](prompts/010_2026-10-24_crew-dashboard-home.md) (text, via the Figma design skill)
- **What happened:** The home screen became a crew dashboard: Today / Week / Month, stat cards for
  Completed / Ongoing / Pending that filter the job list, and an "Ongoing now" card into the same photo
  flow. App folder renamed to `app/roofing-crew-mobile/`.
- **Key decision:** Built it in the React app, not Figma (my choice when asked). The dashboard counts are
  sample data but internally consistent, and HR-2041's status is live from the photo flow.
- **Why:** gives the crew lead a "how am I doing" view without adding steps before the checklist (one tap
  from the dashboard).
- **AI got wrong / I overruled:** The first render had a sync bar narrower than the cards; fixed after the visual check.
- **Case-study note:** "The dashboard answers 'what's left today?' at a glance, but the main action is
  still one tap: Open photo checklist."

### 2026-10-25 · Phase 3 Prototype: Bottom navigation and Home cards
- **Input:** [Prompt 011](prompts/011_2026-10-25_bottom-nav-and-home-cards.md) (text, via the Figma design skill)
- **What happened:** Added the app shell: bottom nav Home · Jobs · Photos · Profile. Home has four cards
  (Today, My schedule, Action required, For my review); Jobs has All / In progress / Completed / Unscheduled
  filters; Photos shows live job folders; Profile has working settings.
- **Key decision:** Hide the nav during capture, and return to the tab the crew came from. "Action required" is
  computed from real app state (missing photos, uploads), not fake numbers.
- **AI got wrong / I overruled:**
  - The AI put Priya (claims) in a scheduling role; changed to Sean (PM).
  - A settings switch that did nothing was replaced with ones the app honours.
  - Job IDs wrapped mid-word; fixed.
- **Case-study note:** "Home answers three questions in one glance: what's today, what does the office need from me,
  and what's waiting on me. The photo flow is still one tap away."

### 2026-10-25 · Phase 3 Prototype: Typeface changed to Bricolage Grotesque
- **Input:** [Prompt 012](prompts/012_2026-10-25_bricolage-grotesque-font.md) (text)
- **What happened:** Swapped Plus Jakarta Sans for Bricolage Grotesque across the React app. It is set through
  one token, so a single change reached every screen. Checked in the browser for loading and overflow.
- **Key decision:** Kept the font in a single CSS token so the brand typeface can change in one line.
- **Case-study note:** "A characterful grotesque gives the app its own voice while staying legible at small
  sizes in sunlight."

### 2026-10-25 · Phase 3 Prototype: Canvas typeface matched to the app
- **Input:** [Prompt 013](prompts/013_2026-10-25_canvas-font-bricolage.md) (text)
- **What happened:** Switched all 16 Design canvas artboards to Bricolage Grotesque and republished (v18), so the
  canvas and the React app share one typeface.

### 2026-10-25 · Phase 3 Prototype: Manrope, lighter style, job detail and camera
- **Input:** [Prompt 014](prompts/014_2026-10-25_manrope-and-app-restructure.md) (text plus two pasted feature lists)
- **What happened:** Switched to Manrope everywhere and toned down weight and copy. Rebuilt Home (active job card
  with roofing image, schedule timeline) and Jobs (blue gradient, metrics, crew, up next). Added a Job detail
  screen (Overview / Photo diary / Work order / Assets), a simulated camera with flash and scene modes, and a
  3-step tutorial. The nav is now persistent.
- **Key decision:** The camera is a **simulation, clearly labelled**. Scene modes demonstrate the quality check, and
  the real phone camera stays one tap away. The nav hides only during full-screen capture, like native camera apps.
- **AI got wrong / I overruled:** The first pass duplicated times in the schedule, had weak contrast on the camera
  title and a Back button that skipped the open job. All were caught in browser testing and fixed.
- **Case-study note:** "The redesign moved weight from words to structure: one image-led job card, one
  timeline, one obvious next action."

### 2026-10-25 · Phase 3 Prototype: Desktop shows only the phone
- **Input:** [Prompt 015](prompts/015_2026-10-25_remove-desktop-intro.md) (text plus screenshot)
- **What happened:** Removed the desktop intro panel I had added in Prompt 014; the prototype now shows only the
  centred phone mockup.
- **AI got wrong / I overruled:** The intro panel was the AI's own addition, and I didn't want it. Removed.

### 2026-10-25 · Phase 3 Prototype: Today's progress, weather, colour-coded quick actions
- **Input:** [Prompt 016](prompts/016_2026-10-25_home-progress-weather-quick-actions.md) (text)
- **What happened:** Replaced the image job card with a live **Today's progress** card (1 of 3 jobs, 33% ring,
  8:12 AM start, 5 photos uploaded). The four cards became colour-coded **Quick actions** (green / orange / red /
  blue tint plus matching stroke) directly below it. Added a compact **site weather** strip for roof safety.
- **Key decision:** Made the given numbers true in the data rather than hard-coding them, so they change as the
  crew works. Weather is labelled as a sample forecast (nothing is connected).
- **Case-study note:** "On a roof, weather is a safety input, so it sits above everything else on Home."

### 2026-10-25 · Phase 3 Prototype: Quick actions become pages
- **Input:** [Prompt 017](prompts/017_2026-10-25_quick-action-pages.md) (text plus reference image)
- **What happened:** Background is now #F5F5F7. The quick actions sit in a white stroked card, styled to the
  reference (tint, light stroke, solid icon square). The in-page tabs were replaced by **four dedicated pages**,
  each with back navigation.
- **Key decision:** Kept Home short: it is now a launcher (weather, progress, quick actions), and the detail lives
  one tap away on its own page.

### 2026-10-25 · Phase 3 Prototype: My schedule on Home with Cards / Table
- **Input:** [Prompt 018](prompts/018_2026-10-25_home-order-schedule-toggle.md) (text)
- **What happened:** Home order is now progress → quick actions → weather → My schedule. The progress card is
  plain. My schedule shows the next booked jobs with a Cards / Table switch (Cards by default).
- **Key decision:** Two views of the same list. Cards are quick to scan on a roof; the table compares times
  across days. The table is a real `<table>` so it reads correctly with a screen reader.
- **AI got wrong / I overruled:** The AI put weather before My schedule; I moved the schedule up (follow-up in
  Prompt 018). The next job matters more than the forecast once the crew is on site.

### 2026-10-25 · Phase 3 Prototype: My schedule as intuitive cards only
- **Input:** [Prompt 019](prompts/019_2026-10-25_schedule-cards-only.md) (text)
- **What happened:** Dropped the Table view I had added in Prompt 018. The schedule is now grouped by day with a
  highlighted **Next up** card (big time, who booked it, View job) and compact time rows for later jobs.
- **AI got wrong / I overruled:** The Cards / Table switch added choice without adding value on a phone. Removed.
- **Case-study note:** "The schedule answers one question first: what's next and when. Everything else is one tap."

### 2026-10-25 · Phase 3 Prototype: Simpler Home and quick-action pages
- **Input:** [Prompt 020](prompts/020_2026-10-25_remove-weather-stack-quick-actions.md) (text)
- **What happened:** Removed the weather card. Quick actions became four full-width rows. The quick-action
  pages dropped their repeated summary card and now show just a heading and details.
- **AI got wrong / I overruled:** The summary card on each quick-action page repeated what the tapped card
  had just shown, so I removed it. Weather was cut as not essential to the brief.

### 2026-10-25 · Phase 3 Prototype: Quick actions as a 2×2 grid of stacked cards
- **Input:** [Prompt 021](prompts/021_2026-10-25_quick-actions-two-column.md) (text)
- **What happened:** Back to two per row. Each card stacks a 28×28 icon, a light-grey label and a large bold count.
- **AI got wrong / I overruled:** The AI flagged that the first "light grey" failed contrast and chose the lightest
  grey that passes 4.5:1 on every tint. That honours the visual direction without breaking accessibility.

### 2026-10-25 · Phase 4 Test & refine: Usability check of the capture flow
- **Input:** [Prompt 022](prompts/022_2026-10-25_usability-check.md) (text)
- **What happened:** Checked six core usability questions in the browser. Three gaps were found and fixed:
  no gallery select, no replace on the preview, and no save feedback when skipping to the next shot. Also checked
  320px screens and touch targets. Write-up: [docs/06](../docs/06-usability-check.md).
- **Key decision:** Audit before building. Only the gaps were built, and each fix was re-tested with real files.
- **Case-study note:** "I turned six plain-language usability questions into a pass/fail table with evidence,
  the same checklist an interviewer can run live."

### 2026-10-25 · Process: Handoff to a new session
- **Input:** [Prompt 023](prompts/023_2026-10-25_new-session-handoff.md) (text)
- **What happened:** Wrote [SESSION_HANDOFF.md](SESSION_HANDOFF.md) and linked it from `CLAUDE.md`, so work
  continues in a fresh session without losing context. The process log carries on from prompt 024.

### 2026-10-25 · Phase 3 Prototype: Office evidence review view
- **Input:** [Prompt 024](prompts/024_2026-10-25_office-evidence-view.md) (text)
- **What happened:** Built doc 05's office view in the React app (`?view=office`):
  - **D1** job lookup
  - **D2** job evidence: completeness, a "Before you share" list, filters and a grid that includes skipped and uploading tiles
  - **D3** photo side panel
  - **Compare** Before/After
  - **D4** share dialog with the warning before the link exists
  - **D5** customer page (`?view=share`)

  Tested at 1366, 375 and 320px.
- **Key decision:** One app with two entry points, so a single deploy link shows the crew phone and the office view.
  The office view shows only facts the crew app records: phone-clock time, received time, crew member, quality
  check, note, tags, skip reason.
- **Why:** doc 05 draws GPS maps and "Verified" badges, but the crew app doesn't capture either. Showing them would
  break the honesty rule, so the view says "Location: not recorded in this prototype".
- **AI got wrong / I overruled:** The panel photo collapsed to zero height on short screens, and the mobile top bar
  wrapped. Both were caught at 320px and fixed.
- **Case-study note:** "The office view answers Sean's call in four clicks: job ID, Before + Gutters, Compare, Share.
  Every gap is explained (skipped with a reason, still uploading), never left blank."

### 2026-10-25 · Phase 4 Test & refine: Warmer heading and sub-text colours
- **Input:** [Prompt 025](prompts/025_2026-10-25_heading-subtext-colours.md) (text)
- **What happened:** Headings and titles changed to `#2B2826`, and sub text to `#514F4D`. The change was made through the shared
  `--text` and `--muted` tokens, so the crew phone and the office web app both changed. It was checked in the browser.
- **Key decision:** Change the tokens, not individual rules. Two hard-coded copies of the old colours were also replaced.
  Follow-up: the secondary label grey `--text-2` is now the warm `#3D3A37`, so all three text greys match.

### 2026-10-25 · Phase 3 Prototype: Office dashboard, approve / reject, five review questions
- **Input:** [Prompt 026](prompts/026_2026-10-25_office-dashboard-review.md) (text)
- **What happened:**
  - **Audit:** checked the office view against five review questions first. Two were partial, one was thin, one was mostly there and one was missing. Approve / reject didn't exist.
  - **Dashboard:** the office landing page is now a dashboard with 4 key metrics (Ongoing, Completed, Needs review, Total) in the crew app's quick-action style. The metrics filter the job list.
  - **Job page:** rebuilt as one card per question: job, required photos, missing or questionable, can I trust the details, what to do next.
  - **Review:** added approve / reject with a reason and a note to the crew, Undo, Next to review, a review filter and Mark job reviewed. These feed back into the dashboard counts.
- **Key decision:** Answer the questions in the order a PM asks them, and work out "what to do next" from the evidence
  rather than writing it as fixed text. Rejecting needs a reason, because the crew has to know what to retake.
- **Why:** turns the office view from a gallery into a review workflow with a clear end state (job reviewed).
- **AI got wrong / I overruled:** Reject button border hidden by CSS order; focus lost after a decision; mobile
  autofocus scroll; 320px top bar overflow; a hard-coded label grey missed in prompt 025. All fixed after browser tests.
- **Case-study note:** "The office page now answers five questions top to bottom. The last one, 'What should I do
  next?', updates as you review."

### 2026-10-25 · Phase 3 Prototype: Connect crew and office (planned, not built)
- **Input:** [Prompt 027](prompts/027_2026-10-25_connect-crew-office.md) (text)
- **What happened:** Read the crew and office code and wrote an implementation plan into the prompt file: a shared
  localStorage store, the crew and office sides wired to it, a retake loop and a view switcher. The usage limit was
  reached before any code changed.

### 2026-10-25 · Phase 4 Test & refine: Static metrics, job cards, Start review up front
- **Input:** [Prompt 028](prompts/028_2026-10-25_office-dashboard-cards-start-review.md) (text)
- **What happened:**
  - **Dashboard:** the metrics are now read-only, and the job table became scannable cards with jobs needing review first.
  - **Job review page:** **Start review** sits beside Share, with a review progress bar in the job card. "What to do next" leads with the review, and its follow-ups share one style.
- **Key decision:** The review is the office's main task, so its action lives in the job card. It always shows the next step: Start, then Continue, then Mark reviewed.
- **AI got wrong / I overruled:** A dark border on the violet metric card, there since prompt 026, came from stylesheet load order. Fixed.

### 2026-10-25 · Phase 4 Test & refine: Job tabs on the office dashboard
- **Input:** [Prompt 029](prompts/029_2026-10-25_office-job-tabs.md) (text)
- **What happened:** The job list became tabs with cards (Ongoing, Completed, Needs review, Total jobs), with **Needs review**
  open by default. Search still covers every job. The same change went into the process-log site and the case-study deck.
- **Key decision:** Open on the office's main task (review) instead of every job at once. The tab order matches the key metrics so the two read together.
- **AI got wrong / I overruled:** On phones the scrolling tab row hid the active tab. Changed to a 2 × 2 grid.

### 2026-10-25 · Phase 5 Submit: Process-log website made review-ready
- **Input:** [Prompt 030](prompts/030_2026-10-25_improve-process-log-site.md) (text)
- **What happened:** Added an executive summary, a "needs your input" list, a key-decisions and before/after section with
  prototype screenshots, links to every original file, and a link / verbatim / placeholder checker. All 29 prompts stay word for word.
- **Key decision:** Show gaps instead of filling them. The prototype URL, personal notes and reflection are listed as missing, not invented.
- **AI got wrong / I overruled:** The site's earlier reflection credited my own ideas (weather card, Cards/Table switch) to the AI. Corrected.

### 2026-10-25 · Phase 4 Test & refine: Quick actions first on crew Home
- **Input:** [Prompt 031](prompts/031_2026-10-25_quick-actions-above-progress.md) (text)
- **What happened:** Quick actions moved above Today's progress, and their white card (background, border, shadow)
  was removed so the four tiles sit directly on the page.
- **Key decision:** The tiles are already coloured cards, so a second white card around them added nothing.

### 2026-10-25 · Phase 4 Test & refine: Today's progress card restyled from a reference
- **Input:** [Prompt 032](prompts/032_2026-10-25_progress-card-from-reference.md) (text + reference image)
- **What happened:** Rebuilt the crew Home progress card after my reference. It has the label and headline, a large blue
  percentage on the right, a slim progress bar, and a quiet footer with the start time and photos uploaded. The ring and the two tinted stat tiles are gone.
- **Key decision:** The reference had no link, so the whole card became the way into the live job. The visible "Continue" link was dropped.

### 2026-10-25 · Phase 4 Test & refine: One spacing rule for cards and sections
- **Input:** [Prompt 033](prompts/033_2026-10-25_card-spacing-token.md) (text, then a correction)
- **What happened:**
  - Card-to-card spacing was a mix of 8, 10, 12 and 14px across screens.
  - Added one `--card-gap` token. I first asked for 24px everywhere, then cut the crew mobile app to **16px** because 24px left too much white space. The office web app and customer page stay at **24px**.
  - Every page was measured with a script after the change.
- **Key decision:** A single token instead of per-screen margins, so the rhythm can't drift again.
- **AI got wrong / I overruled:** 24px everywhere was my first call; on the phone it was too airy, so I overruled it to 16px. The wider gaps also pushed the profile stats out of their boxes at 320px, now one per row on narrow phones.

### 2026-10-25 · Phase 4 Test & refine: Progress shown as a ring
- **Input:** [Prompt 034](prompts/034_2026-10-25_progress-ring.md) (text)
- **What happened:** The large "33%" on Today's progress became a blue donut ring with the percentage inside, in a
  smaller font (16px, down from 30px). The horizontal bar was removed so the same number isn't drawn twice.
- **Key decision:** One visual for one number. The ring replaces both the big figure and the bar.

### 2026-10-25 · Phase 4 Test & refine: Office sidebar and a Jobs card
- **Input:** [Prompt 035](prompts/035_2026-10-25_office-sidebar-jobs-card.md) (text)
- **What happened:**
  - The office top bar became a white vertical sidebar with Dashboard, Schedule, Customers, the crew phone view, Settings and Log out, plus the signed-in user.
  - Below 860px the sidebar is a slide-in menu.
  - The Jobs section now sits in a white outlined card like the others.
- **Key decision:** Items that aren't built (Schedule, Customers, Settings, Log out) are shown but say "isn't part of this prototype" when tapped, so they don't pretend to work.
- **AI got wrong / I overruled:** Focus didn't move into the slide-in menu at first, because the menu was still hidden when it tried. Fixed so the menu is visible the moment it opens.

### 2026-10-25 · Phase 4 Test & refine: Office pages use the full width
- **Input:** [Prompt 036](prompts/036_2026-10-25_office-full-width-search.md) (text)
- **What happened:** Removed the 1180px maximum width, so office pages fill the space beside the sidebar: 24px from the
  sidebar and 24px from the right edge at every width. Removed the "Open" button from job search; Enter still opens an exact job ID.
- **Key decision:** Keep 16px side padding on phones, in line with the crew app's mobile spacing.

### 2026-10-25 · Phase 4 Test & refine: "Jobs by status" and a slimmer search
- **Input:** [Prompt 037](prompts/037_2026-10-25_jobs-by-status-search-height.md) (text)
- **What happened:** The office search bar went from 48px to 40px on desktop (44px kept on phones for touch). The dashboard section "Jobs"
  was renamed **"Jobs by status"**, the title the AI suggested.
- **Key decision:** The title names how the card is organised (status tabs) rather than repeating "Jobs".

### 2026-10-25 · Phase 4 Test & refine: Review now first on the office dashboard
- **Input:** [Prompt 038](prompts/038_2026-10-25_review-now-first.md) (text)
- **What happened:** Moved the Review now card above Key metrics. The dashboard now reads: Review now → Key metrics → Jobs by status.
- **Key decision:** The office's main task leads the page; the numbers follow.

<!-- New entries go below, newest last. Template:
### YYYY-MM-DD · Phase N <name>: <title>
- **Input:** [Prompt NNN](prompts/NNN_...) (text | voice note)
- **What happened:**
- **Key decision:**
- **Why:**
- **AI got wrong / I overruled:**
- **Case-study note:**
-->

---

## Prompts that mattered
| # | Prompt | Why it mattered |
|---|---|---|
| 001 | Kickoff: break down the brief | Set the frame, users, scope and build order for everything after. |
| 002 | Separate explicit requirements from assumptions | Exposed which "requirements" were really my guesses; named the riskiest ones to test. |
| 003 | Lightweight UX plan (mobile capture → desktop review) | Fixed IA, flows, states, a11y and acceptance criteria before any prototyping. |
| 004 | Map the crew user flow | Made every decision point and failure path visible before designing screens. |
| 005 | Map the office user flow | Linked crew actions to what the office sees; set "system shows facts, people judge". |
| 008 | Crew mobile screens from the flow | Set the visual system and the "only claim what's built" rule; produced the prototype. |
| 009 | Convert the design into React / HTML / CSS | Turned the canvas into a runnable, tested codebase in the repo. |
| 010 | Dashboard home for the crew | Added period stats and status filters without adding steps before the photo flow. |
| 011 | Bottom navigation and Home cards | Gave the app a real shell: tabs, office-to-crew requests, job filters, photo folders. |
| 022 | Six-point usability check | Found 3 real gaps (gallery, replace, silent save) and closed them with evidence. |
| 018 | My schedule on Home with Cards/Table | Next booked jobs visible without leaving Home; two views for two needs. |
| 017 | Quick actions as pages, #F5F5F7, white card | Home became a launcher; each quick action has its own page. |
| 016 | Today's progress, weather, colour-coded quick actions | Home now answers 'how is today going' and 'is it safe up there' first. |
| 014 | Manrope + restructure from two feature lists | Turned a text-heavy prototype into an image-led app with job detail, camera simulation and tutorial. |
| 012 | Switch typeface to Bricolage Grotesque | Set the brand typeface through one token. |
| 026 | Office dashboard, approve / reject, five review questions | Turned the office view into a review workflow with metrics, decisions and a clear end state. |
| 024 | Build the office evidence review view | Delivered the office half of the brief: lookup → evidence → compare → share → customer page. |

## What I threw away
| When | What | Why |
|---|---|---|
| 2026-10-25 | GPS map, "Verified" badge and AI "Suggested → Confirmed" tags from the doc 05 office design | Not built in the crew app, so the office view can't honestly show them. Kept as future work. |

## Where the AI got it wrong (and what I did)
| When | What the AI did | What I did instead |
|---|---|---|
| 2026-10-25 | The office slide-in menu didn't take keyboard focus when opened: it was still visibility-hidden during its slide (prompt 035). | Caught in the browser check; the menu now becomes visible immediately and hides only after sliding out. |
| 2026-10-25 | The process-log site's reflection said the AI added the weather card and Cards/Table switch, but prompts 016 and 018 show I asked for them (prompt 030). | Corrected the reflection; cut ideas are now tagged with their real source. |
| 2026-10-25 | Office job tabs scrolled sideways on phones and hid the active Needs review tab (prompt 029). | Caught at 320px; tabs become a 2 × 2 grid on phones. |
| 2026-10-25 | The violet "Total jobs" metric had a dark border, overridden by stylesheet load order; the AI read it as a selected state (prompt 026). | Found while reworking the dashboard in prompt 028; fixed with a more specific selector. |
| 2026-10-25 | Prompt 025 claimed the colour change was everywhere, but the quick-action labels kept a hard-coded grey. Office review: Reject border hidden by CSS order, focus lost after a decision, 320px top bar overflow. | Found while testing prompt 026; label moved to the token, selector made more specific, focus moved to "Next to review", brand text hidden under 380px. |
| 2026-10-25 | Office side panel: the photo collapsed to zero height on short screens; the mobile top bar wrapped. | Caught at 320px in the browser; fixed with flex-shrink and an icon-only link. |
| 2026-10-24 | Interpreted "record screen" as "screens to design"; this may not be what I meant. | _To confirm._ |
| 2026-10-25 | A loose regex cleanup deleted the quick-action colour rules and broke the schedule card spacing. | Caught with a CSS scan and computed-style checks; restored; now delete rules by exact selector. |
| 2026-10-25 | Quick-action pages repeated the tapped card as a banner. | Removed; heading plus details only. |
| 2026-10-25 | A Cards/Table switch on a phone schedule added choice without value. | Removed; cards only, with a clear Next up. |
| 2026-10-25 | Placed weather above My schedule on Home. | Moved My schedule first; the next job matters more on site. |
| 2026-10-25 | Added a desktop marketing-style intro panel nobody asked for. | Removed; desktop shows only the phone mockup. |
| 2026-10-25 | Camera Back from the checklist skipped the open job; camera title unreadable on a light sky. | Kept the open job as the return target; added a top scrim. |
| 2026-10-25 | Sample data had Priya (insurance claims) scheduling jobs, which is off-persona. | Changed to Sean Doyle (PM). |
| 2026-10-25 | Draft Profile had an "upload on mobile data" switch that did nothing. | Replaced with settings the app actually honours. |
| 2026-10-24 | Code Connect skill invoked for a design-to-code job it can't do (no Figma components). | Did a direct React conversion instead (Prompt 009). |
| 2026-10-24 | React app showed "Uploading · 0 left" for one tick before finishing. | Caught in browser test; last upload now goes straight to "All photos uploaded". |
| 2026-10-24 | Doc 04 crew flow was mostly explanation; user wanted a visual diagram. | Asked for a standalone diagram → SVG (Prompt 006). |
| 2026-10-24 | Doc 01 listed 20 "functional requirements", but most were AI design ideas, not from the brief. | Re-classified into Explicit / Inferred / Assumption in doc 02. |
