# UX Design Plan (Define stage)

Lightweight plan, written **before any prototyping or code**. No implementation here, only what we are
designing and why.
Builds on: [01 Breakdown](01-assignment-breakdown.md) · [02 Requirements vs Assumptions](02-requirements-vs-assumptions.md)
(IDs like E8, A7 refer to doc 02.)

**Priority**
1. **Mobile photo capture:** roofing crew (Part A)
2. **Desktop evidence review by job ID:** office / PM / claims (Part B)

Accessibility is written **inside every step**, marked ♿, plus a global section at the end.

---

## 1. Problem statement

- Roofing crews take hundreds of photos per job, but the photos live on personal phones and in group chats. (E5)
- Uploads fail on sites with no signal, and half the photos never arrive. (E8)
- When a customer disputes work, the **before** photo can't be found. (E9)
- Insurers reject photos with **no date and no location**. (E10)

> **How might we** help a crew capture the *right* photos on every job, even offline, so that the office
> can find any photo by job and share it as proof a customer or insurer will trust?

**Design principle:** *Proof is created at capture, not in the office.*

---

## 2. Primary users

| | Crew lead (Ravi) | Project manager (Sean) | Claims coordinator (Priya) |
|---|---|---|---|
| Device | Phone, on a roof | Desktop | Desktop |
| Context | Gloves, sun, ladder, no signal, hurry | Customer on the phone, needs an answer now | Preparing an insurer packet, deadlines |
| Wants | Get the shots done and go | Find the exact photo fast | Photos the insurer can't reject |
| Fears | Photos lost; redoing a job | "It's on someone's phone" | Missing date/location → rejected claim |
| Part | **A** | **B** | **B** |

Secondary (they view the proof): homeowner and insurance adjuster, via a share link.

---

## 3. Jobs to be done

**Crew (Part A)**
- When I arrive on a job, I want to know **exactly which photos to take**, so I don't miss the before shots.
- When I'm on the roof with no signal, I want my photos to be **safe on my phone**, so I don't lose them.
- When I finish, I want to **know I'm done**, so I can leave without the office calling me back.

**Office (Part B)**
- When a customer disputes the work, I want to **open the job and find the before photo in seconds**, so I can settle it on the call.
- When an insurer asks for proof, I want to **show date, location and that the photo is unedited**, so the claim is accepted.
- When I share photos, I want to **send only the relevant ones**, so I don't expose other customer details.

---

## 4. Key assumptions (full list in doc 02)

- **A7** A shot list per job type, grouped Before / During / After, defines "done". *(riskiest)*
- **A9** Only photos taken in the app count as "verified". Gallery imports are allowed but marked unverified.
- **A18** Showing sync status clearly will stop the "upload at night and hope" habit.
- **A3** The crew won't type, so the design uses taps, defaults and AI suggestions.
- **A13 / A14** AI checks quality and suggests tags. It **never blocks** capture and **never judges damage**.
- **A15** The office starts from a **job ID** (or address/customer), not from a photo search.
- Out of scope: template admin, scheduling, payments, customer accounts, AI damage assessment.

---

# Part A: Mobile photo capture (crew)

## A1. Information architecture

```
Crew app
├── Today (job list)                 ← home
│   └── Job
│       ├── Shot checklist           ← the core screen
│       │   ├── Before  (areas: front, back, left, right, gutters, driveway, existing damage)
│       │   ├── During  (tear-off, decking, underlayment, flashing)
│       │   └── After   (each roof face, gutters, cleanup, driveway)
│       ├── Camera (guided, per shot)
│       │   └── Review (AI check → keep / retake)
│       ├── Extra photos (unlisted)
│       └── Finish job (summary → submit)
└── Uploads (sync queue, global)     ← always reachable from the status bar
```

- Two levels deep at most from the job.
- **Sync status is global**: a persistent indicator on every screen, not buried in settings.

## A2. Primary user flow: capture a required shot (happy path, offline)

1. Open app → **Today** → tap job "14 Elm St – Re-roof".
2. **Checklist** opens on the **Before** tab (before photos are prompted first, per E9). Shows "0 of 7".
3. Tap "Front elevation" → **Camera** opens with a hint: "Whole front of house in frame".
4. Tap the shutter → photo stamped with **time · GPS · job · crew member** (shown on screen).
5. **Review**: AI says "Looks good" or "Looks blurry: retake?" → crew taps **Keep** or **Retake**.
6. Back on the checklist: the item is ticked and shows "1 of 7". Status bar: "Saved on phone · 1 waiting to upload".
7. Repeat → when the Before tab is complete, it is marked done and the crew is nudged to the **During** tab.

**Secondary flows**
- **Skip a shot:** tap ⋯ → "Can't take this" → choose a reason (not accessible / unsafe / not applicable / other) → item marked *Skipped* (not *Done*).
- **Extra photo:** "+ Extra photo" → camera → optional tag (AI suggests).
- **Finish job:** "Finish" → summary (done / skipped / missing) → if anything is missing, a warning with "Take now" or "Finish anyway (reason)" → submit.
- **Back online:** queue uploads automatically → "All 42 photos uploaded ✓".
- **Gallery import (fallback):** allowed; marked "Imported, not verified" everywhere.

## A3. Screen hierarchy

**M1 Today (job list)**
1. Sync status bar (global)
2. Job cards: address, job type, time → **photo progress** ("Before 0/7") → upload state
3. Nothing else (no menus competing for attention)

**M2 Job shot checklist** *(core screen)*
1. Job address + sync status
2. Phase tabs: **Before · During · After**, each showing progress (e.g. "5/7")
3. Shot list: thumbnail or empty slot · name · state (To do / Done / Skipped / Needs retake)
4. Primary action: **Next required shot** (big, bottom, thumb zone)
5. Secondary: + Extra photo · Finish job

**M3 Guided camera**
1. Viewfinder (full screen)
2. Shot name + one-line hint (top)
3. Shutter (bottom centre, very large) · flash · switch to next shot
4. Live proof chips: 🕒 time · 📍 GPS accuracy · 📶 offline

**M4 Review**
1. Captured photo
2. AI result (one line + icon): Good / Blurry / Too dark / Doesn't look like a roof
3. **Keep** (primary) · **Retake** (secondary)
4. Proof stamp shown: time, location, job

**M5 Uploads (sync queue)**
1. Summary: "38 uploaded · 4 waiting · 0 failed"
2. Per-job groups → per-photo state
3. Retry all (only when failed)
4. Reassurance copy: "Photos stay on this phone until the office has them."

**M6 Finish job**
1. Summary by phase: Done / Skipped (with reasons) / Missing
2. Warning if anything is missing
3. **Submit job photos** (primary)

## A4. Critical interactions

- **Next required shot:** one tap goes straight to the camera for the next missing item. No browsing needed.
- **Shutter → auto-advance:** after Keep, offer "Next: Back elevation →", so the crew can work through the checklist on the roof without going back.
- **AI check is advisory:** a "Blurry" warning can be dismissed with Keep. It never blocks. (A14)
- **Proof stamp visible at capture:** the crew sees that time and location were recorded, which builds trust. (E10)
- **Skip with a reason:** the only way to complete a required item without a photo, so "done" stays honest.
- **Sync indicator** is tappable from anywhere and opens Uploads.
- **Retake keeps the original** (hidden, for audit) and never silently replaces it.
- **Leaving with unsent photos:** a warning appears if the crew tries to log out or switch jobs while photos are queued.

## A5. Empty, loading and error states

| State | Screen | What the user sees |
|---|---|---|
| Empty: no jobs today | M1 | "No jobs assigned today. Pull to refresh or call the office." |
| Empty: phase not started | M2 | Empty slots with shot names. "Start with Front elevation." |
| Empty: queue clear | M5 | "All photos uploaded ✓". Positive, not blank. |
| Loading: jobs syncing | M1 | Skeleton cards; cached jobs shown first (works offline). |
| Loading: AI check | M4 | "Checking photo…" ≤1–2 s; Keep stays available immediately. |
| Loading: uploading | M5 / bar | Per-photo progress; "Uploading 3 of 12". |
| Offline | All | Bar: "Offline · photos saved on phone". Neutral tone, **not** an error. |
| Error: GPS unavailable | M3/M4 | "Location not found. Photo saved without location." Flagged for the office. |
| Error: camera permission denied | M3 | Explain why it's needed, with a button to open settings. |
| Error: storage full | M3 | "Phone storage full. Free up space to keep taking photos." Existing photos are safe. |
| Error: upload failed | M5 | "4 photos didn't upload. They're still on your phone." Retry; auto-retry continues. |
| Error: device clock wrong | (silent) | Flag for the office; don't burden the crew. |
| Error: AI unavailable offline | M4 | Basic blur/dark check runs on the device; tag suggestions are skipped. |

## A6. Accessibility, per step (♿)

- ♿ **Today / Checklist:** progress shown as **text + icon + colour** (never colour alone); headings for each phase; screen reader announces "Before, 5 of 7 done".
- ♿ **Touch targets:** at least 48×48 dp everywhere; **56–64 dp** for primary actions and the shutter (gloves). Primary actions sit in the bottom thumb zone.
- ♿ **Sunlight:** aim for **7:1 contrast** (AAA) on key text and icons; avoid thin type and low-contrast greys; consider a high-contrast outdoor theme.
- ♿ **Camera:** shutter also works with the **volume button**; haptic + sound confirmation on capture; the hint text is readable by a screen reader.
- ♿ **Review:** the AI result is announced as text ("Photo looks blurry. Keep or retake?"), not only shown as an icon.
- ♿ **Status changes** (saved, uploaded, failed) are announced via live regions and confirmed with haptics.
- ♿ **Dynamic type / large text** supported up to 200% without hiding actions.
- ♿ **One-handed:** no required gestures that need two hands; no swipe-only actions (always a button too).
- ♿ **Reduced motion** respected; no flashing.
- ♿ **Plain language**, short labels, no jargon in errors. Matters for crews working in a second language.

## A7. Acceptance criteria: mobile capture

- **AC-M1** Given a job is assigned, when the crew opens it, then the checklist opens on **Before** and shows each required shot and progress as "x of y".
- **AC-M2** Given the phone is **offline**, when a photo is taken, then it is saved on the device, shown as "waiting to upload", and the checklist item is marked done.
- **AC-M3** Given any photo is taken in the app, then it records **time, GPS (with accuracy), job ID and crew member**, and these are visible on the Review screen.
- **AC-M4** Given GPS is unavailable, when a photo is taken, then it is still saved and clearly marked "no location".
- **AC-M5** Given the AI flags a photo as blurry/dark, then the crew can still **Keep** it with one tap (AI never blocks).
- **AC-M6** Given a required shot can't be taken, then the crew can mark it **Skipped** only by choosing a reason; skipped is shown differently from done.
- **AC-M7** Given photos are queued, when the connection returns, then they upload automatically without user action, and the status updates to "uploaded".
- **AC-M8** Given an upload fails, then the photo **stays on the phone**, is shown as failed, and can be retried. No photo is deleted locally until the server confirms receipt.
- **AC-M9** Given photos are still queued, when the crew tries to log out or close the job, then they see a warning with the number of unsent photos.
- **AC-M10** Given the crew taps Finish, then they see done / skipped / missing per phase before submitting.
- **AC-M11** Primary actions are ≥56 dp, key text meets ≥4.5:1 contrast (target 7:1), and every status is conveyed by text, not colour alone.
- **AC-M12** All screens are usable with a screen reader and at 200% text size.

---

# Part B: Desktop evidence review (by job ID)

## B1. Information architecture

```
Office web app
├── Job lookup                       ← home: search by job ID / address / customer
│   └── Job evidence
│       ├── Summary header           (job, address, crew, dates, completeness)
│       ├── Photo timeline / grid    (Before → During → After)
│       │   └── filters: phase · area/tag · crew member · verified/unverified · date
│       ├── Photo proof detail       (side panel)
│       └── Share / evidence pack    (select → link or PDF)
│           └── Shared proof page    (external: customer / insurer, no login)
└── (out of scope: templates admin, users, settings)
```

## B2. Primary user flow: settle a dispute by job ID (Sean)

1. Customer calls: "you broke my gutter". Sean types **job ID** (or address) into Job lookup.
2. **Job evidence** opens: header shows "Before 7/7 · During 4/4 · After 7/7 · all verified".
3. Filter **Phase: Before** + **Area: Gutters** → 2 photos.
4. Click a photo → **Proof detail** panel: large image, time, map pin, crew member, "Verified: captured in app, unedited".
5. Click **Compare with After** → side-by-side of the same area.
6. Select both → **Share** → choose recipient type (Customer) → link created with an expiry → copy/send.
7. Customer opens the **shared proof page**: before/after, date, location, verification note.

**Secondary flow: insurer packet (Priya)**
- Open the job → filter "Existing damage" → select photos → **Evidence pack (PDF)** → the system flags any photo missing date/location **before** export → export.

## B3. Screen hierarchy

**D1 Job lookup**
1. Search field (job ID, address, customer), focused on load
2. Recent jobs
3. Result rows: job ID · address · date · completeness · warnings

**D2 Job evidence** *(core screen)*
1. Header: job ID, address, customer, crew, dates
2. **Completeness + trust summary:** per phase done/skipped/missing; count of unverified or no-location photos
3. Filters bar
4. Timeline grouped by phase → grid of thumbnails with small badges (verified, no GPS, imported, skipped reason)
5. Selection bar (appears on select): Compare · Share · Evidence pack

**D3 Photo proof detail** *(side panel, keeps context)*
1. Large photo (zoom)
2. Proof block: capture time (device + received), location + map + accuracy, crew member, device, verification status
3. Tags (AI-suggested vs confirmed, labelled)
4. Related: same area in other phases (before ↔ after)
5. Activity: viewed / shared history

**D4 Share / evidence pack dialog**
1. Selected photos (removable)
2. Recipient type: Customer / Insurer
3. Options: include map, include metadata, link expiry
4. Warnings (missing data, unverified photos)
5. **Create link** / **Export PDF**

**D5 Shared proof page** *(external, read-only)*
1. Company + job address (no internal data)
2. Before → After photos with date, location
3. Plain-language verification note
4. Link expiry note

## B4. Critical interactions

- **Lookup by job ID:** exact match jumps straight to the job; a partial match shows a list.
- **Filters stack and stay visible** as chips; one click clears each.
- **Side panel detail** keeps the grid visible, so you don't lose your place; arrow keys move to the next photo.
- **Before ↔ After pairing** by area: one click to compare.
- **Trust badges are consistent** across grid, panel, share page and PDF (same words, same icons).
- **Warnings before sharing**, not after: missing GPS or unverified photos are flagged in the dialog.
- **Share links are revocable** and show who opened them (activity).
- **AI tags are labelled "Suggested"** until a person confirms them. (E13)

## B5. Empty, loading and error states

| State | Screen | What the user sees |
|---|---|---|
| Empty: no search yet | D1 | Recent jobs + hint "Search by job ID, address or customer". |
| Empty: no results | D1 | "No job found for 'HR-2041'. Check the ID or search by address." |
| Empty: job has no photos | D2 | "No photos uploaded yet. Crew may still be offline." + last sync time per crew device. |
| Empty: filter shows 0 | D2 | "No Before photos of Gutters." + "Clear filters" · if the shot was skipped, show the reason. |
| Loading: job | D2 | Header first, thumbnail skeletons; photos load progressively. |
| Loading: full image | D3 | Blurred thumbnail → full resolution. |
| Loading: creating PDF | D4 | Progress + "You can keep working". |
| Partial: photos still syncing | D2 | Banner: "12 photos from Ravi's phone are still uploading (last seen 2 h ago)." |
| Warning: no location / imported | D2/D3 | Badge + explanation; not hidden. |
| Warning: device vs server time mismatch | D3 | "Device clock differed by 3 h. Server received at …" |
| Error: link expired / revoked | D5 | "This link has expired. Contact Halden Roofing." |
| Error: export failed | D4 | Retry; selection kept. |
| Error: no permission for job | D2 | "You don't have access to this job." |

## B6. Accessibility, per step (♿)

- ♿ **Lookup:** search field has a visible label; results announced ("3 jobs found"); fully keyboard operable.
- ♿ **Grid:** every thumbnail has **auto alt text** from metadata ("Before · Gutters · 14 Elm St · 9:12 am, 24 Oct"); badges have text labels, not just icons or colours.
- ♿ **Keyboard:** logical focus order: header → filters → grid → panel; arrow keys in the grid; Esc closes the panel; visible focus ring.
- ♿ **Side panel:** focus moves into the panel on open and returns to the thumbnail on close.
- ♿ **Map:** location also given as text (address + coordinates + accuracy), so the map is never the only source.
- ♿ **Compare view:** labelled "Before" / "After" in text; not dependent on position or colour.
- ♿ **Dialogs:** focus trapped and labelled; warnings use role="alert"-style announcements.
- ♿ **Contrast** ≥4.5:1 text, ≥3:1 UI components; supports 200% zoom and 320 px reflow.
- ♿ **Shared page (external):** plain language, works on mobile, no login, readable by a screen reader. The customer may be older or non-technical.

## B7. Acceptance criteria: desktop evidence review

- **AC-D1** Given a valid job ID, when the user searches, then the Job evidence screen opens directly.
- **AC-D2** Given an unknown ID, then a clear no-results message suggests searching by address.
- **AC-D3** Given a job, then the header shows completeness per phase (done / skipped / missing) and the count of unverified or no-location photos.
- **AC-D4** Given filters Phase=Before and Area=Gutters, then only matching photos show, and the active filters are visible and clearable.
- **AC-D5** Given a photo is opened, then the detail shows capture time, server-received time, location (map **and** text), crew member and verification status.
- **AC-D6** Given a photo was imported or has no GPS, then it is visibly badged in the grid, the detail, the share dialog and the export.
- **AC-D7** Given a before photo exists for an area, then the user can compare it with the after photo of the same area in one action.
- **AC-D8** Given selected photos include missing data, when sharing, then a warning appears **before** the link or PDF is created.
- **AC-D9** Given a share link is created, then it has an expiry, can be revoked, and opens without login showing only the selected photos.
- **AC-D10** Given photos are still uploading from a crew device, then the job shows a "still syncing" banner with the last-seen time.
- **AC-D11** AI tags are visibly marked "Suggested" until confirmed by a person.
- **AC-D12** The full flow (lookup → filter → detail → share) is keyboard-only operable, and all thumbnails have meaningful alt text.

---

## Global accessibility baseline

- WCAG 2.1 **AA** as the floor; aim for AAA contrast on the crew's mobile screens (sunlight).
- Never rely on **colour alone** for status (done, failed, verified, unverified).
- Every status change is **announced** (screen reader) and, on mobile, confirmed with **haptics**.
- **Plain language** everywhere; error messages say what happened, what's safe, and what to do.
- Same trust vocabulary everywhere: *Verified · Imported · No location · Skipped (reason)*.

## Next step (after this plan is approved)
- Low-fidelity flows for Part A (M1–M6), then Part B (D1–D5), using the gutter-dispute story as test data.
- Quick hallway test of Part A against AC-M1 to AC-M10 before moving to visuals.
