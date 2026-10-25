# Assignment Breakdown — Zuper Photo Documentation Take-Home

Source: https://spd-take-home.vercel.app/ (read 2026-10-24)
Role: Senior AI-Native Product Designer, Zuper
Time box: **2 days** · Deliverables: **1 prototype link + 1 process log** · Follow-up: **60-min call**

---

## 1. The assignment in simple language

Halden Roofing (a fictional roofing company) takes hundreds of photos on every job. Those photos live on
people's phones and in WhatsApp-style group chats. When a customer says "you broke my gutter", or an
insurer asks "prove this damage was there", nobody can find the right photo, or prove **when** and **where**
it was taken.

**Your job:** design two things that work together:

1. **On the crew's phone:** how they take job photos, so the right photos get taken and they *know when
   they're done*, even with no signal on the roof.
2. **In the office (or for the customer):** how someone finds those photos fast and **shares them as
   proof** that a customer or insurer will accept.

Use AI tools to do the design work, and keep an honest log of how you used them: the prompts that
mattered, what you threw away, and where the AI got it wrong.

They gave you three questions to start from:

| Question | What it really asks |
|---|---|
| Which photos does a job need, and how does the crew know they're done? | A **required shot list / checklist** per job, with clear progress and a "complete" state. |
| How does a photo hold up as proof? | **Trust metadata**: timestamp, GPS, job ID, who took it, tamper-evidence, before/after pairing. |
| Where can AI help, and where should a person check? | **Human-in-the-loop design**: AI suggests and flags, people confirm what matters legally. |

---

## 2. Primary users

| User | Persona from brief | Where they work | Core need | Pain quote |
|---|---|---|---|---|
| **Field crew / crew lead** | Ravi Menon | On a roof, phone in one hand, often no signal, gloves, bright sun | Capture the right photos fast and trust they'll upload | "No signal on site, so I upload at night. Half never make it." |
| **Project manager (office)** | Sean Doyle | Desk, handling customer calls and disputes | Find the exact *before* photo in seconds, share it with the customer | "The before photo is on someone's phone. Maybe." |
| **Insurance claims coordinator** | Priya Shah | Office, preparing claim packets for insurers | Photos with provable date + location that insurers accept | "No date, no location, no proof." |

**Secondary users (the audience for proof):**
- **Homeowner / customer:** receives a shared link; needs to understand it without an account.
- **Insurance adjuster (external):** needs to trust the evidence is real and unedited.

---

## 3. Business goals

1. **Win disputes:** reduce money lost to "you damaged my property" claims by having a timestamped *before* photo.
2. **Get insurance claims approved first time:** fewer rejections caused by missing date/location.
3. **Zero lost photos:** every photo taken reaches the job record, even if taken offline.
4. **Consistent documentation on every job:** a standard shot list so quality doesn't depend on who's on the crew.
5. **Save office time:** find any photo in seconds instead of chasing crew members.
6. **For Zuper (the platform):** a differentiating field-service feature (proof-grade photo documentation)
   that can generalise beyond roofing (HVAC, solar, plumbing).

**Possible success metrics:** % jobs with complete required shots, upload success rate, time-to-find a photo,
claim rejection rate, dispute resolution time.

---

## 4. User journeys

### Journey A: Crew captures job photos (Ravi)
1. Opens today's job on phone → sees **required shots** for this job (e.g. Before: each roof face, gutters,
   driveway, existing damage · During: underlayment, flashing · After: each roof face, cleanup).
2. Taps a shot → camera opens with a **guide** ("Front elevation, whole house in frame").
3. Takes photo → app stamps **time, GPS, job, crew member**, and AI checks quality (blurry? too dark? wrong subject?).
4. Accepts or retakes → shot is ticked off; progress bar moves.
5. No signal → photo is **saved on the phone and queued**; status is visible ("12 waiting to upload").
6. Finishes job → sees **"All required shots done"** (or what's missing / skipped with a reason) → submits.
7. Signal returns → photos upload automatically in the background; crew gets confirmation.

### Journey B: PM resolves a customer dispute (Sean)
1. Customer calls: "you broke my gutter."
2. Sean searches by customer/address → opens the job → filters **Before + Gutters**.
3. Sees the photo with **time, location on a map, who took it, "verified original"** badge.
4. Compares before/after side-by-side.
5. Shares a **proof link** with the customer (selected photos only).

### Journey C: Claims coordinator builds an insurer packet (Priya)
1. Opens job → selects damage photos.
2. Checks every photo has date, GPS, and is unedited (missing data flagged clearly).
3. Exports or shares an **evidence pack** (link or PDF) with metadata and a verification note.

### Journey D: Customer/insurer views proof (external)
1. Opens a link, no login.
2. Sees photos in a timeline (before → after), with date, location, and "captured in app, not edited".

---

## 5. Screens to design ("record screens")

> Assumption: "record screen" was read as the list of screens to design. Confirm if you meant screen
> recording of the prototype (a walkthrough video). That's also worth doing for the submission.

**Crew phone (must have):**
| # | Screen | Purpose |
|---|---|---|
| C1 | Today's jobs | Pick the job; shows photo progress + upload status per job |
| C2 | Job shot checklist | Required shots grouped Before / During / After, progress, missing items |
| C3 | Guided camera | Overlay hint for the current shot, big shutter, works one-handed |
| C4 | Photo review | AI quality check result, accept / retake, optional note or tag |
| C5 | Upload queue / sync status | Offline queue, retry, "all safe" confirmation |
| C6 | Job completion | All done, or skip a shot with a reason, then submit |

**Office / customer view (need at least one):**
| # | Screen | Purpose |
|---|---|---|
| O1 | Job photo timeline | All photos for a job, filter by phase / area / tag |
| O2 | Photo proof detail | Large photo + time, GPS map, author, device, verification status |
| O3 | Share / evidence pack | Select photos, create a link or PDF for customer or insurer |
| O4 | Shared proof page (external) | What the customer/insurer sees, no login |

---

## 6. Functional requirements

**Capture (crew)**
- FR1. Each job has a **required shot list** (template by job type, editable by office).
- FR2. Show progress per job and per phase; clear "done" state.
- FR3. In-app camera with per-shot guidance.
- FR4. Auto-attach **timestamp, GPS + accuracy, job ID, crew member, device** at capture.
- FR5. AI quality check (blur, darkness, obstruction) with **retake suggestion**, never blocking.
- FR6. AI suggests tags/area (e.g. "gutter", "flashing"); crew can correct.
- FR7. Allow extra (unlisted) photos and notes.
- FR8. Allow skipping a required shot **with a reason** (e.g. "area not accessible").

**Offline & sync**
- FR9. Works fully offline; photos stored locally until confirmed uploaded.
- FR10. Visible upload queue, auto-retry, resumable uploads; never delete local copy until server confirms.
- FR11. Warn before logout/uninstall/job close if photos are still queued.

**Proof & integrity**
- FR12. Store the original file untouched; compute a **hash at capture** (tamper evidence).
- FR13. Record both device time and server-received time; flag big mismatches.
- FR14. Mark photos imported from gallery as **"imported, not verified"**.
- FR15. Audit trail: who viewed, shared, or edited metadata.

**Find & share (office)**
- FR16. Search by customer, address, job, date; filter by phase, area, tag, crew member.
- FR17. Before/after comparison by area.
- FR18. Create share links for selected photos; expiry and revoke.
- FR19. Export evidence pack (PDF) with metadata for insurers.
- FR20. Flag missing data (no GPS, no time) before sharing.

---

## 7. Technical feasibility

| Area | Feasible? | Notes / risk |
|---|---|---|
| Offline capture + local queue | ✅ Proven | Native apps (or PWA with IndexedDB) do this. Risk: OS killing background uploads; need resumable chunked upload + retry. |
| GPS + timestamp | ✅ | GPS can be weak/inaccurate; store accuracy radius. Device clock can be wrong, so server time is the trusted second source. |
| Tamper evidence | ✅ | SHA-256 hash at capture + immutable original storage. Stronger option: C2PA content credentials (emerging standard). |
| EXIF as proof | ⚠️ Weak alone | EXIF is easy to edit. Proof should come from the app's own capture record, not EXIF only. |
| On-device AI quality check (blur/dark) | ✅ | Lightweight models / simple image metrics run offline. |
| AI tagging (roof, gutter, damage) | ⚠️ Medium | Cloud vision works but needs signal and makes mistakes; treat as **suggestion** with human confirm. |
| AI "is the checklist satisfied?" | ⚠️ Medium | Good as a nudge, not as a gate; person confirms. |
| AI damage assessment for insurers | ❌ Avoid | High stakes and liability; a person should judge. Good thing to *intentionally leave out*. |
| Storage cost (hundreds of photos/job) | ✅ | Upload compressed preview first, full original when on Wi-Fi/charging. |
| Prototype in 2 days | ✅ | Figma + AI (Figma Make/Claude/v0) or a coded clickable prototype on Vercel. |

---

## 8. Edge cases

**Field / capture**
- No signal for the whole job (or days).
- Phone dies, app is force-closed, or phone is lost mid-queue.
- Phone storage full.
- GPS unavailable or inaccurate (e.g. 200 m off).
- Device clock set wrong / time-zone change.
- Two crew members shooting the same job at once (duplicates, conflicting checklist ticks).
- Photo taken against the wrong job.
- Required shot impossible (dog, locked gate, unsafe roof, bad weather).
- Gloves, bright sunlight, rain, one hand holding a ladder → huge touch targets, high contrast.
- Crew uses the phone's normal camera instead of the app → gallery import path.
- Retakes: keep or discard the rejected one? (Suggest: keep, hidden, for audit.)
- AI wrongly flags a good photo as blurry, or wrongly tags "gutter".

**Office / proof**
- Searching across hundreds of photos per job; thousands per month.
- Photo has missing metadata; what does the share page show?
- Customer disputes that the photo is from their house.
- Share link forwarded to the wrong person → expiry & revoke.
- Privacy: faces, neighbours' houses, car plates, house numbers in photos.
- Metadata edited later (e.g. re-tagging): must not break the "verified original" trust.
- Job reassigned or merged.

---

## 9. Submission deliverables

| Deliverable | Detail | Status |
|---|---|---|
| **Prototype link** | Any tool. Must show **the crew's phone** + **one office or customer view**. | ☐ |
| **Process log link** | Prompts that mattered · what you threw away · where the AI got it wrong. | ☐ (started in `process-log/`) |
| **Email both links** | Within **2 days**, reply to the invitation. | ☐ |
| **60-min call prep** | Walk-through + they'll **change something live** and watch how you respond. | ☐ |

**Rules:** no roofing experience or coding needed · own or stock photos only · **no customer data**.

**How they judge it:**
1. **Judgment:** what you chose to solve and what you left out.
2. **Understanding:** crew, office, *and* insurer.
3. **Working with AI:** how you steered it and where you overruled it.
4. **Clarity:** someone could build from what you show.

---

## 10. What to build first (recommendation)

**Build the crew's capture loop first: C2 → C3 → C4 → C5 (shot checklist → guided camera → review → offline queue).**

Why:
- Proof is **created at the moment of capture**. If the photo isn't taken, isn't tagged, or never uploads,
  no office screen can fix it. All three persona quotes trace back to capture and upload.
- It answers two of the three starter questions directly ("how does the crew know they're done" and
  "where does AI help").
- It's the hardest UX (offline, gloves, sunlight), so it's where judgment shows most.

**Then** build one office flow end-to-end using a single hero story: **Sean's gutter dispute**
(O1 → O2 → O3 → O4). One story, told from roof to customer link, is easier to demo and critique than many
half-screens.

**Suggested 2-day plan**
| When | Do |
|---|---|
| Day 1 AM | Lock the hero scenario, shot-list model, and "what makes a photo proof" rules. Sketch flows. Log prompts. |
| Day 1 PM | Prototype crew screens C1–C6 (offline + AI flags included). |
| Day 2 AM | Prototype O1–O4 for the gutter dispute; add insurer pack if time. |
| Day 2 PM | Polish, record a walkthrough video, finalise process log ("what I left out" section), email links. |

**Deliberately leave out (say so in the call):** AI damage assessment, customer accounts, payments,
scheduling, full admin for templates. Show you chose not to, and why.

---

## 11. Open questions / assumptions to state
- Is Priya internal (Halden's claims staff)? Assumed **yes**; the insurer adjuster is external.
- Native app vs PWA? Prototype is tool-agnostic; recommend native for reliable background upload.
- Who defines the shot list? Assumed office creates templates per job type.
